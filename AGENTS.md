# AGENTS.md — ai-artwork

## 레포 목적
AI 아트웍 강의자료.

## 🚧 진행 중: 에이전트-아트웍 리뉴얼 (로컬 세션에서 이어서 할 것)

기존 ComfyUI 노드 강의를 **Comfy MCP + Claude 기반 8회차 실무 프로젝트 강의**로 리뉴얼 중.
기획·리서치 정본 = `docs/agent-artwork-renewal/` (커리큘럼 확정안 + 리서치 6건).

**진행 방식** (1회차에서 확립, 이대로 반복):
1. **회차별 실제 테스트** — Comfy MCP를 연결한 세션에서 그 회차의 실습 파이프라인을
   에이전트가 처음부터 끝까지 실제로 돌려 검증한다 (모델 선택 → 생성 → 후처리 → 산출물).
2. **회차 내용 디테일화 논의** — 테스트 결과를 바탕으로 사용 모델·템플릿·수강생용
   복붙 프롬프트 시퀀스·함정(트러블슈팅)을 확정하고 `docs/agent-artwork-renewal/sessions/sessionN.md` 로 기록.

**1회차 현황** (2026-08-21, 원격 세션에서 검증):
- 파이프라인 검증 완료: Seedream 4.5 t2i(`byteplus/images-generations`, params.model=`seedream-4-5-251128`)
  → 9:16 중앙 크롭(비율 왜곡 방지 필수!) → `upload_file` → MiniMax H3 i2v
  (`video_minimax_h3_i2v`, 오픈웨이트라 GPU 크레딧만; 오버라이드는 슬롯이 아니라
  **평탄화 노드 id** `input_overrides {"114":{"image":..},"105:104":{"prompt":..,"width":576,"height":1024},"105:111":{"value":5}}`)
  → SAM3 누끼(`utility_video_segment_sam3`, `{"115":{"file":..},"114:100":{"text":"woman"}}`, 마스크 124프레임 PNG)
  → ffmpeg/Pillow 합성(배경→Anton 타이포→인물 3층, "인물 뒤 텍스트" 연출).
- **남은 작업(1회차)**: 단색 배경이라 겹침 효과가 약함 → **자연스러운 실내 배경**(질감 있는
  로프트/스튜디오)으로 이미지 재생성 후 전체 파이프라인 재실행. 이후 `sessions/session1.md` 작성.
- **이후**: 2~8회차를 같은 방식으로 (회차 정의는 `docs/agent-artwork-renewal/curriculum.md`).

**주의**: 원격(클라우드) 세션에서는 Comfy MCP 커넥터가 자주 끊긴다(OAuth 만료 시 자동 복귀 불가).
→ **이 작업은 로컬 세션 + Comfy MCP 연결 상태에서 진행할 것.** 작업 산출물(스크립트·중간 결과물)
참고: 원격 스크래치패드에 있던 것은 세션 종료 시 소실되므로, 재현은 위 파이프라인 명세로 한다.

## 콘텐츠 파이프라인 (정본 = source of truth)

강의 콘텐츠는 **원본(source) → 생성물(generated) → 빌드** 단방향으로 흐른다.
생성물은 절대 직접 편집하지 말고 **항상 원본을 고친 뒤 생성기를 돌린다.**

| 원본 (편집 O) | 생성기 | 생성물 (편집 X) |
|---|---|---|
| `lectures/**/*.md` | `frontend/scripts/gen_contents.py` | `frontend/src/data/lectureContents.ts` |
| `lectures/toc.json` | `frontend/scripts/gen_toc.py` | `frontend/src/data/tocData.ts` |

```bash
cd frontend
npm run gen      # 두 생성기 실행 (md/toc.json -> *.ts)
npm run build    # tsc + vite (singlefile) -> dist/index.html
npm run deploy   # gen + build + dist/{index.html,logo.svg} -> 레포 루트 (GitHub Pages 배포본)
```

- CI(`.github/workflows/sync-check.yml`)가 PR마다 생성기를 돌려 원본↔생성물
  동기화를 검증한다. 원본만 고치고 `npm run gen` 을 안 하면 머지가 막힌다.
  (원격 에이전트는 `workflows` 권한이 없어 `.github/workflows/` 에 직접 push 불가
  → 워크플로 정의는 `ci/sync-check.yml` 에 두고, 활성화는 로컬에서
  `git mv ci/sync-check.yml .github/workflows/` 로 한다.)
- 배포본은 레포 루트 `index.html`(vite-plugin-singlefile 단일 번들)이며 GitHub
  Pages 가 서빙한다(`.nojekyll`).

## 로컬 작업 에스컬레이션 (필수)

이 레포는 원격/클라우드 에이전트가 작업할 수 있다.
**원격 세션에서 해결 불가능한 — 로컬 머신 또는 특정 실행 환경 접근이 필요한 작업**
(로컬 파일시스템 / 로컬 프로세스·배포 / 자격증명 등)이 필요하면 직접 막히지 말고
아래 방법으로 에스컬레이션한다.

**방법**:
1. 이 레포에 GitHub 이슈 또는 PR 을 생성한다.
2. **label = `유키`** (필수).
3. 제목 접두사 `[유키-LOCAL]`.
4. 본문에 필요한 작업을 구체적으로 적는다 — 무엇을 / 왜 / 기대 결과.

담당자가 감지하여 처리한 뒤 해당 이슈/PR 에 회신한다.
