"""Build/review an edit.json using FFmpeg; no editorial decisions live here.

Usage: python session5/edit/build_cut.py [--edit path/to/edit.json]
Dependencies: ffmpeg, ffprobe on PATH; numpy and Pillow.
Changing only the shots array reorders the cut and regenerates the timeline,
audio crossfades, boundary frames and review sheets. Invalid duration fails
before encoding; no silent padding, speed change, loop or video freeze is used.
"""
import argparse
import hashlib
import json
import subprocess
from fractions import Fraction
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont


def run(args, **kwargs):
    return subprocess.run([str(x) for x in args], check=True, capture_output=True, **kwargs).stdout


def probe(path):
    return json.loads(run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', path]))


def digest(path):
    with path.open('rb') as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()


def save_json(path, obj):
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding='utf-8')


def make_timeline(cfg):
    timeline, end = [], 0
    for i, item in enumerate(cfg['shots']):
        shot = dict(item)
        trans = shot['transition_in']
        kind, overlap = trans['type'], trans['frames']
        assert kind in ('none', 'cut', 'dissolve')
        assert isinstance(overlap, int) and overlap >= 0
        assert kind == 'dissolve' or overlap == 0
        assert (kind == 'none') == (i == 0), 'Only first shot uses none'
        duration = shot['source_out_frame_exclusive'] - shot['source_in_frame']
        assert duration > overlap and (i == 0 or timeline[-1]['duration_frames'] > overlap)
        shot['duration_frames'] = duration
        shot['timeline_in_frame'] = end - overlap
        end = shot['timeline_in_frame'] + duration
        shot['timeline_out_frame_exclusive'] = end
        timeline.append(shot)
    assert end == cfg['total_frames'], f'Edit yields {end} frames, expected {cfg["total_frames"]}'
    dissolves = [s for s in timeline if s['transition_in']['type'] == 'dissolve']
    assert len(dissolves) == 1 and dissolves[0]['transition_in']['frames'] == cfg['fps'] / 4
    return timeline


def make_audio(cfg, timeline, sources, directory):
    """Keep source/timeline alignment; blend handles instead of shortening audio.

    Each source is decoded once by FFmpeg. Outside a source edge only the
    missing <=half-crossfade handle holds the closest sample. Consecutive
    shots from the same continuous source remain identical under linear mix.
    """
    fps, acfg = cfg['fps'], cfg['audio']
    rate, channels = acfg['sample_rate'], acfg['channels']
    assert rate % fps == 0 and acfg['curve'] == 'linear'
    spf = rate // fps
    total = cfg['total_frames'] * spf
    decoded = {}
    for sid, path in sources.items():
        vinfo = next(s for s in probe(path)['streams'] if s['codec_type'] == 'video')
        source_seconds = int(vinfo['nb_frames']) / fps
        data = run(['ffmpeg', '-v', 'error', '-i', path, '-map', '0:a:0',
                    '-t', f'{source_seconds:.9f}', '-ar', rate, '-ac', channels, '-f', 'f32le', 'pipe:1'])
        decoded[sid] = np.frombuffer(data, dtype='<f4').reshape(-1, channels)

    def sample(shot, first, last):
        source = decoded[shot['source']]
        indices = np.arange(first, last, dtype=np.int64)
        indices += (shot['source_in_frame'] - shot['timeline_in_frame']) * spf
        return source[np.clip(indices, 0, len(source) - 1)]

    seams = [0]
    for shot in timeline[1:]:
        # The visual overlap does not force a 250ms audio overlap.
        seams.append(shot['timeline_in_frame'] * spf + shot['transition_in']['frames'] * spf // 2)
    seams.append(total)
    audio = np.empty((total, channels), dtype=np.float32)
    for i, shot in enumerate(timeline):
        audio[seams[i]:seams[i+1]] = sample(shot, seams[i], seams[i+1])
    length = round(rate * acfg['crossfade_ms'] / 1000)
    assert length > 1
    diagnostics = []
    for i, seam in enumerate(seams[1:-1], 1):
        first, last = seam - length // 2, seam + (length - length // 2)
        assert seams[i-1] < first < last < seams[i+1]
        outgoing = sample(timeline[i-1], first, last)
        incoming = sample(timeline[i], first, last)
        weight = np.linspace(0, 1, length, dtype=np.float32)[:, None]
        audio[first:last] = outgoing * (1 - weight) + incoming * weight
        diagnostics.append({'into': timeline[i]['shot'], 'center_seconds': seam/rate,
                            'start_seconds': first/rate, 'end_seconds': last/rate,
                            'max_sample_step_in_crossfade': float(np.max(np.abs(np.diff(audio[first-1:last+1], axis=0))))})
    assert len(audio) == total and np.isfinite(audio).all()
    path = directory / 'audio-crossfaded.wav'
    run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', rate, '-ac', channels,
         '-i', 'pipe:0', '-c:a', 'pcm_f32le', path], input=audio.astype('<f4').tobytes())
    save_json(directory / 'audio-crossfades.json', {
        'sample_rate': rate, 'samples_per_channel': total, 'seconds': total/rate,
        'peak': float(np.max(np.abs(audio))), 'crossfade_ms': acfg['crossfade_ms'],
        'curve': 'linear complementary weights', 'boundaries': diagnostics})
    return path


