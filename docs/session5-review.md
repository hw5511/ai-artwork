# 5회차 제작·검증 기록

목적: 4회차 수업 클립 3개(선글라스 광고)를 가진 수강생이 강의장에서 짧은 프롬프트를 복사해, Codex가 Remotion으로 편집한 소리 있는 세로 30초 영상을 완성하는 실습

일시: 2026-11-03 화 18:00-20:00 KST · 리허설: 2026-11-02 밤 ~ 11-03 새벽

흐름(CEO 2026-11-02 확정): 1) 영상 업스케일 2) Codex가 Remotion best-practices 스킬을 직접 찾아 설치 3) Codex가 필요한 영상 소스를 직접 가공 4) Codex가 이미지 도구로 시각 자료를 만들고 GitHub 스킬 earshot을 직접 설치해 배경음악과 효과음을 고름 5) Codex가 Remotion으로 전체 편집

| 파트 | 시간 | 실습 | Codex 실측(분) |
| --- | --- | --- | --- |
| 오늘 만들 것 | 18:00-18:05 | 완성 영상·순서 | |
| 재료 확인 | 18:05-18:15 | 클립·ffmpeg 확인 | 2.2 |
| 컷 편집 | 18:15-18:35 | 실제 컷 찾기, 30초 편집본 | 5.5, 6.9 |
| 업스케일 | 18:35-18:55 | 준비, 마무리 | 3.3, 4.3 (SeedVR2 실행은 강사 PC 로컬, 클립당 약 9분) |
| Remotion 스킬 | 18:55-19:00 | 찾아서 설치 | 1.1 |
| 영상 소스 가공 | 19:00-19:15 | 프로젝트, 샷별 소스, 세로 구도 | 12.0 (첫 시도 9.1) |
| 시각 자료 | 19:15-19:25 | 이미지 도구로 보강 컷 | 5.1 |
| earshot 소리 | 19:25-19:40 | 설치, 소리 고르기 | 5.2, 9.2 |
| Remotion 편집 | 19:40-19:55 | 전체 편집, 최종 확인 | 8.4 (첫 실행 14.2), 3.1 |
| 업로드 | 19:55-20:00 | 업로드 월 | |

Codex 실행 합계 약 66분(3,980초). 업스케일 로컬 실행 약 27분과 재실행 시간은 제외. 시간은 `%TEMP%/artwork-s5/rehearsal-class/logs/timings.jsonl`

## 실제 리허설

- Codex CLI, `gpt-6.1-sol`, reasoning high, 모든 권한. 계정 gangnam. 프롬프트마다 새 `codex exec`, 앞 대화 없이 파일만 읽고 동작
- 증거 위치: `%TEMP%/artwork-s5/rehearsal-class/`의 `prompts/`, `logs/`, `work/`, `history/`. 첫 시도는 `history/04-sources-first-try/`, `history/08-edit-first-try/`, `history/08-edit-second-try/`
- 수강생 프롬프트 원문: `downloads/session5/student-prompts/`
- 입력 클립: 4회차 수업 클립 3개, 864×480, 24fps, 243프레임
- 02d(Comfy Cloud 업스케일 제출)는 돌리지 않았다. 미리허설이다. Cloud 시간과 비용은 측정하지 않았다
- 업스케일은 render-hub #5498, #5500, #5501 (SeedVR2 2배, 컷마다 앞뒤 프레임 8장 덧댐). 컷 뒤 프레임 잔상 없음을 원본 크기로 확인

## 리허설에서 고친 것

