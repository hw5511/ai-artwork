"""Reframe edit.json shots BEFORE transitions; copy the edited audio unchanged.

Usage: python session5/vertical/build_vertical.py [--crop path/to/crop.json]
Only crop.json needs editing to change framing. The timeline comes from edit.json.
Requires ffmpeg/ffprobe in PATH and Pillow for review contact sheets.
"""
import argparse
import hashlib
import json
import math
import subprocess
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def dump(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def sha(path):
    with path.open('rb') as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()


def probe(path, frames=False):
    return json.loads(subprocess.check_output([
        'ffprobe', '-v', 'error', *(['-count_frames'] if frames else []),
        '-show_streams', '-show_format', '-of', 'json', str(path)], encoding='utf-8'))


def pan_limits(c, length):
    return c.get('pan_start_frame', 0), c.get('pan_end_frame', length-1)


def x_at(c, n, length):
    a, b = pan_limits(c, length)
    t = max(0., min(1., (n-a)/max(1,b-a)))
    # FFmpeg crop floors x to the chroma grid for yuv420p (even pixels).
    return 2 * math.floor((c['x_start'] + (c['x_end']-c['x_start'])*t*t*(3-2*t))/2)


def crop_filter(config, c, length):
    w, h = config['crop_size']
    a, b = pan_limits(c, length)
    if c['x_start'] == c['x_end']:
        x = str(c['x_start'])
    else:
        t = f'clip((n-{a})/{b-a},0,1)'
        x = f"{c['x_start']}+({c['x_end']-c['x_start']})*({t})*({t})*(3-2*({t}))"
    ow, oh = config['output_size']
    return f"crop=w={w}:h={h}:x='{x}':y={config['y']},scale={ow}:{oh}:flags=lanczos,setsar=1"


def audio_packets(path):
    data = json.loads(subprocess.check_output([
        'ffprobe', '-v', 'error', '-select_streams', 'a:0', '-show_packets',
        '-show_data_hash', 'sha256', '-of', 'json', str(path)], encoding='utf-8'))
    return [{k:p.get(k) for k in ('pts','dts','duration','size','data_hash','side_data_list')}
            for p in data['packets']]


def audio_pcm_hash(path):
    return subprocess.check_output([
        'ffmpeg', '-v', 'error', '-i', str(path), '-map', '0:a:0',
        '-c:a', 'pcm_s16le', '-f', 'hash', '-hash', 'sha256', '-'], encoding='utf-8').strip()


def contact_sheet(items, path, columns):
    from PIL import Image, ImageDraw, ImageFont
    tile_w, tile_h, label_h = 270, 480, 48
    rows = math.ceil(len(items)/columns)
    sheet = Image.new('RGB', (columns*tile_w, rows*(tile_h+label_h)), '#181b21')
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 15)
    for i, (file, label) in enumerate(items):
        x, y = i%columns*tile_w, i//columns*(tile_h+label_h)
        draw.multiline_text((x+7,y+5),label,font=font,fill='white',spacing=3)
        with Image.open(file) as im:
            sheet.paste(im.convert('RGB').resize((tile_w,tile_h),Image.Resampling.LANCZOS),(x,y+label_h))
    sheet.save(path, quality=95)