def make_video(cfg, timeline, sources, dimensions, audio_path, directory, output):
    fps = cfg['fps']
    width, height = dimensions
    dar = Fraction(cfg['display_aspect_ratio'].replace(':', '/'))
    sar = dar * height / width
    source_ids = list(sources)
    graph = []
    for sid in source_ids:
        uses = [i for i, s in enumerate(timeline) if s['source'] == sid]
        graph.append(f'[{source_ids.index(sid)}:v:0]split={len(uses)}' + ''.join(f'[src{i}]' for i in uses))
    for i, s in enumerate(timeline):
        graph.append(f'[src{i}]trim=start_frame={s["source_in_frame"]}:end_frame={s["source_out_frame_exclusive"]},'
                     f'settb=expr=1/{fps},setpts=N,format=yuv420p,setsar={sar.numerator}/{sar.denominator}[v{i}]')
    label = 'v0'
    for i, s in enumerate(timeline[1:], 1):
        out = f'join{i}'
        if s['transition_in']['type'] == 'dissolve':
            overlap = s['transition_in']['frames'] / fps
            offset = s['timeline_in_frame'] / fps
            graph.append(f'[{label}][v{i}]xfade=transition=fade:duration={overlap:.9f}:offset={offset:.9f}[{out}raw]')
        else:
            graph.append(f'[{label}][v{i}]concat=n=2:v=1:a=0[{out}raw]')
        graph.append(f'[{out}raw]settb=expr=1/{fps},setpts=N[{out}]')
        label = out
    graph.append(f'[{label}]trim=end_frame={cfg["total_frames"]},settb=expr=1/{fps},setpts=N,'
                 f'format=yuv420p,setsar={sar.numerator}/{sar.denominator}[video]')
    filter_path = directory / 'filter_complex.txt'
    filter_path.write_text(';\n'.join(graph), encoding='utf-8')
    cmd = ['ffmpeg', '-hide_banner', '-y', '-filter_complex_threads', '1']
    for sid in source_ids:
        cmd += ['-i', sources[sid]]
    cmd += ['-i', audio_path, '-filter_complex', filter_path.read_text(encoding='utf-8'),
            '-map', '[video]', '-map', f'{len(source_ids)}:a:0', '-map_metadata', '-1',
            '-c:v', cfg['video']['codec'], '-crf', str(cfg['video']['crf']), '-preset', cfg['video']['preset'],
            '-pix_fmt', 'yuv420p', '-r', str(fps), '-fps_mode', 'cfr', '-video_track_timescale', '24000',
            '-color_primaries', 'bt709', '-color_trc', 'iec61966-2-1', '-colorspace', 'bt709', '-color_range', 'tv',
            '-c:a', cfg['audio']['codec'], '-b:a', cfg['audio']['bitrate'],
            '-ar', str(cfg['audio']['sample_rate']), '-ac', str(cfg['audio']['channels']),
            '-t', f'{cfg["total_frames"]/fps:.9f}', '-movflags', '+faststart', output]
    save_json(directory / 'ffmpeg-command.json', [str(x) for x in cmd])
    with (directory / 'build.log').open('w', encoding='utf-8') as log:
        subprocess.run([str(x) for x in cmd], check=True, stdout=log, stderr=log)


