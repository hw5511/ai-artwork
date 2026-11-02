# 5회차 인수인계 (2026-11-03 새 흐름 완료 시점)

수업: 2026-11-03 화 18:00 KST. 워크트리 `C:/wi/projects/lectures/ai-artwork-s5`, 브랜치 `session5-2026-11`, 마지막 커밋 6ff7f3c. push, merge, 배포 금지(CEO가 「배포해」라고 해야 함).

## 끝난 것
- 새 흐름 전체를 Codex CLI 리허설로 실행: 업스케일(허브 로컬) -> 03 Remotion 스킬 설치 -> 04 소스 가공 -> 05 시각 자료 -> 06 earshot 설치 -> 07 소리 고르기 -> 08 Remotion 편집 -> 09 최종 확인. 프롬프트 `RC/prompts/`, 슬라이드용 사본 `RC/_pm/student-prompts/`, 시간 `RC/logs/timings.jsonl`. RC = `C:/Users/woohee/AppData/Local/Temp/artwork-s5/rehearsal-class`
- 최종 영상 `RC/work/session5/final/my-short.mp4` = `downloads/session5/demo/my-short.mp4`: 30.000초, 1080x1920, 24fps, -14.04 LUFS, -2.1 dBTP. 2초 격자를 원본 크기로 직접 확인함
- 슬라이드 파트 1~9, `step05.json`, `web/scripts/migration-manifest.json`, 다운로드 폴더, `docs/session5-review.md` 갱신. `node web/scripts/check-content.mjs` 오류 0, `cd web && npm run build` 통과
- 첫 시도 결함 3개를 프롬프트에 반영해 단계 재실행: 04(제품 샷 단색 띠 -> 훑기), 08(이미지 미사용, 음량 -29 LUFS)
- 옛 흐름(나레이션, 소리 믹스, 자막, 세로 개별 프롬프트)은 `RC/history/old-flow-1102/`에 보관. 레포에는 없음

## CEO가 볼 문제: 화면 속 음악 크레딧
- 영상 마지막 6초(24~30초) 아래쪽에 크레딧 원문이 어두운 상자로 길게 뜬다(AcidJazz, Kevin MacLeod, CC BY 3.0 문구 4줄). 제품 아래쪽을 일부 가린다
- 문구 출처: `RC/work/session5/remotion/public/sound/credits.md`. 화면 코드: `RC/work/session5/remotion/src/MusicCredit.tsx`
- 지시하는 프롬프트: `RC/prompts/08-edit.txt`의 「음악 크레딧은 영상의 마지막 부분에 작은 글자로 넣어줘. credits.md의 문구 그대로.」 슬라이드는 파트 9의 첫 슬라이드 `art-5-9-1`(복사 항목 「Remotion 편집」). 같은 문구를 설명 글에도 넣으라는 지시는 `09-final.txt`(슬라이드 `art-5-9-4`)
- CC BY라 크레딧은 필수다. 줄이려면 08 프롬프트를 「제목, 작성자, 라이선스 이름만 한 줄」로 바꾸고 설명 글에 전체 문구를 두면 된다. 바꾸면 08, 09를 다시 돌리고 슬라이드의 복사 문구, 다운로드 `student-prompts/08-edit.txt`, migration manifest 해시를 같이 바꾼다(patch_c, patch_d 다시 실행 후 manifest 재계산)
- 음악을 CC0 곡으로 바꾸면 크레딧이 필요 없다. 이 경우 07 프롬프트를 고친다

## 남은 일 / 미확인
- 사람이 소리를 들은 적 없음. 음악(AcidJazz)이 영상 분위기에 맞는지 사람 판단 전. 안 맞으면 07, 08, 09 재실행
- 02d(Comfy Cloud 업스케일 제출)는 돌리지 않음. 슬라이드에 미리허설로 표시. Cloud 시간·비용 미측정
- 슬라이드 12~16, 18, 21, 22, 24, 25, 27, 28, 30, 32, 33번은 화면으로 안 봤다(20, 26, 29, 31, 모바일 27은 봄). 한국어 문구 korean-natural-prose 전체 검사 안 함
- S01, S07 확대 샷 흐림, S03 머리 윗부분 원본 잘림, S08 작은 선글라스 모양 변형 가능
- 수강생 PC 동시 earshot 모델 다운로드(1.126GB) 강의장 네트워크 미시험
- 08, 09의 재실행 시간(8.4분, 3.1분)은 앞 실행 결과 위에서 돌린 값. 처음부터 하면 08은 약 14분