def review(config, rows, output, folder):
    folder.mkdir(exist_ok=True)
    frames = folder/'frames'
    frames.mkdir(exist_ok=True)
    shot_items, timeline_items, indices = [], [], []
    for s in rows:
        for tag, local, timeline in [('first',0,s['timeline_start_frame']),
                                    ('last',s['duration_frames']-1,s['timeline_end_frame_exclusive']-1)]:
            path = frames/f"{s['id']}_{tag}_shot.png"
            # Same trim/crop/scale as the final graph; no dissolve obscuring an edge.
            vf = (f"trim=start_frame={s['in_frame']}:end_frame={s['out_frame']},"
                  f"setpts=PTS-STARTPTS,{crop_filter(config,s['crop'],s['duration_frames'])},"
                  f"select=eq(n\\,{local})")
            subprocess.run(['ffmpeg','-v','error','-y','-threads','2','-i',str(ROOT/s['source']),
                            '-vf',vf,'-frames:v','1','-update','1',str(path)],check=True)
            shot_items.append((path,f"{s['id']} {tag} | source f{s['in_frame']+local}\nx={x_at(s['crop'],local,s['duration_frames'])}"))
            actual = frames/f"{s['id']}_{tag}_output_f{timeline:04}.png"
            subprocess.run(['ffmpeg','-v','error','-y','-threads','2','-i',str(output),
                            '-vf',f'select=eq(n\\,{timeline})','-frames:v','1','-update','1',str(actual)],check=True)
            timeline_items.append((actual,f"{s['id']} {tag} | output f{timeline}\nt={timeline/config['_fps']:.6f}s"))
            indices.append({'shot':s['id'],'position':tag,'source_frame':s['in_frame']+local,
                            'output_frame':timeline,'shot_png':str(path.relative_to(ROOT)),
                            'output_png':str(actual.relative_to(ROOT))})
    contact_sheet(shot_items,folder/'shot-edges.jpg',4)
    contact_sheet(timeline_items,folder/'output-edges.jpg',4)
    dump(folder/'frame_index.json',indices)
    # Seven samples per shot also catch mid-shot drift missed by edge-only review.
    # Generate crops with the identical FFmpeg filter, at evenly spaced local frames.
    middle_items = []
    for s in rows:
        nframes = s['duration_frames']
        wanted = sorted(set(round((nframes-1)*i/6) for i in range(7)))
        pattern = frames/f"{s['id']}_sample_%02d.png"
        select = '+'.join(f'eq(n\\,{n})' for n in wanted)
        vf = (f"trim=start_frame={s['in_frame']}:end_frame={s['out_frame']},"
              f"setpts=PTS-STARTPTS,{crop_filter(config,s['crop'],nframes)},select='{select}'")
        subprocess.run(['ffmpeg','-v','error','-y','-threads','2','-i',str(ROOT/s['source']),
                        '-vf',vf,'-fps_mode','vfr',str(pattern)],check=True)
        for i,n in enumerate(wanted,1):
            middle_items.append((frames/f"{s['id']}_sample_{i:02d}.png",f"{s['id']} local f{n}\nx={x_at(s['crop'],n,nframes)}"))
    contact_sheet(middle_items,folder/'all-shot-samples.jpg',7)


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--crop',type=Path,default=Path(__file__).with_name('crop.json'))
    args = p.parse_args()
    config = json.loads(args.crop.read_text(encoding='utf-8-sig'))
    edit_path = ROOT/config['edit']
    edit = json.loads(edit_path.read_text(encoding='utf-8-sig'))
    output = ROOT/config['output']
    output.parent.mkdir(parents=True,exist_ok=True)
    build = output.parent/'build'
    build.mkdir(exist_ok=True)
    fps, target = edit['fps'], edit['target_frames']
    config['_fps'] = fps
    soundtrack = ROOT/edit['output']
    assert soundtrack.is_file(), 'The original edit soundtrack must exist'
    source_probe = probe(soundtrack)
    sv = next(s for s in source_probe['streams'] if s['codec_type']=='video')
    sw, sh = sv['width'],sv['height']
    cw,ch = config['crop_size']
    ow,oh = config['output_size']
    assert (ow,oh)==(1080,1920) and cw*oh==ch*ow
    assert all(n%2==0 for n in (cw,ch,config['y']))
    assert 0<=config['y'] and config['y']+ch<=sh
    assert config['y']+ch<=config['bottom_strip']['excluded_rows'][0]
    assert Fraction(sv['avg_frame_rate'])==fps
    crops = {s['id']:s for s in config['shots']}
    assert set(crops)=={s['id'] for s in edit['shots']}
    rows, inputs, graph, cursor = [],[],[],0
    originals = {edit_path,soundtrack,*[ROOT/s['source'] for s in edit['shots']]}
    assert output.resolve() not in {x.resolve() for x in originals}
    hashes = {str(x.relative_to(ROOT)):sha(x) for x in originals}
    for i,s in enumerate(edit['shots']):
        c = crops[s['id']]
        length = s['out_frame']-s['in_frame']
        a,b = pan_limits(c,length)
        assert 0<=a<b<length
        assert all(isinstance(c[k],int) and c[k]%2==0 and 0<=c[k]<=sw-cw for k in ('x_start','x_end'))
        tr = s.get('transition_in',{'type':'cut','frames':0})
        kind = 'start' if i==0 else tr['type']
        assert kind in ('start','cut','dissolve')
        overlap = tr.get('frames',0) if kind=='dissolve' else 0
        start = cursor-overlap
        cursor = start+length
        row = dict(s,crop=c,duration_frames=length,timeline_start_frame=start,
                   timeline_end_frame_exclusive=cursor,overlap_frames=overlap)
        rows.append(row)
        inputs.extend(['-threads','2','-i',str(ROOT/s['source'])])
        graph.append(f"[{i}:v:0]trim=start_frame={s['in_frame']}:end_frame={s['out_frame']},"
                     f"settb=1/{fps},setpts=N,{crop_filter(config,c,length)},format=yuv420p[v{i}]")
    assert cursor==target
    previous = 'v0'
    for i,s in enumerate(rows[1:],1):
        join = (f"xfade=transition=fade:duration={s['overlap_frames']/fps:.9f}:"
                f"offset={s['timeline_start_frame']/fps:.9f}" if s['overlap_frames'] else 'concat=n=2:v=1:a=0')
        graph.append(f"[{previous}][v{i}]{join},settb=1/{fps},"
                     f"trim=end_frame={s['timeline_end_frame_exclusive']},setpts=N[jv{i}]")
        previous = f'jv{i}'
    graph.append(f'[{previous}]trim=end_frame={target},settb=1/{fps},setpts=N[vout]')
    graph_text = ';\n'.join(graph)
    (build/'filtergraph.txt').write_text(graph_text,encoding='utf-8')
    dump(build/'resolved_timeline.json',{'fps':fps,'total_frames':target,'shots':rows})
    temp = output.with_name(output.stem+'.building.mp4')
    cmd = ['ffmpeg','-hide_banner','-y','-filter_complex_threads','2',*inputs,
           '-i',str(soundtrack),'-filter_complex',graph_text,'-map','[vout]',
           '-map',f'{len(rows)}:a:0','-c:v','libx264','-preset','medium','-crf','18',
           '-pix_fmt','yuv420p','-r',str(fps),'-fps_mode','cfr','-threads','4',
           '-color_primaries',sv.get('color_primaries','bt709'),
           '-color_trc',sv.get('color_transfer','iec61966-2-1'),
           '-colorspace',sv.get('color_space','bt709'),'-color_range',sv.get('color_range','tv'),
           '-c:a','copy','-t',f'{target/fps:.9f}','-map_metadata','-1',
           '-movflags','+faststart','-video_track_timescale','12288',str(temp)]
    dump(build/'ffmpeg_command.json',cmd)
    print('Rendering six reframed shots with original edit transitions...',flush=True)
    with (build/'ffmpeg.log').open('w',encoding='utf-8') as log:
        subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT,check=True)
    measured = probe(temp,frames=True)
    v = next(s for s in measured['streams'] if s['codec_type']=='video')
    audio = next(s for s in measured['streams'] if s['codec_type']=='audio')
    assert (v['width'],v['height'])==(ow,oh)
    assert int(v['nb_read_frames'])==target and Fraction(v['avg_frame_rate'])==fps
    assert all(Fraction(x)==Fraction(target,fps) for x in (v['duration'],audio['duration'],measured['format']['duration']))
    packet_identical = audio_packets(soundtrack)==audio_packets(temp)
    pcm_identical = audio_pcm_hash(soundtrack)==audio_pcm_hash(temp)
    assert packet_identical and pcm_identical, 'Soundtrack or its timestamps changed'
    assert hashes=={name:sha(ROOT/name) for name in hashes}, 'An original input changed'
    temp.replace(output)
    measured['format']['filename'] = str(output)
    dump(output.parent/'vertical.ffprobe.json',measured)
    metrics = []
    for s in rows:
        c = s['crop']
        checks = []
        for check in c.get('focus_checks',[]):
            x = x_at(c,check['local_frame'],s['duration_frames'])
            l,t,r,b = check['bbox']
            margins = [l-x,t-config['y'],x+cw-r,config['y']+ch-b]
            checks.append(dict(check,crop_x=x,margins_ltrb=margins,
                               fully_contained=min(margins)>=0))
        metrics.append({'id':s['id'],'focus':c['focus'],'x_start':c['x_start'],'x_end':c['x_end'],
                        'sampled_focus_boxes_contained':all(k['fully_contained'] for k in checks),
                        'minimum_sampled_focus_margin_source_px':min(min(k['margins_ltrb']) for k in checks),
                        'source_preexisting_clipping':c.get('source_preexisting_clipping'),
                        'manual_sample_checks':checks})
    report = {'output':str(output.relative_to(ROOT)),'resolution':[ow,oh],'fps':fps,
              'frame_count':target,'duration_seconds':target/fps,'crop_source_px':[cw,ch],
              'bottom_removed_px':sh-config['y']-ch,'pixel_scale_x':ow/cw,'pixel_scale_y':oh/ch,
              'relative_zoom_vs_full_width_fit':sw/cw,'source_width_retained_percent':100*cw/sw,
              'source_area_retained_percent':100*cw*ch/(sw*sh),
              'audio_packets_and_timestamps_identical':packet_identical,'decoded_audio_pcm_identical':pcm_identical,
              'audio_sample_rate':int(audio['sample_rate']),'audio_channels':audio['channels'],
              'audio_duration_samples':round(float(audio['duration'])*int(audio['sample_rate'])),
              'cut_start_frames':[s['timeline_start_frame'] for s in rows[1:] if not s['overlap_frames']],
              'dissolves':[{'start_frame':s['timeline_start_frame'],'frames':s['overlap_frames']} for s in rows if s['overlap_frames']],
              'inputs_unchanged':True,'input_sha256':hashes,'crop_sha256':sha(args.crop),'output_sha256':sha(output),
              'focus_measurement_scope':'Manual source-pixel feature boxes on seven samples per shot. Endpoint grids and intermediate samples require visual review. Boxes do not assert whole-head or whole-hand containment.',
              'shots':metrics}
    dump(output.parent/'measurements.json',report)
    print('Video validated; audio packets/timestamps and decoded PCM are identical. Extracting review grids...',flush=True)
    review(config,rows,output,output.parent/'review')
    print(json.dumps({k:v for k,v in report.items() if k not in ('input_sha256','shots')},ensure_ascii=False,indent=2),flush=True)


if __name__=='__main__':
    main()