- 영상 소스 가공 첫 시도: 제품 샷 S02·S06·S09가 위아래 단색 띠로 나옴. 프롬프트에 「가까이 잡아 한쪽 끝에서 다른 쪽 끝으로 훑어줘」 추가 후 재실행. 첫 판은 `history/04-sources-first-try/`
- 편집 첫 시도: 시각 자료 2장을 영상에 쓰지 않았다. 프롬프트에 「asset-manifest.json의 권장 위치에 모두 써줘」 추가
- 편집 둘째 시도: 전체 음량 −29.09 LUFS(최종 확인 단계에서 측정). 프롬프트에 「약 −14 LUFS, 트루피크 −1.5 dBTP 이하」 추가 후 −14.04 LUFS, −2.08 dBTP
- Remotion Studio를 켜 둔 채 Codex가 끝나 프로세스가 남는 일이 두 번 있었다. 프롬프트에 서버 종료 문장을 넣었고 슬라이드에 표시

## 스킬 확인

- Remotion best-practices: 저장소 remotion-dev/skills, 스킬 버전 4.0.540, 파일 147개 일치. 스킬 저장소에 LICENSE 파일 없음. Remotion 본체 라이선스(github.com/remotion-dev/remotion LICENSE.md): 개인, 직원 3명 이하 영리 조직, 비영리, 평가용은 무료이고 그 이상의 영리 조직은 회사 라이선스
- earshot: Leonxlnx/earshot, 작성자 Leon Lin, 코드 MIT, 버전 0.4.0 커밋 591fa3e. 모델 CLAP Apache-2.0, AST BSD-3-Clause(Codex가 모델 페이지에서 확인). 모델 1.126GB, 다운로드 75.2초. CPU만 사용

## 소리 소스와 상업 이용

- earshot은 소리를 듣고 판단하는 도구다. 내장 효과음 252개는 코드로 만든 것이고 저장소 README에 산출물 사용 조건 별도 표기는 없다. 이번 영상에는 쓰지 않았다
- earshot의 real-sound 스킬 허용 목록: CC0, 퍼블릭 도메인, CC BY 2.0-4.0, Mixkit 무료 라이선스, Pixabay. 금지: NC, ND, SA, 개인용, 맞춤 약관, 확인 안 된 것
- 이번 영상에 쓴 소리와 각 출처 페이지에서 Codex가 확인한 조건
  - AcidJazz, Kevin MacLeod, Free Music Archive: CC BY 3.0. 상업 이용 가능, 크레딧 필수
  - 안경 접촉음, SpliceSound, Freesound: CC0. 크레딧 불필요
  - 옷 마찰음, trettfilms, Freesound: CC0. 크레딧 불필요
- 효과음 2개는 Freesound HQ MP3 미리듣기에서 추출했다. 원본 무손실이 아니다
- 크레딧: 영상 마지막 6초와 `final/description.txt`에 같은 원문

## 최종 데모

`downloads/session5/demo/my-short.mp4`: 30.000초, 1080×1920, 24fps, 720프레임, H.264, AAC 48kHz 스테레오, 27.8MB. ffmpeg 측정 −14.04 LUFS(ebur128 재측정 −13.8), 트루피크 −2.1 dBTP. 효과음 3곳은 화면 동작 큐와 1프레임 이내(earshot 타임라인). 2초 간격 격자를 원본 크기로 직접 확인

## 아직 확인하지 못한 것

- 사람이 들어 본 적 없음. 음악 크기, 효과음 크기, 음악과 영상의 어울림은 측정값과 earshot 분석만 있다
- 음악 AcidJazz는 Codex가 earshot 분석으로 고른 곡이고, 영상 분위기와의 어울림은 사람 판단 전이다
- 업스케일 얼굴은 480 원본과 입 모양이 조금 다르고, S01·S07 확대 샷은 흐릿하다. S03 머리 윗부분은 원본부터 잘림
- 와이드 샷 탁자 위 작은 선글라스(S08)는 모양이 하트처럼 바뀔 수 있다
- 수강생 PC 여러 대의 동시 모델 다운로드(earshot 1.126GB), 강의장 네트워크 미시험
- Codex 데스크톱 앱 화면 캡처 없음. 리허설은 CLI로 실행
- 02d Comfy Cloud 업스케일 미실행, Cloud 시간·비용 미측정
- 한국어 슬라이드 문구의 korean-natural-prose 전체 검사는 돌리지 않았다