def contact_sheet(items, path, columns, width=432):
    thumb_height = width * 9 // 16
    row_height = thumb_height + 30
    out = Image.new('RGB', (columns*width, ((len(items)+columns-1)//columns)*row_height), '#161616')
    draw = ImageDraw.Draw(out)
    font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 15)
    for i, (label, img) in enumerate(items):
        x, y = i % columns * width, i // columns * row_height
        out.paste(img.resize((width, thumb_height), Image.Resampling.LANCZOS), (x, y+30))
        draw.text((x+5, y+5), label, font=font, fill='white')
    out.save(path)


def review(cfg, timeline, output, directory, dimensions):
    fps, count = cfg['fps'], cfg['total_frames']
    info = probe(output)
    save_json(directory / 'ffprobe.json', info)
    video = next(s for s in info['streams'] if s['codec_type'] == 'video')
    audio = next(s for s in info['streams'] if s['codec_type'] == 'audio')
    assert int(video['nb_frames']) == count
    assert Fraction(video['avg_frame_rate']) == fps
    assert (video['width'], video['height']) == dimensions
    assert Fraction(video['display_aspect_ratio'].replace(':','/')) == Fraction(16,9)
    expected = Fraction(count, fps)
    assert Fraction(info['format']['duration']) == expected
    assert Fraction(video['duration']) == expected and Fraction(audio['duration']) == expected
    assert video['codec_name'] == 'h264' and audio['codec_name'] == 'aac'
    decode = subprocess.run(['ffmpeg', '-hide_banner', '-v', 'error', '-xerror', '-i', str(output),
                             '-map', '0:v:0', '-map', '0:a:0', '-f', 'null', '-'], capture_output=True, check=True)
    (directory / 'decode-check.log').write_bytes(decode.stderr)

    grid = list(range(0, count, 2*fps))
    boundaries = []
    wanted = set(grid) | {count-1}
    for shot in timeline[1:]:
        first = shot['timeline_in_frame']
        length = shot['transition_in']['frames']
        if length:
            indices = list(range(first-2, first+length+2))
        else:
            indices = [first-2, first-1, first, first+1]
        indices = [n for n in indices if 0 <= n < count]
        boundaries.append((shot, indices))
        wanted.update(indices)
    frames_dir = directory / 'frames'
    frames_dir.mkdir(exist_ok=True)
    width, height = dimensions
    frame_bytes = width*height*3
    images, hashes, differences, stats = {}, {}, [], []
    proc = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', str(output), '-map', '0:v:0',
                             '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'], stdout=subprocess.PIPE)
    previous = None
    for n in range(count):
        data = proc.stdout.read(frame_bytes)
        assert len(data) == frame_bytes, f'Incomplete output frame {n}'
        arr = np.frombuffer(data, dtype=np.uint8).reshape(height, width, 3)
        gray = arr.mean(axis=2)
        stats.append({'frame': n, 'mean_rgb': float(gray.mean()), 'dark_pixel_fraction': float((gray<10).mean())})
        if previous is not None:
            differences.append({'frame': n, 'mean_absolute_rgb_difference': float(np.abs(arr.astype(np.int16)-previous).mean())})
        previous = arr.astype(np.int16)
        hashes.setdefault(hashlib.sha256(data).hexdigest(), []).append(n)
        if n in wanted:
            img = Image.frombytes('RGB', dimensions, data)
            images[n] = img
            img.save(frames_dir / f'f{n:04d}_{n/fps:09.6f}s.png')
    assert not proc.stdout.read(1), 'Unexpected extra video frame'
    assert proc.wait() == 0
    contact_sheet([(f'{n/fps:06.3f}s | f{n}', images[n]) for n in grid], directory / 'grid-2s.png', 3)
    index = []
    overview = []
    for shot, indices in boundaries:
        filename = f'boundary-{shot["shot"]}.png'
        contact_sheet([(f'{shot["shot"]} {shot["transition_in"]["type"]} f{n} | {n/fps:.6f}s', images[n])
                       for n in indices], directory / filename, 2)
        overview.extend((f'Into {shot["shot"]} f{n} | {n/fps:.6f}s', images[n]) for n in [indices[1], indices[-2]])
        index.append({'into_shot': shot['shot'], 'transition': shot['transition_in'],
                      'frames': indices, 'sheet': filename})
    contact_sheet(overview, directory / 'boundaries-overview.png', 2)
    save_json(directory / 'frame-analysis.json', {
        'black_candidates': [s for s in stats if s['dark_pixel_fraction'] > .98 or s['mean_rgb'] < 3],
        'exact_duplicate_groups': [v for v in hashes.values() if len(v)>1],
        'largest_frame_changes': sorted(differences, key=lambda x:x['mean_absolute_rgb_difference'], reverse=True)[:25],
        'all_frame_stats': stats, 'all_adjacent_frame_changes': differences})
    save_json(directory / 'boundary-index.json', index)
    summary = {'duration_seconds': float(info['format']['duration']), 'video_duration_seconds': float(video['duration']),
               'audio_duration_seconds': float(audio['duration']), 'frames': int(video['nb_frames']),
               'fps': video['avg_frame_rate'], 'width': width, 'height': height,
               'sar': video['sample_aspect_ratio'], 'dar': video['display_aspect_ratio'],
               'video_codec': video['codec_name'], 'audio_codec': audio['codec_name'],
               'audio_sample_rate': int(audio['sample_rate']), 'audio_channels': audio['channels'],
               'decode_errors': 0, 'black_candidates': sum(s['dark_pixel_fraction']>.98 or s['mean_rgb']<3 for s in stats),
               'exact_duplicate_frame_groups': sum(len(v)>1 for v in hashes.values())}
    save_json(directory / 'measurements.json', summary)
    return summary


