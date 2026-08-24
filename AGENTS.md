# AGENTS.md — ai-artwork

## 레포 목적
AI 아트웍 강의자료 — 강의 사이트 본체(`lectures/` 원본, `frontend/` 생성기, 배포본 `index.html`).

> **에이전트-아트웍 리뉴얼**(Comfy MCP + Claude Code 기반 8회차 개편)의 기획·리서치·검증
> 작업은 2026-08-22부터 별도 private 레포 `hw5511/agent-artwork` 로 분리됐다.
> 리뉴얼 관련 작업은 이 레포가 아니라 그쪽에서 진행할 것.

## 레포 구조

| 경로 | 역할 |
|---|---|
| `lectures/` | **강의 원본 md** (session1~4) + `toc.json` 목차 + `images/` 삽화 |
| `frontend/` | React 18 + MUI + Vite 강의 뷰어. `scripts/` 에 생성기 2종 |
| `downloads/` | 수강생 배포용 ComfyUI 워크플로우 JSON·예제 이미지 (회차/스텝별) |
| `index.html` | **배포본** — vite-plugin-singlefile 단일 번들 (직접 편집 금지) |
| `ai-artwork-report/` | 리치킹 시네마틱 재현 실험 슬라이드 덱 (독립 정적 페이지) |

강의 구성: 1회차 ComfyUI 입문(10) / 2회차 고급 기법(6) / 3회차 이미지 편집·영상 생성(4) /
4회차 실전 프로젝트·최적화(5). 각 회차의 스텝 순서와 제목은 `lectures/toc.json` 이 정본이다.

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
  (원격 에이전트는 `workflows` 권한이 없어 `.github/workflows/` 를 직접 수정·push 할 수 없다.
  워크플로 자체를 손봐야 하면 로컬에서 하거나 아래 에스컬레이션 절차를 쓴다.)
- 배포본은 레포 루트 `index.html`(vite-plugin-singlefile 단일 번들)이며 GitHub
  Pages 가 서빙한다(`.nojekyll`).

## 콘텐츠 작성 규칙

- 새 스텝을 추가하면 **md 파일 생성 + `toc.json` 등록**을 함께 한다. `toc.json` 에
  없는 md 는 사이트에 노출되지 않는다(`lectures/test/` 의 테스트 문서가 그 예).
- 이미지·다운로드는 **레포 루트 기준 상대경로**로 참조한다:
  `./lectures/images/sessionN/stepM/...`, `./downloads/sessionN/stepM/...`.
  번들이 루트 `index.html` 로 서빙되므로 이 형태여야 경로가 맞는다.
- 워크플로우 JSON 을 교체할 때는 `downloads/` 의 파일과 해당 md 의 다운로드 버튼을
  같이 확인한다.

## 로컬 작업 에스컬레이션 (필수)

이 레포는 원격/클라우드 에이전트가 작업할 수 있다.
**원격 세션에서 해결 불가능한 — 로컬 머신 또는 특정 실행 환경 접근이 필요한 작업**
(로컬 파일시스템 / 로컬 프로세스·배포 / 자격증명 / `.github/workflows` 수정 등)이 필요하면 직접 막히지 말고
아래 방법으로 에스컬레이션한다.

**방법**:
1. 이 레포에 GitHub 이슈 또는 PR 을 생성한다.
2. **label = `유키`** (필수).
3. 제목 접두사 `[유키-LOCAL]`.
4. 본문에 필요한 작업을 구체적으로 적는다 — 무엇을 / 왜 / 기대 결과.

담당자가 감지하여 처리한 뒤 해당 이슈/PR 에 회신한다.
