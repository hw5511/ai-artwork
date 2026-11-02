"""Build full, uncut Supertonic M1/ko sentences on a 30-second sample timeline.

Run: session5/.venv/Scripts/python.exe session5/narration/build_narration.py
Requires supertonic, numpy, soundfile, ffmpeg and ffprobe. Every synthesis uses
the actual Supertonic CLI --speed option, with a fixed numpy seed. No trimming,
time stretching, fading, limiting, or dynamic compression is used.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
from importlib.metadata import version

import numpy as np
import soundfile as sf

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
RATE = 48000
TOTAL_SAMPLES = 30 * RATE
MODEL = "supertonic-3"
VOICE = "M1"
LANG = "ko"
STEPS = 8
SPEEDS = (1.00, 1.05, 1.10, 1.15, 1.20, 1.25)
# Editorial alternatives are used ONLY after the original fails at speed 1.25.
SHORTER = {
    "C1-S1": ["산책에 정해진 속도는 없다.", "산책엔 정해진 속도가 없다."],
    "C1-S2": ["기다림도 동행이다.", "기다림도 동행."],
    "C2-S1": ["같은 길도 새롭다.", "날마다 새롭다."],
    "C2-S2": ["말없이도 서로의 때를 안다.", "말없이 서로를 안다."],
    "C3-S1": ["그 여유가 사람에게도 남는다.", "그 여유가 남는다."],
    "C3-S2": ["이 길에선 서로가 기준이다.", "서로가 기준이다."],
}


def save_json(path, data):
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8-sig"))


def run(args):
    result = subprocess.run([str(a) for a in args], capture_output=True, encoding="utf-8",
                            errors="replace", env={**os.environ, "PYTHONIOENCODING": "utf-8"})
    if result.returncode:
        raise RuntimeError(f"Command failed: {args}\n{result.stdout}\n{result.stderr}")
    return result


def probe(path):
    return json.loads(run(["ffprobe", "-v", "error", "-show_streams", "-show_format",
                           "-of", "json", path]).stdout)


def duration(path):
    return float(probe(path)["format"]["duration"])


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def syllables(text):
    """Count precomposed Korean syllable blocks, ignoring spaces/punctuation."""
    return sum("가" <= c <= "힣" for c in text)


def measure(path, log):
    result = run(["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af",
                  "loudnorm=I=-20:TP=-1:LRA=11:print_format=json", "-f", "null", "-"])
    Path(log).write_text(result.stderr, encoding="utf-8")
    data = json.loads(re.findall(r'\{\s*"input_i".*?\}', result.stderr, re.S)[-1])
    metrics = {"integrated_lufs": float(data["input_i"]),
               "true_peak_dbtp": float(data["input_tp"]),
               "lra_lu": float(data["input_lra"]),
               "gate_threshold_lufs": float(data["input_thresh"])}
    samples, rate = sf.read(str(path), dtype="float64")
    if not all(math.isfinite(v) for v in metrics.values()):
        raise RuntimeError(f"Non-finite loudness: {path}")
    metrics.update(sample_peak_dbfs=round(20 * math.log10(max(np.max(np.abs(samples)), 1e-15)), 4),
                   rms_dbfs=round(20 * math.log10(max(np.sqrt(np.mean(samples ** 2)), 1e-15)), 4))
    return metrics


def synthesize(line, text, speed, revision, seed, attempts_dir):
    stem = f"{line['id']}_r{revision}_s{speed:.2f}"
    raw = attempts_dir / f"{stem}.wav"
    # Seeding the CLI process makes the model's np.random.randn repeatable.
    wrapper = f"import numpy as np; np.random.seed({seed}); from supertonic.cli import main; main()"
    command = [sys.executable, "-c", wrapper, "tts", text, "--model", MODEL,
               "--voice", VOICE, "--lang", LANG, "--steps", str(STEPS),
               "--speed", f"{speed:.2f}", "--output", str(raw)]
    result = run(command)
    (attempts_dir / f"{stem}.log").write_text(result.stdout + result.stderr, encoding="utf-8")
    p = probe(raw)
    save_json(attempts_dir / f"{stem}.ffprobe.json", p)
    # Resample the complete file, without setting a duration or sample limit.
    candidate = attempts_dir / f"{stem}_48k.wav"
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", raw,
         "-ar", str(RATE), "-ac", "1", "-c:a", "pcm_s24le", candidate])
    info = sf.info(str(candidate))
    record = {"text": text, "revision": revision, "speed": speed, "seed": seed,
              "raw_wav": raw.relative_to(ROOT).as_posix(), "raw_duration_sec": float(p["format"]["duration"]),
              "duration_sec": info.frames / RATE, "samples_48k": info.frames,
              "sha256": sha256(raw), "command": command}
    print(f"{line['id']} r{revision} --speed {speed:.2f}: {info.frames / RATE:.6f}s", flush=True)
    return candidate, record


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cache-dir", type=Path, help="Optional predownloaded Supertonic model directory")
    args = parser.parse_args()
    if args.cache_dir:
        os.environ["SUPERTONIC_CACHE_DIR"] = str(args.cache_dir.resolve())
    for exe in ("ffmpeg", "ffprobe"):
        if not shutil.which(exe):
            raise RuntimeError(f"Missing executable: {exe}")
    lines_path = HERE / "lines.json"
    lines = load_json(lines_path)
    original = HERE / "lines-original.json"
    if not original.exists():
        shutil.copyfile(lines_path, original)
    timeline_path = ROOT / "session5/edit/build/resolved_timeline.json"
    timeline = load_json(timeline_path)
    assert timeline["total_frames"] / timeline["fps"] == 30
    shots = timeline["shots"]
    shot_by_id = {s["id"]: s for s in shots}
    ordered = sorted(lines, key=lambda x: x["start"])
    assert len({x["id"] for x in lines}) == len(lines)
    for index, line in enumerate(ordered):
        shot = shot_by_id[line["id"]]
        # Restrict speech to the pure shot, excluding both sides of a dissolve.
        j = shots.index(shot)
        shot_start = max(shot["timeline_start_sec"], shots[j-1]["timeline_end_sec"] if j else 0)
        shot_end = min(shot["timeline_end_sec"], shots[j+1]["timeline_start_sec"] if j+1 < len(shots) else 30)
        assert 0 <= shot_start <= line["start"] < line["end"] <= shot_end <= 30, line
        if index:
            assert ordered[index-1]["end"] <= line["start"], "Input windows overlap"
        line["syllables"] = syllables(line["text"])
        line["_shot_start"] = shot_start
        line["_shot_end"] = shot_end
    attempts_dir = HERE / "lines/attempts"
    attempts_dir.mkdir(parents=True, exist_ok=True)
    logs = HERE / "measurements"
    logs.mkdir(exist_ok=True)
    all_attempts = []
    selected = []
    for index, line in enumerate(ordered):
        budget = math.floor(line["end"] * RATE + 1e-7) - round(line["start"] * RATE)
        variants = [line["text"], *SHORTER.get(line["id"], [])]
        chosen = None
        for revision, text in enumerate(variants):
            if revision:
                # Persist the shorter script BEFORE generating it.
                line["text"] = text
                line["syllables"] = syllables(text)
                save_json(lines_path, [{k: v for k, v in x.items() if not k.startswith("_")} for x in lines])
            for speed in SPEEDS:
                candidate, record = synthesize(line, text, speed, revision, 5000 + index, attempts_dir)
                record["fits"] = record["samples_48k"] <= budget
                record["id"] = line["id"]
                all_attempts.append(record)
                save_json(HERE / "generation-attempts.json", all_attempts)
                if record["fits"]:
                    chosen = (candidate, record)
                    break
            if chosen:
                break
        if chosen is None:
            raise RuntimeError(f"No complete sentence fits {line['id']} at or below speed 1.25")
        selected.append((line, *chosen))
    before = [measure(p, logs / f"{line['id']}-before.log") for line, p, rec in selected]
    # Linear gain only. Lower the common target if necessary to preserve headroom.
    target = round(min(-20.0, min(m["integrated_lufs"] - 1.10 - m["true_peak_dbtp"] for m in before)), 2)
    master = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    final_lines = []
    occupied = np.zeros(TOTAL_SAMPLES, dtype=np.bool_)
    for (line, candidate, rec), metrics in zip(selected, before):
        output = HERE / "lines" / f"{line['id']}.wav"
        gain_db = target - metrics["integrated_lufs"]
        run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", candidate,
             "-af", f"volume={gain_db:.6f}dB:precision=double", "-c:a", "pcm_s24le", output])
        data, rate = sf.read(str(output), dtype="float64")
        assert rate == RATE and len(data) == rec["samples_48k"]
        start_sample = round(line["start"] * RATE)
        end_sample = start_sample + len(data)
        assert end_sample <= math.floor(line["end"] * RATE + 1e-7)
        assert not occupied[start_sample:end_sample].any()
        occupied[start_sample:end_sample] = True
        master[start_sample:end_sample] = data
        after = measure(output, logs / f"{line['id']}-after.log")
        assert abs(after["integrated_lufs"] - target) <= .15, after
        assert after["true_peak_dbtp"] <= -1, after
        save_json(logs / f"{line['id']}.ffprobe.json", probe(output))
        # These optional times describe measured activity, without removing silence.
        active = np.flatnonzero(np.abs(data) > 10 ** (-60 / 20))
        final_lines.append({"id": line["id"], "text": line["text"], "voice": VOICE, "lang": LANG,
            "model": MODEL, "steps": STEPS, "speed": rec["speed"], "syllables": syllables(line["text"]),
            "start": start_sample / RATE, "end": end_sample / RATE,
            "actual_start": start_sample / RATE, "actual_end": end_sample / RATE,
            "duration_sec": len(data) / RATE, "planned_start": line["start"], "planned_end": line["end"],
            "start_sample": start_sample, "end_sample_exclusive": end_sample, "sample_count": len(data),
            "speech_onset_minus60dbfs_sec": (start_sample + int(active[0])) / RATE if len(active) else None,
            "speech_offset_minus60dbfs_sec": (start_sample + int(active[-1]) + 1) / RATE if len(active) else None,
            "shot_start_sec": line["_shot_start"], "shot_end_sec": line["_shot_end"],
            "slot_margin_sec": line["end"] - end_sample / RATE,
            "shot_margin_sec": line["_shot_end"] - end_sample / RATE,
            "overlap": False, "crosses_shot_boundary": False, "clipped_or_trimmed": False,
            "gain_db": round(gain_db, 4), "loudness_before": metrics, "loudness_after": after,
            "wav": output.relative_to(ROOT).as_posix(), "sha256": sha256(output)})
    output = HERE / "narration.wav"
    sf.write(str(output), master, RATE, subtype="PCM_24")
    decoded, rate = sf.read(str(output), dtype="float64")
    assert len(decoded) == TOTAL_SAMPLES and rate == RATE
    assert np.array_equal(decoded, master), "Master differs from full sentence samples"
    assert not decoded[~occupied].any(), "Unexpected signal in gaps"
    p = probe(output)
    save_json(HERE / "narration.ffprobe.json", p)
    assert float(p["format"]["duration"]) == 30.0
    assert int(p["streams"][0]["duration_ts"]) == TOTAL_SAMPLES
    final_metrics = measure(output, logs / "narration.log")
    lufs = [x["loudness_after"]["integrated_lufs"] for x in final_lines]
    save_json(HERE / "lines-final.json", final_lines)
    summary = {"model": MODEL, "voice": VOICE, "lang": LANG, "sample_rate": RATE,
        "channels": 1, "subtype": "PCM_24", "duration_sec": 30.0, "samples": TOTAL_SAMPLES,
        "sha256": sha256(output), "target_sentence_lufs": target,
        "sentence_loudness_spread_lu": round(max(lufs) - min(lufs), 2), "loudness": final_metrics,
        "checks": {"no_overlap": True, "within_shots_excluding_dissolve": True,
                   "within_planned_windows": True, "no_trim": True,
                   "all_sentence_samples_preserved": True, "gaps_are_silent": True,
                   "exactly_30_seconds": True, "speed_at_most_1_25": all(x["speed"] <= 1.25 for x in final_lines)},
        "timeline_source": timeline_path.relative_to(ROOT).as_posix(), "timeline_sha256": sha256(timeline_path),
        "versions": {"python": sys.version, "supertonic": version("supertonic"),
                     "numpy": np.__version__, "soundfile": sf.__version__,
                     "ffmpeg": run(["ffmpeg", "-version"]).stdout.splitlines()[0]},
        "syllable_definition": "Count of Hangul syllable blocks U+AC00 through U+D7A3",
        "timing_definition": "Full WAV placement [actual_start, actual_end), including model silence; optional speech onset/offset use -60 dBFS threshold"}
    save_json(HERE / "validation.json", summary)
    cleaned_lines = [{k: v for k, v in x.items() if not k.startswith("_")} for x in lines]
    if load_json(lines_path) != cleaned_lines:
        save_json(lines_path, cleaned_lines)
    report = ["# 내레이션 생성·검증", "",
        "Supertonic-3 · M1 · ko. 샷 구간은 실제 완성본 타임라인을 사용하며 디졸브 중첩을 제외했다.",
        "실제 시작·끝은 모델이 만든 무음까지 포함한 전체 WAV 배치 구간이다. 음성 자르기·시간 늘이기 없음.", "",
        "| 문장 | 지정 구간(초) | 실제 시작–끝(초) | 길이(초) | 속도 | 음절 | 순수 샷 구간(초) | 겹침 | 경계 초과 |",
        "|---|---:|---:|---:|---:|---:|---:|---|---|"]
    for x in final_lines:
        report.append(f"| {x['id']} | {x['planned_start']:.3f}–{x['planned_end']:.3f} | {x['actual_start']:.6f}–{x['actual_end']:.6f} | {x['duration_sec']:.6f} | {x['speed']:.2f} | {x['syllables']} | {x['shot_start_sec']:.6f}–{x['shot_end_sec']:.6f} | 없음 | 없음 |")
    report.extend(["", "| 문장 | 보정 전 LUFS-I | 보정 후 LUFS-I | 보정 후 dBTP | 적용 gain(dB) |",
                   "|---|---:|---:|---:|---:|"])
    for x in final_lines:
        report.append(f"| {x['id']} | {x['loudness_before']['integrated_lufs']:.2f} | {x['loudness_after']['integrated_lufs']:.2f} | {x['loudness_after']['true_peak_dbtp']:.2f} | {x['gain_db']:+.2f} |")
    report.extend(["", f"문장 목표 {target:.2f} LUFS-I, 문장 간 편차 {summary['sentence_loudness_spread_lu']:.2f} LU.",
        f"전체 트랙: {final_metrics['integrated_lufs']:.2f} LUFS-I, {final_metrics['true_peak_dbtp']:.2f} dBTP, LRA {final_metrics['lra_lu']:.2f} LU.",
        "48,000 Hz · 모노 · PCM 24-bit · 1,440,000 samples = 정확히 30.000초.",
        "전체 트랙 LUFS는 문장 사이 무음과 게이팅의 영향으로 문장별 값과 다를 수 있다.",
        "ffprobe 결과, 생성별 명령·길이, 음량 측정 로그는 각각 narration.ffprobe.json, generation-attempts.json, measurements/에 저장했다.",
        "", "재실행: `session5/.venv/Scripts/python.exe session5/narration/build_narration.py`", ""])
    (HERE / "validation.md").write_text("\n".join(report), encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2), flush=True)


if __name__ == "__main__":
    main()
