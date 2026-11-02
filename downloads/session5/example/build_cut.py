"""Build a frame-accurate cut from edit.json. Run from any working directory.

Reorder the shots array (including its incoming transitions) in edit.json to
re-edit; output timeline positions and audio handles are always recalculated.
The first shot's incoming transition is ignored. No source is ever written.
"""
import argparse
import hashlib
import json
import subprocess
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def dump(path, data):
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def probe(path):
    return json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-count_frames", "-show_streams",
        "-show_format", "-of", "json", str(path)], encoding="utf-8"))


def sha(path):
    with path.open("rb") as f:
        return hashlib.file_digest(f, "sha256").hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--edit", type=Path, default=Path(__file__).with_name("edit.json"))
    args = parser.parse_args()
    config_path = args.edit.resolve()
    config = json.loads(config_path.read_text(encoding="utf-8-sig"))
    out = (ROOT / config["output"]).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    build = out.parent / "build"
    build.mkdir(exist_ok=True)
    fps, target = config["fps"], config["target_frames"]
    rate = config["audio"]["sample_rate"]
    assert fps == 24 and target == 720, "Delivery requires 720 frames at 24 fps"
    assert rate % fps == 0, "Audio sample rate must divide frame boundaries exactly"
    spf = rate // fps
    cross_samples = round(rate * config["audio"]["crossfade_ms"] / 1000)
    assert cross_samples > 0 and cross_samples % 2 == 0
    half = cross_samples // 2
    shots = config["shots"]
    assert shots, "Empty edit"
    inputs, rows, hashes = [], [], {}
    size = None
    cursor = 0
    dissolves = 0
    source_probes = {}
    for i, s in enumerate(shots):
        src = (ROOT / s["source"]).resolve()
        assert src != out, "Refusing to overwrite a source"
        assert src.is_file(), f"Missing source {src}"
        if str(src) not in source_probes:
            source_probes[str(src)] = probe(src)
            hashes[s["source"]] = sha(src)
        p = source_probes[str(src)]
        v = next(x for x in p["streams"] if x["codec_type"] == "video")
        assert any(x["codec_type"] == "audio" for x in p["streams"])
        current_size = (v["width"], v["height"])
        size = size or current_size
        assert size == current_size and size[0] * 9 == size[1] * 16
        assert Fraction(v["avg_frame_rate"]) == fps
        a, b = s["in_frame"], s["out_frame"]
        assert isinstance(a, int) and isinstance(b, int) and 0 <= a < b <= int(v["nb_read_frames"])
        transition = s.get("transition_in", {"type": "cut", "frames": 0})
        kind = "start" if i == 0 else transition["type"]
        assert kind in ("start", "cut", "dissolve")
        assert i == 0 or kind != "start", "Only the first shot may use start"
        overlap = transition.get("frames", 0) if kind == "dissolve" else 0
        if kind == "dissolve":
            dissolves += 1
            assert overlap == fps // 2, "Dissolve must last exactly 0.5 seconds"
            assert overlap < b - a and overlap < rows[-1]["duration_frames"]
        start = cursor - overlap
        cursor = start + b - a
        row = dict(s, order=i + 1, transition=kind, overlap_frames=overlap,
                   duration_frames=b-a, timeline_start_frame=start,
                   timeline_end_frame_exclusive=cursor,
                   timeline_start_sec=start/fps, timeline_end_sec=cursor/fps)
        rows.append(row)
        inputs.extend(["-threads", "2", "-i", str(src)])
    assert dissolves == 1, "Exactly one dissolve is required"
    assert cursor == target, f"Edit computes to {cursor} frames; expected {target}. Adjust trims in edit.json."
    # Detect accidental replay of any source interval, even after shot reordering.
    for i, a in enumerate(rows):
        for b in rows[i+1:]:
            if a["source"] == b["source"]:
                assert max(a["in_frame"], b["in_frame"]) >= min(a["out_frame"], b["out_frame"]), "Source frames reused"
    dump(build / "source_hashes_before.json", hashes)
    dump(build / "resolved_timeline.json", {"fps": fps, "total_frames": cursor, "shots": rows})
    graph = []
    for i, s in enumerate(rows):
        graph.append(f"[{i}:v:0]trim=start_frame={s['in_frame']}:end_frame={s['out_frame']},"
                     f"settb=1/{fps},setpts=N,setsar=1,format=yuv420p[v{i}]")
    previous = "v0"
    for i, s in enumerate(rows[1:], 1):
        if s["transition"] == "dissolve":
            join = (f"xfade=transition=fade:duration={s['overlap_frames']/fps:.9f}:"
                    f"offset={s['timeline_start_frame']/fps:.9f}")
        else:
            join = "concat=n=2:v=1:a=0"
        graph.append(f"[{previous}][v{i}]{join},settb=1/{fps},"
                     f"trim=end_frame={s['timeline_end_frame_exclusive']},setpts=N[jv{i}]")
        previous = f"jv{i}"
    graph.append(f"[{previous}]trim=end_frame={target},settb=1/{fps},setpts=N[vout]")
    # Audio switches at cuts, or at the midpoint of the visual dissolve. Extra
    # source handles overlap 20 ms, so acrossfade neither shortens time nor
    # shifts subsequent audio. Linear curves preserve correlated ambience.
    boundaries = [0] + [s["timeline_start_frame"] * spf + s["overlap_frames"] * spf // 2
                            for s in rows[1:]] + [target * spf]
    for i, s in enumerate(rows):
        left, right = boundaries[i], boundaries[i+1]
        source_left = s["in_frame"] * spf + left - s["timeline_start_frame"] * spf
        source_right = source_left + right - left
        if i:
            source_left -= half
        if i < len(rows)-1:
            source_right += half
        assert source_left >= 0, "Not enough source audio for incoming handle"
        # apad covers the <1-frame source audio/video tail difference only.
        graph.append(f"[{i}:a:0]aresample={rate},aformat=sample_fmts=fltp:channel_layouts=stereo,"
                     f"apad=pad_dur=0.1,atrim=start_sample={source_left}:end_sample={source_right},"
                     f"asetpts=N/SR/TB[a{i}]")
        s["audio_switch_in_sec"] = left / rate
        s["audio_switch_out_sec"] = right / rate
        s["audio_source_start_sample_with_handle"] = source_left
        s["audio_source_end_sample_with_handle"] = source_right
    previous = "a0"
    for i in range(1, len(rows)):
        graph.append(f"[{previous}][a{i}]acrossfade=ns={cross_samples}:c1=tri:c2=tri[ja{i}]")
        previous = f"ja{i}"
    edge = round(rate * config["audio"]["edge_fade_ms"] / 1000)
    samples = target * spf
    graph.append(f"[{previous}]atrim=end_sample={samples},asetpts=N/SR/TB,"
                 f"afade=t=in:ss=0:ns={edge},afade=t=out:ss={samples-edge}:ns={edge}[aout]")
    graph_text = ";\n".join(graph)
    (build / "filtergraph.txt").write_text(graph_text, encoding="utf-8")
    dump(build / "resolved_timeline.json", {"fps": fps, "total_frames": cursor, "shots": rows})
    # Use a temporary sibling, so an unsuccessful run does not replace a cut.
    temporary = out.with_name(out.stem + ".building.mp4")
    video, audio = config["video"], config["audio"]
    cmd = ["ffmpeg", "-hide_banner", "-y", "-filter_complex_threads", "2", *inputs,
           "-filter_complex", graph_text, "-map", "[vout]", "-map", "[aout]",
           "-c:v", video["codec"], "-preset", video["preset"], "-crf", str(video["crf"]),
           "-pix_fmt", video["pixel_format"], "-r", str(fps), "-fps_mode", "cfr",
           "-threads", "4", "-color_primaries", "bt709", "-color_trc", "iec61966-2-1",
           "-colorspace", "bt709", "-color_range", "tv",
           "-c:a", audio["codec"], "-b:a", audio["bitrate"], "-ar", str(rate),
           "-t", f"{target/fps:.9f}", "-map_metadata", "-1", "-movflags", "+faststart",
           "-video_track_timescale", "12288", str(temporary)]
    dump(build / "ffmpeg_command.json", cmd)
    with (build / "ffmpeg.log").open("w", encoding="utf-8") as log:
        subprocess.run(cmd, stdout=log, stderr=subprocess.STDOUT, check=True)
    measured = probe(temporary)
    v = next(s for s in measured["streams"] if s["codec_type"] == "video")
    a = next(s for s in measured["streams"] if s["codec_type"] == "audio")
    assert int(v["nb_read_frames"]) == target
    assert Fraction(v["avg_frame_rate"]) == fps
    assert Fraction(v["duration"]) == Fraction(target, fps)
    assert Fraction(a["duration"]) == Fraction(target, fps)
    assert Fraction(measured["format"]["duration"]) == Fraction(target, fps)
    assert (v["width"], v["height"]) == size
    assert v["codec_name"] == "h264" and a["codec_name"] == "aac"
    after = {name: sha(ROOT / name) for name in hashes}
    assert after == hashes, "Source file changed during rendering"
    dump(build / "source_hashes_after.json", after)
    temporary.replace(out)
    measured["format"]["filename"] = str(out)
    dump(out.parent / "cut-16x9.ffprobe.json", measured)
    dump(build / "render_manifest.json", {"edit_sha256": sha(config_path), "output_sha256": sha(out),
          "sources_unchanged": True, "frames": target, "audio_samples": samples,
          "width": size[0], "height": size[1]})
    print(f"Built {out}: {target} frames, {target/fps:.3f}s, {fps}fps, {size[0]}x{size[1]}, H.264/AAC")


if __name__ == "__main__":
    main()
