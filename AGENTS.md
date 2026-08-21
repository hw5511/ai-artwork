# AGENTS.md — ai-artwork

## 레포 목적
AI 아트웍 강의자료 — 강의 사이트 본체(`lectures/` 원본, `frontend/` 생성기, 배포본 `index.html`).

> **에이전트-아트웍 리뉴얼**(Comfy MCP + Claude Code 기반 8회차 개편)의 기획·리서치·검증
> 작업은 2026-08-22부터 별도 private 레포 `hw5511/agent-artwork` 로 분리됐다.
> 리뉴얼 관련 작업은 이 레포가 아니라 그쪽에서 진행할 것.

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
