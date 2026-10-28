# AGENTS.md — ai-artwork

## 목적과 정본

AI 아트웍 8회차 수업자료. 공개 사이트는 `web/`의 React 슬라이드 뷰어를 빌드한 결과다.
1~4회차는 강의 슬라이드, 5~8회차는 `준비 중` 목록이다. 과정 ID는 `artwork` 하나다.
AI 에이전트 수업의 글꼴·간격·색·3단 구성을 유지한다. 콘텐츠 규칙은 `web/CONTENT_RULES.md`.

**편집 정본은 `web/src/content/`의 JSON이다.** md를 읽는 생성기는 없다.

| 경로 | 역할 |
|---|---|
| `web/src/content/sessions/artwork/stepNN.json` | 회차 제목과 순서 있는 파트 ID 목록 |
| `web/src/content/parts/<id>.json` | 파트 제목·소개·슬라이드·설명·실습 액션 |
| `web/src/content/schema.ts` | 데이터 필드 정의 |
| `web/src/App.tsx`, `web/src/components/` | 과정·회차·파트 목록, 슬라이드, 설명 패널, 이동 |
| `lectures/images/`, `downloads/` | 기존 경로를 유지하는 이미지와 배포 파일 |
| `lectures/_archive-md/` | 전환에 사용한 md·목차의 보관본. 빌드 입력 아님 |
| `lectures/_archive/` | 이전 과정의 참고 자료. 빌드 입력 아님 |
| `web/scripts/migration-manifest.json` | 리허설 원문 해시와 기존 링크의 보존 검사 기준 |
| `ai-artwork-report/` | 별도 실험 보고서. 강의 뷰어 배포 대상 아님 |

기존 `frontend/` MUI 뷰어와 루트 `index.html`은 폐기했다. 복구하거나 생성하지 않는다.
`web/public/lectures/`, `web/public/downloads/`, `web/dist/`는 생성물이므로 직접 편집하지 않는다.

## 슬라이드 편집

1. 회차 JSON에서 파트 ID와 순서를 확인한 뒤 해당 파트 JSON을 편집한다.
2. 원래 md 스텝 하나가 파트 하나다. 제목은 기존 스텝 제목을 유지하되 문장형 제목은 키워드로 바꾼다.
3. 슬라이드에는 키워드 제목과 실제 이미지·캡처·영상·표·벡터 그림만 둔다. 설명은 오른쪽 `notes`로 옮긴다.
4. `notes`는 번호, 짧은 `head`, 구체적인 `body`로 작성한다. 이미지의 배지 번호와 설명 번호를 맞춘다.
   한 슬라이드당 설명은 최대 4개다. 새 한국어 문구는 키워드식으로 쓰고 deslop 검수를 거친다.
5. `action.items`는 `copy`, `link`, `download`만 쓴다. 수강생 프롬프트·명령은 줄바꿈까지 원문 그대로 둔다.
   리허설 원문 해시가 달라지면 검사가 실패한다. 새 원문으로 다시 리허설한 경우에만 보존 기준도 갱신한다.
6. `정리`·`마무리` 파트, 설명 문단을 담은 슬라이드, 지어낸 앱 화면, 장식용 색 막대·강조선·밑줄을 넣지 않는다.

파트 표지·목차·장수·카운터는 JSON에서 자동 계산한다. 표지를 별도 슬라이드로 중복 작성하지 않는다.
슬라이드 링크는 `#artwork/4/1`, 파트 링크는 `#artwork/4/art-4-7` 형식이다.
기존 `#/lectures/session4/step7` 링크도 해당 파트로 연결한다.

이미지 경로는 `/lectures/images/...`, 다운로드는 `/downloads/...`로 쓴다.
`asset()`이 배포 base `/ai-artwork/`를 붙인다. JSON에 base를 중복해서 적지 않는다.
기존 파일명을 유지하고 새 파일·링크의 대소문자도 확인한다. `prepare-assets.mjs`가 dev/build 전에
원본 파일을 `web/public/`에 그대로 복사한다. 설명과 프롬프트를 보관 md에서 다시 생성하지 않는다.

## 검사와 로컬 확인

레포 루트에서:

```sh
node web/scripts/check-content.mjs
cd web
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4174
```

콘텐츠 검사 0 errors와 빌드 성공이 필수다. 미리보기는 `http://127.0.0.1:4174/ai-artwork/`.
개발은 `web/`에서 `npm run dev`; 같은 base와 포트를 쓴다. 검사 별칭은 `npm run check`.

변경한 슬라이드를 1920×1080과 390px 폭에서 확인한다. PC의 브라우저 검수 도구는
`python -X utf8 C:/wi/yuki/.claude/skills/playwright-tool/cli/playwright_tool.py test ... --member codex`.
이미지·글꼴·겹침·스크롤·복사 원문·다운로드·해시·화살표·준비 중 표시를 확인한다.
복사 내용은 Windows 클립보드의 CRLF를 LF로 맞춰 원문과 대조한다.
브라우저는 하나만 사용하고 끝나면 `test release`, `test stop`과 미리보기 서버 종료를 바로 실행한다.

## 배포

`.github/workflows/deploy.yml`: 콘텐츠 검사 → `web/` 빌드 → `web/dist` Pages 배포.
PR에서는 검사·빌드만 수행한다. `main` push 또는 수동 실행이 배포를 시작한다.

전환 후 첫 배포 때 Yuki가 GitHub **Settings → Pages → Build and deployment → Source**를
**Deploy from a branch**에서 **GitHub Actions**로 바꾼다. 기존 `main`의 `/(root)` 배포는 사용하지 않는다.
이 전환 작업에서는 push·배포·GitHub 저장소 설정 변경을 실행하지 않는다.