## 슬라이드 상태 (파트 -> 파일)
1 오늘 만들 것 art-5-1(2장) / 2 재료 확인 art-5-2(1) / 3 컷 편집 art-5-3(4) / 4 업스케일 art-5-4(5) / 5 Remotion 스킬 art-5-5(1) / 6 영상 소스 가공 art-5-6(2) / 7 시각 자료 art-5-7(1) / 8 earshot 소리 art-5-8(3) / 9 Remotion 편집과 완성 art-5-9(5). 모두 `web/src/content/parts/`. 시간표 18:05, 18:15, 18:35, 18:55, 19:00, 19:15, 19:25, 19:40, 19:55

## 슬라이드를 다시 만드는 도구 (RC/_pm)
`patch_a.py`(파트 2, 3), `patch_b.py`(파트 4), `patch_c.py`(파트 5~8), `patch_d.py`(파트 1, 3 메모, 파트 9), `facts.json`(실측 값), `slidelib.py`. 프롬프트는 `_pm/student-prompts/*.txt`에서 읽는다. 프롬프트를 바꾸면 `RC/prompts`에서 복사 -> patch 4개 실행 -> `downloads/session5/student-prompts` 복사 -> manifest copyHashes 재계산 -> check-content, build

## 주의
- 이 PC는 램이 부족하면 하네스가 백그라운드 작업을 끈다. 실행 전 여유 램 10GB 이상 확인(ComfyUI가 40GB 이상 쓸 때가 있음)
- Codex가 Remotion Studio를 켜 둔 채 끝나면 codex.exe가 남는다. 내가 만든 PID만 종료할 것
- 계정은 `scripts/codex_accounts.py --pick`. run.py는 gangnam 고정

## 옛 인수인계 (참고)
# 5회차 수업 클립 교체 인수인계 (2026-11-02 20:06 KST)

새 PM은 이 파일 다음에 `docs/session5-review.md`를 읽는다. 수업: 2026-11-03 화 18:00 KST.

## 변경 2026-11-02 23:40: CEO가 5회차 시연 흐름을 새로 정했다 (아래 "남은 일"보다 우선)

CEO 순서: 1) 영상 업스케일 2) Codex가 Remotion best-practices 스킬을 직접 찾아 설치 3) Codex가 필요한 영상 소스를 스스로 가공 4) Codex가 이미지 도구로 필요한 시각 자료를 만들고, GitHub 스킬 earshot을 직접 설치하고, 배경음악과 효과음을 고른다 5) Codex가 전체 영상 편집을 한다.
- 이 흐름에는 현재 프롬프트(03b 세로 크롭, 04~06 나레이션, 07~08b 소리, 09b 자막)를 Remotion 기반 한 흐름으로 다시 짜야 한다. 아직 새 프롬프트는 없다. 이 PM은 컨텍스트가 차서 여기서 멈췄고, 새 작업자는 하나도 띄우지 않았다.
- 아래 "남은 일"의 3~5번(세로, 믹스, 자막 개별 실행)은 이 새 흐름이 확정되면 대체될 수 있다. 업스케일, 02e, TTS, 소리 후보, 슬라이드 준비물은 그대로 쓸 수 있다.
- 03b-vertical 최종 실행이 23:33에 시작돼 돌고 있을 수 있다. `RC/logs/timings.jsonl`에 03b-vertical 새 줄이 있는지 먼저 본다. 새 흐름으로 가면 이 결과는 쓰지 않을 수 있다.