def tc(frame, fps):
    seconds, f = divmod(frame, fps)
    return f'{seconds//3600:02d}:{seconds//60%60:02d}:{seconds%60:02d}:{f:02d}'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--edit', type=Path, default=Path(__file__).with_name('edit.json'))
    args = parser.parse_args()
    edit = args.edit.resolve()
    cfg = json.loads(edit.read_text(encoding='utf-8-sig'))
    directory = edit.parent / 'review'
    directory.mkdir(exist_ok=True)
    timeline = make_timeline(cfg)
    output = (edit.parent / cfg['output']).resolve()
    sources = {sid:(edit.parent / s['path']).resolve() for sid,s in cfg['sources'].items()}
    assert output not in sources.values(), 'Output must not overwrite a source'
    originals, sizes = {}, set()
    for sid, path in sources.items():
        sha = digest(path)
        assert sha == cfg['sources'][sid]['sha256'], f'Source hash mismatch: {sid}'
        originals[sid] = sha
        info = probe(path)
        v = next(s for s in info['streams'] if s['codec_type']=='video')
        assert Fraction(v['avg_frame_rate']) == cfg['fps']
        sizes.add((v['width'], v['height']))
        for shot in timeline:
            if shot['source'] == sid:
                assert 0 <= shot['source_in_frame'] < shot['source_out_frame_exclusive'] <= int(v['nb_frames'])
    assert len(sizes) == 1, 'All sources must have the same resolution'
    dimensions = sizes.pop()
    save_json(directory / 'resolved-timeline.json', timeline)
    lines = ['# Final cut', '', 'Timecode HH:MM:SS:FF at 24fps; OUT exclusive. Dissolve ranges overlap.', '',
             '| Shot | Source [IN, OUT) frames | Timeline IN | Timeline OUT | Transition in |',
             '|---|---|---|---|---|']
    for s in timeline:
        lines.append(f'| {s["shot"]} | {s["source"]} [{s["source_in_frame"]}, {s["source_out_frame_exclusive"]}) | '
                     f'{tc(s["timeline_in_frame"],cfg["fps"])} | {tc(s["timeline_out_frame_exclusive"],cfg["fps"])} | '
                     f'{s["transition_in"]["type"]} {s["transition_in"]["frames"]}f |')
    (directory / 'cut-table.md').write_text('\n'.join(lines)+'\n', encoding='utf-8')
    print('Validated edit.json; rendering', output, flush=True)
    audio = make_audio(cfg, timeline, sources, directory)
    make_video(cfg, timeline, sources, dimensions, audio, directory, output)
    summary = review(cfg, timeline, output, directory, dimensions)
    checks = {sid: {'before': originals[sid], 'after': digest(path)} for sid,path in sources.items()}
    assert all(v['before']==v['after'] for v in checks.values())
    save_json(directory / 'source-integrity.json', checks)
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