업스케일 단계에서 배운 것
- 허브 SeedVR2 2배 결과(raw)와 02e 결과(upscaled)는 둘 다 1728x960이다. 02e는 해상도를 키우지 않는다. 하는 일은 덧댄 프레임 32장을 빼서 275프레임을 243프레임으로 되돌리고, 소리를 원본 클립에서 붙이고, 편집본을 다시 만드는 것이다(raw f84 == upscaled f68, 차이 0.17로 확인). 실제 확대는 허브에서 끝난다.
- 덧댐 8장은 하드컷 잔상을 막는다(clip1, clip2, clip3의 컷 뒤 프레임을 원본 크기로 확인). 클립을 통째로 넣은 시험(#5494)에서는 잔상이 있었다.
- 480 ffmpeg 4배보다 2배 후 크롭이 선명하다. 다만 upscale-after.jpg 얼굴에서 입 모양이 원본과 조금 다르다. 와이드 샷 탁자 위 작은 선글라스는 모양이 바뀔 수 있다.
- 수강생 Cloud 프롬프트(02d)는 돌리지 않았다. 슬라이드에서 미리허설로 표시해야 한다.

커밋되지 않은 것 (브랜치 session5-2026-11, 마지막 커밋 dea06b2)
- 워크트리: `web/scripts/migration-manifest.json`, `web/src/content/parts/art-5-4.json`(삭제 상태, patch_b가 새로 만든다), `art-5-5~8.json`(옛 개 버전 본문 그대로), `art-5-9.json`(새 파일), `step05.json`, `docs/session5-handover.md`. content check는 art-5-4가 없어 실패한다.
- 슬라이드 본문(art-5-1~3, 5~9), `downloads/session5/*`, `lectures/images/session5/*`는 아직 옛 개 버전이다. 새 영상으로 바뀐 것은 없다. `_pm/old_words.sh`로 옛 낱말을 찾으면 art-5-1~3, 5~8, downloads/session5/example, docs/session5-review.md에 남아 있다.
- 리허설 폴더(RC)의 변경은 레포 밖이라 커밋 대상이 아니다.

리허설 스크립트와 도구 상태 (RC = C:/Users/woohee/AppData/Local/Temp/artwork-s5/rehearsal-class)
- `RC/prompts/` 최종 후보. 이번에 고친 것: 07-sources(장르·분위기, 효과음 2~4개, 서로 다른 후보 3곡). 옛 판은 `RC/history/07-sources-first-try.txt`.
- `RC/_pm/patch_a.py`(파트 2, 3), `patch_b.py`(파트 4 새로 생성, 파트 1)는 `RC/_pm/facts.json`과 `RC/_pm/student-prompts/`가 필요하고 둘 다 아직 없다. 파트 5~9용 patch_c는 없다. `RC/_pm/collect2.py`는 고쳤지만 최종 영상이 없어 실행 전이다.
- 사용 가능한 결과: `RC/work/session5/upscaled/clip1~3.mp4`, `edit/cut-16x9.mp4`(1728x960, 720프레임, 30.000초), `narration/narration.wav`와 `lines-final.json`, `sound/files/`(후보 3곡, 효과음 3개)와 `credits.md`, `RC/_pm/media/upscale-*.jpg` 4장, `RC/_pm/agy/out/*.md`, 곁가지 `RC/side/f1`, `RC/side/mix1`.
- 실측 시간(초): 00-check 130.4, 00b-install 123.2, 01-cuts 330.9, 02-edit 416.0, 02c 197.5, 02e 259.2, 03b 첫 시도 541.2, 04 86.3, 05 51.1, 06-tts 230.3, 07-sources 235.3(고친 판), f1-reorder 66.6. 08b-mix 797.6초는 첫 시도 세로로 곁가지에서 돌린 값이다.

미검증: 아무도 소리를 듣지 않았다. 최종 영상은 아직 없다. CEO가 오늘 밤 보고 싶어 하므로 새 흐름의 영상이 생기면 `RC/work/session5/final/my-short.mp4` 경로를 바로 알린다. push, merge, 배포 금지(CEO가 "배포해"라고 해야 한다).

## 갱신 2026-11-02 23:35 (이 절이 아래 옛 "지금 대기 중"과 "남은 일"보다 우선)

RC = C:/Users/woohee/AppData/Local/Temp/artwork-s5/rehearsal-class

끝난 것
- 업스케일 허브 3건 완료: #5498 clip3(21:01~21:10), #5500 clip1(21:17~21:26), #5501 clip2(21:26~21:35). 각 약 9분, 1728x960, 275프레임(덧댄 것). 컷 뒤 프레임 잔상 없음을 원본 크기로 확인(clip3 f130, f212, clip1, clip2). 덧댐 8장이 하드컷 잔상을 막는다. 옛 잔상 `_pm/media/upscale-ghost.jpg`, 깨끗한 `upscale-clean.jpg`, 전후 `upscale-before.jpg`, `upscale-after.jpg`는 `_pm/media/`에 이미 있다(같은 clip03 f114). 다만 upscale-after 얼굴에서 입 모양이 480 원본과 조금 다르다. 슬라이드 점검 항목에 적을 것.
- 허브 결과는 `RC/work/session5/upscale/raw/clip1~3.mp4`에 복사함. 허브 우선도는 CEO가 높음 3으로 올림.
- 02e-upscale-finish 259.2초 성공. upscaled/clip1~3 = 243프레임, cut-16x9.mp4 = 1728x960, 720프레임, 30.000초. 덧댄 프레임 제거 확인(raw f84 == upscaled f68).
- 06-tts 230.3초(M1, 속도 1.05, narration.wav 30.000초, -18.22 LUFS). 목소리는 agy가 A(M1) 선택, 사람이 들은 것 아님. 07-sources 두 번 실행: 첫 판은 `RC/history/sound-first-try/`(235.3초 아님, 376.5초)에 보관, 최종 판 235.3초(That's a Wrap 124BPM, Funkorama, Groove Grove / 효과음 gear tap 2857, sweep 166, footsteps 543). agy 청취: That's a Wrap 9/10, Groove Grove 7/10, Funkorama 1/10. footsteps는 agy가 돌바닥·잔향이라 카펫과 안 맞는다고 함(6/10). 07-sources 프롬프트는 장르·분위기 규칙, 효과음 2~4개, 서로 다른 느낌 후보 3곡으로 고쳐 `RC/prompts/07-sources.txt`에 반영됨(옛 판은 `RC/history/07-sources-first-try.txt`).
- 08b-mix 리허설은 곁가지 `RC/side/mix1`(첫 시도 세로 사용, 797.6초, -14.0 LUFS, -2.33 dBTP, 효과음 7개)에서만 돌림. 시간표에 쓰지 말고 최종 세로로 본 폴더에서 다시 돌려 측정한다.
- f1-reorder 곁가지 `RC/side/f1` 66.6초, 720프레임, S09 맨 앞, 30.000초 확인.
- agy 결과 파일 `RC/_pm/agy/out/`: voices.md, h3_clip1.md, h3_clip2_v2.md, h3_clip3_v2.md(원본 clip2·3은 신뢰 불가), bgm_1~3.md, sfx01~03.md. 클립 소리 측정(0.5초 RMS): clip01 0.5~1초와 1.5~2초 큼, clip02 1~2초, clip03 2.5~7초 걸음 소리.
- `_pm/collect2.py` 고침(격자 png, 목소리 N01_M1_ko.wav, upscale-ghost/clean 복사 추가). `_pm/old_words.sh`로 옛 낱말 점검.

진행 중
- 03b-vertical 최종 실행이 23:33에 돌고 있음(`RC/work/session5/vertical/vertical.mp4` 23:33:22, `RC/logs/03b-vertical.jsonl` 갱신 중). `RC/logs/timings.jsonl`에 03b-vertical 새 줄이 생기면 끝난 것. 줄이 없으면 끝나지 않은 것이다. 작업자 aaa3568aba084a6e5의 알림은 중간 알림이었다.

남은 일 (순서대로)
1. 03b 결과 검토: 샷마다 첫·끝 프레임 격자(`vertical/review/first-last-grid.png`)를 원본 크기로 본다. 첫 시도 결함(여자 인물이 안 나옴, S08 빈 벽, S02·S09 렌즈 한쪽, S04 인물 작음)이 고쳐졌는지. `_pm/media/vertical-first-try.jpg`, `vertical-crop.jpg`를 같은 시각(S08)으로 만든다(첫 시도는 `RC/history/vertical-first-try/vertical.mp4`).
2. 04-script 대본이 최종 세로와 맞는지 다시 본다(맞으면 유지). 안 맞으면 04, 05, 06 다시.
3. 08b-mix를 본 폴더에서 실행(RAM 10GB 이상 확인). 곁가지 리허설에서 본 것: footsteps 효과음 3개가 S07 끝에 들어감. 원본 clip03 걸음 소리와 겹치고 카펫에 안 맞음. 필요하면 08b 프롬프트에 "현장음과 같은 종류의 소리는 효과음에서 뺀다" 한 줄을 넣고, 바꾸면 슬라이드 원문도 바꾼다.
4. 09-subs(첫 시도) 실행 뒤 결과를 `RC/history/subs-moving-first-try/my-short.mp4`로 보관, 09b-subs, 10-final 실행.
5. 수정 프롬프트 실측(곁가지 폴더, 위 f1은 끝남): f2-crop(S02 선글라스 가운데, 이미 가운데면 실제 결함으로 교체), f3-voice, f4b-music-up(음악이 실제로 작을 때만), f5-subs, f6-reburn. REHEARSAL_WORK, REHEARSAL_LOGS 환경변수.
6. 슬라이드: `_pm/student-prompts/`에 `prompts/` 복사(09-subs 제외, 02c, 02d, 02e 포함), `_pm/facts.json` 작성(t00=2.2, t00b=2.1, t01=5.5, t02=6.9, tf1=1.1, t02c=3.3, t02e=4.3, local_total=업스케일 3건 각 약 9분 합 약 27분, cut_size 1728×960, music That's a Wrap, ghost_note, local_note, cut_check, t_total=Codex 합계 분), `patch_a.py`, `patch_b.py` 실행. 파트 5~9(세로, 나레이션, 소리, 자막, 완성)는 patch_c를 새로 쓰고 crop.json, lines-final.json, mix.json, 자막 파일에서 값을 읽어 채운다. 02d 슬라이드는 "미리허설"로 표시. 새 문구는 korean-natural-prose 2단계를 돌린다. 슬라이드 규칙은 `web/CONTENT_RULES.md`.
7. `collect2.py` 실행(waveform-before/after는 `final-listen/scripts/make_wave.sh`처럼 `_pm/media/`에 만든다), `downloads/session5/` README, demo, example, example.zip, student-prompts, voices 교체. `docs/session5-review.md` 다시 쓰기(옛 리허설은 낱말 없이 경로만).
8. `web/scripts/migration-manifest.json` copyHashes를 새 슬라이드에서 다시 계산, art-5-4 항목 추가.
9. 검사: `bash RC/_pm/old_words.sh`, `node web/scripts/check-content.mjs`, `cd web && npm run build`, playwright-tool `test --member codex`로 1920×1080, 390px, 최종 영상 원본 크기 격자, 받아쓰기, 음량. 그다음 `session5-2026-11`에 커밋. push, merge, 배포 금지(CEO가 "배포해"라고 해야 함).
10. CEO가 오늘 밤 최종 영상을 보고 싶어 한다. 시청 가능한 최종(`RC/work/session5/final/my-short.mp4`)이 생기면 바로 경로를 알린다.

미검증: 아무도 소리를 듣지 않았다(agy 청취는 모델 의견). 02d(Cloud 업스케일 제출)는 돌리지 않았고 미리허설이다.

## 목표와 CEO 지시

- 5회차 데모를 남자·개 리허설 클립이 아니라 CEO의 4회차 수업 클립(선글라스 광고)으로 다시 완성한다. 옛 개 버전의 영상·이미지·문구가 session 5에 남으면 안 된다(`산책`, `강아지`, `리드줄`, `downloads/session5` 포함).
- 업스케일은 5회차 필수 단계다. CEO 원문: 「클립이 864×480이라 세로 1080×1920으로 키우면 흐려질 수 있어서 -> 업스케일 강의 까지 5회차에 넣자」. 4회차 파트 「업스케일·연결」에서 출발한다.
- **Comfy Cloud 유료 실행 불허.** CEO 원문: 「업스케일 우리 컴에서 하면 되잖어 꽁짜로」. Comfy Cloud에 아무것도 올리거나 제출하지 않는다. 수업 클립은 본부 PC SeedVR2를 render-hub 보통 우선순위로 돌린다. 슬라이드에 수강생 실행 방법과 "리허설 경로는 로컬"을 분명히 적고, Cloud 경로가 슬라이드에 있으면 보고서에 미리허설로 표시한다.
- 소리: Supertonic 3, Mixkit, Incompetech(크레딧). 선글라스 광고 톤.
- 제한: `session5-2026-11` 브랜치에만 커밋. push·merge·deploy 금지. 옛 리허설 폴더 삭제 금지. 없는 대본을 지어내지 않는다.
- 끝 보고는 한국어. 최종 영상 경로, 시간, 슬라이드 변경, 가정, 미검증(아무도 소리를 듣지 않음)을 적는다. 최종본은 원본 크기로 직접 보고 content check와 build를 돌린다.

## 작업 위치

- 워크트리: `C:/wi/projects/lectures/ai-artwork-s5`, 브랜치 `session5-2026-11`, 마지막 커밋 dea06b2. 아래 슬라이드 변경은 **커밋 안 됨**.
- 리허설: `C:/Users/woohee/AppData/Local/Temp/artwork-s5/rehearsal-class/` (이하 RC)
  - `run.py`: `python -X utf8 run.py <프롬프트 이름...>`. Codex CLI, gpt-6.1-sol, 계정 gangnam, 작업 폴더 `work/`. `REHEARSAL_WORK`, `REHEARSAL_LOGS` 환경변수로 곁가지 폴더 실행 가능.
  - `prompts/`: 현재 최종 후보 프롬프트. `logs/timings.jsonl`: 실측. `history/`: 첫 시도 보관.
  - `work/session4/clips/`: 수업 클립 4개. `work/.agents/skills/comfy-cli`: 수강생과 같은 Comfy 스킬 사본.
  - `_pm/`: PM 도구. `up/`(시험), `media/`(슬라이드용 이미지), `agy/`(청취 입력), `slidelib.py`, `patch_a.py`, `patch_b.py`, `collect2.py`.
- 옛 리허설 `artwork-s5/rehearsal/`은 그대로 둔다. `artwork-s5/authoring/collect.py`, `artwork-s5/final-listen/scripts/make_wave.sh`는 참고용.

## 끝난 일과 실측

| 프롬프트 | 초 | 결과 |
|---|---:|---|
| 00-check | 130.4 | scale_retry 선택(Codex와 PM 판단 일치). 대본 없음 표시 |
| 00b-install | 123.2 | Supertonic 1.3.1, 모델 403.5MB, 다운로드 31.6초 |
| 01-cuts | 330.9 | 컷 6곳, 샷 9개. `work/session5/edit/shots.md` |
| 02-edit | 416.0 | 480 입력 `cut-16x9.mp4`, 720f, 디졸브 S06→S07 20.00~20.25초. 격자 직접 확인 |
| 02c-upscale | 197.5 | API 3개, 입력 `upscale/clip1~3-pad.mp4`(275f), `upscale/pad.json`. 업로드·제출 없음, 크레딧 4,762 그대로 |
| 03b 첫 시도 | 541.2 | 480 입력. `history/vertical-first-try/`, 프롬프트 `history/03b-vertical-first-try.txt` |
| 04-script | 86.3 | 4문장(아래) |
| 05-voices | 51.1 | `work/session5/narration/samples/N01_{M1,M2,F1,F2}_ko.wav` |

`00c-upscale`(206.2초)은 폐기한 앞 판이다. 시간표에 넣지 않는다.

샷: S01 선글라스 밀기 clip01 0~68 / S02 선글라스 정면 68~145 / S03 남자 정면 145~243 / S04 착용 와이드 clip02 0~121 / S05 착용 중경 121~177 / S06 얼굴 확대 177~243 / S07 일어나 걷기 clip03 0~113 / S08 양쪽 퇴장 113~177 / S09 제품 180~243. 합 726f − 디졸브 6f = 720f.

나레이션 `work/session5/narration/lines.json`: 0.50 「설명은 짧게.」 / 6.50 「취향은 선명하게.」 / 11.00 「기준은 내 안에.」 / 21.25 「이제, 내 리듬대로.」 내 검토로는 통과. TTS는 아직 안 돌렸다. 브랜드·성능을 지어내지 않았다.

클립 소리 측정: 평균 clip01 −44.4dB, clip02 −43.8dB, clip03 −30.7dB. faster-whisper VAD 받아쓰기 음성 없음. 0.5초 RMS로 clip01 0.5~1초, clip02 1~2초, clip03 3.5~6.5초에 소리가 큼. 무슨 소리인지는 미확인.

## 업스케일 판단 (직접 비교)

- 480 ffmpeg 4배는 뭉개진다. `_pm/look/base_man_c.png`.
- **SeedVR2 2배 후 크롭 채택.** 세로로 먼저 자르고 4배(#5495)는 얼굴에 얼룩이 생겼다. `_pm/up/cmp20.png`, `cmp70.png`(왼쪽 위 lanczos, 오른쪽 위 denoise+cas, 왼쪽 아래 2배 후 크롭, 오른쪽 아래 4배). 2배 후 크롭이면 x만 고쳐도 재생성이 필요 없다.
- **클립 통째로 넣으면 하드컷 직후 앞 장면이 비친다.** `_pm/up/cuts_x2.jpg`, 슬라이드용 `_pm/media/upscale-ghost.jpg`(#5494 f138 = clip03 f114). 그래서 컷마다 앞 샷 끝 프레임 8장과 뒤 샷 첫 프레임 8장을 덧대고 나중에 뺀다.
- 와이드의 작은 선글라스가 하트 모양처럼 변한다. `_pm/up/glasses_table.png`. 슬라이드 점검 항목에 넣었다.
- 청크 경계 튐은 #5494에서 프레임 차이로 안 보였다.
- 로컬 속도: #5494 180f 2배 6분 31초(모델 적재 포함), RTX 5070 Ti.

## 지금 대기 중

render-hub 보통 우선순위, 지나 높음 작업 뒤(20:06 기준 #5498이 대기 9번째):

- #5498 clip03 덧댐 시험, 라벨 「SeedVR2 컷 덧댐 시험 (클립3 전체)」
- #5500 clip1, #5501 clip2. 입력 `_pm/up/p/clip1-pad8.mp4`, `clip2-pad8.mp4`, 그래프 `_pm/up/sr2_clip1.json`, `sr2_clip2.json`
- 결과 파일명: `artwork-s5/sr2_x2_pad8_00001_.mp4`, `artwork-s5/clip1_x2_pad8_00001_.mp4`, `artwork-s5/clip2_x2_pad8_00001_.mp4`. 받기: `python -X utf8 C:/wi/render-hub/hub.py fetch <id> --to <폴더>`
- 덧댄 구조는 Codex의 `pad.json`과 같다(컷 앞 8장 + 컷 뒤 8장, 클립당 275f). 그래서 허브 결과를 그대로 `raw`로 쓴다.

## 남은 일 (순서대로)

1. #5498 결과를 원본 크기로 본다. pad.json대로 프레임을 빼고 clip03 f113~116, f180~183에 잔상이 없는지 확인한다. 남아 있으면 #5500, #5501을 취소하고 덧댐을 늘려 세 클립을 다시 넣는다. 깨끗하면 나머지를 기다린다.
2. 세 결과를 `RC/work/session5/upscale/raw/clip1.mp4`~`clip3.mp4`로 복사하고 `02e-upscale-finish`를 돌린다. 프레임 수·30.000초·컷 앞뒤를 내가 본다. `02d-upscale-run`은 Cloud 제출이라 **돌리지 않는다**. 이 프롬프트만 미리허설로 남는다.
3. `_pm/media/`에 `upscale-clean.jpg`(잔상 프레임과 같은 f114, 1280폭), `upscale-before.jpg`, `upscale-after.jpg`(같은 프레임을 ffmpeg 4배 vs 2배 후 크롭)를 만든다.
4. `03b-vertical` 최종 실행. 프롬프트에 규칙 3개를 추가해 뒀다. 첫 시도 결함은 여자 인물이 한 번도 안 나옴, S08이 빈 벽, S02·S09가 렌즈 한쪽만, S04 인물이 작음이었다. `_pm/media/vertical-first-try.jpg`, `vertical-crop.jpg`를 같은 시각으로 만든다(S08 추천).
5. 목소리 판단: `_pm/agy/in/voices.mp3`(순서 M1, M2, F1, F2)와 `h3_clip1~3.mp3`를 `cli-video`로 듣게 한다. 프롬프트는 `_pm/agy/prompt/`. `_pm/agy/out/h3_clip1~3.md`는 나왔고 `voices.md`는 없다(작업자가 voices.mp3를 찾지 못한 채 끝났다). voices 호출을 다시 돌린다. h3 답 3개 모두 사람 말소리가 없다고 했다. 다만 clip2·clip3 답은 10.125초 파일을 약 8초로 적었고 표도 8.0초에서 끝나서 믿지 않는다. 이 둘은 다시 돌리고, 소리 목록을 슬라이드에 쓰기 전에 측정값과 대조한다. 모델 의견일 뿐 사람이 들은 것이 아니다. M1 외를 고르면 `06-tts` 프롬프트와 슬라이드·핀을 같이 바꾼다.
6. `06-tts`, `07-sources`, `08b-mix` 실행. 음악이 광고에 맞는지 후보를 확인한다(`pieces.json`에서 내가 본 후보: Half Mystery, Tyrant, Stay the Course, Rising Tide). 아니면 프롬프트를 고쳐 다시 돌린다.
7. `09-subs`(첫 시도) 실행 뒤 결과를 `RC/history/subs-moving-first-try/my-short.mp4`에 보관하고, `09b-subs`, `10-final` 실행.
8. 수정 프롬프트 실측: `f1-reorder`, `f2-crop`, `f3-voice`, `f4b-music-up`(음악이 실제로 작을 때만, 아니면 실제 생긴 수정으로 교체), `f5-subs`, `f6-reburn`을 곁가지 폴더에서 돌린다. 슬라이드 수치는 실측만 쓴다.
9. 슬라이드. `_pm/student-prompts/`를 만들어 `prompts/`를 복사한다(`09-subs`는 뺀다). `_pm/facts.json`을 쓰고 `patch_a.py`, `patch_b.py`를 실행한다. 필요한 키: t00, t00b, t01, t02, tf1, t02c, t02e, t_total, ghost_note, local_total, local_note, cut_size, cut_check, music. 세로·나레이션·소리·자막·완성 파트(art-5-5~9)는 아직 패치가 없다. `실측 수치`, 표, 프롬프트, 이미지 경로를 전부 새 결과로 바꾼다.
10. `collect2.py`를 실행하기 전에 고친다. 격자는 `edit/review/grid-2s.png`이고(코드는 .jpg), 목소리 샘플은 `N01_M1_ko.wav` 형식이다(코드는 `M1.wav`). 파형은 `make_wave.sh`처럼 만들어 `_pm/media/waveform-before.png`, `waveform-after.png`에 둔다.
11. `web/scripts/migration-manifest.json`의 session 5 항목 copyHashes를 최종 슬라이드에서 다시 계산하고, art-5-4 항목을 새로 넣는다. 슬라이드 설명은 기본 사실만: 수강생은 Comfy Cloud, 리허설은 강사 PC 로컬, Cloud 시간·비용 미측정(`patch_b.py`에 반영).
12. `downloads/session5/README.txt`, `demo/`, `example/`, `example.zip`, `student-prompts/`(02c, 02d, 02e 추가), `voices/` 교체. `docs/session5-review.md` 다시 쓰기. 옛 리허설은 낱말 없이 경로만 남긴다.
13. 검사: session 5 범위에서 옛 낱말 grep, `node web/scripts/check-content.mjs`, `cd web && npm run build`, playwright-tool `test --member codex`로 1920×1080·390px 확인, 최종 영상 원본 크기 격자 확인, 받아쓰기, 음량 측정. 그다음 `session5-2026-11`에 커밋.

## 워크트리 상태 주의

- 파트 번호를 옮겼다: art-5-1 오늘, 2 재료, 3 컷, **4 업스케일(파일 아직 없음, `patch_b.py`가 만든다)**, 5 세로, 6 나레이션, 7 소리, 8 자막, 9 완성. `step05.json`은 9파트를 가리킨다. 그래서 지금 content check는 실패한다.
- 슬라이드 ID와 manifest의 part 값은 새 번호로 바꿨다. 본문은 아직 옛 내용이다.
- 시간표안: 18:05 재료, 18:15 컷, 18:35 업스케일, 18:55 세로, 19:10 나레이션, 19:25 소리, 19:40 자막, 19:50 완성, 19:55 업로드 월.

## 프롬프트 변경 (전부 RC/prompts)

- 00-check: 다시 생성한 클립 비교, 대본 없을 때 표시. 01-cuts: `shots.json(있으면)`.
- 02-edit: 디졸브 0.5초 → 0.25초. 클립 합계 729f라 0.5초면 30초를 못 채운다.
- 02c, 02d, 02e: 새 프롬프트. 4회차 `12-upscale`, `12-run`에서 출발하고 덧댐을 추가했다.
- 03b-vertical: 개 문구 제거, 두 인물·가까이 잡기(2.5배까지)·넓은 제품 훑기 규칙 추가, crop.json에 세로 창 크기 추가.
- 04-script: 장르를 프레임으로 판단, 없는 정보 금지, 말 없는 샷 허용, `script.md(있으면)`.
- 08b-mix: 문장 사이에 음악을 또렷이, 새소리·바람 문구 제거.
- f1-reorder: S09를 맨 앞으로. f2-crop: S02 선글라스 가운데.

## 가정

- 샷과 이야기는 클립만 보고 판단했다. 원본 script.md, shots.json은 없다. 이야기: 여자가 선글라스를 밀어 보냄 → 남자가 착용 → 자리가 바뀐 채 일어나 퇴장 → 제품 마무리.
- clip02의 자리 교환은 S06→S07 디졸브로 넘긴다. 좌우가 바뀐 연결 문제는 원본에 남는다.
- clip01은 scale_retry 사용. 앞 판은 선글라스 크기가 어긋난다.
- 브랜드 이름과 제품 성능은 없는 것으로 둔다.
- 수강생 클립도 243f, 864×480이라고 본다.
- Comfy 스킬은 4회차 리허설 사본을 넣었다.
- 04·05는 480 첫 시도 세로 프레임을 보고 실행했다. 샷과 시각이 같아서 대본은 유지 가능하다고 판단했지만 최종 세로와 맞는지 다시 본다.

## 도구 함정

- Bash 전경은 60초에서 배경으로 넘어간다. `cd C:/wi/render-hub && timeout 54 python -X utf8 -c "import hub,sys; sys.exit(hub.wait_job(ID))"`로 잠깐씩 기다렸다.
- 배경 셸 상한 6개 훅이 있다.
- 작업자는 Bash가 배경으로 넘어가면 「.」로 멈췄다가 끝나면 스스로 이어서 보고한다.
- 허브 알림은 `--no-notify`로 껐다.
