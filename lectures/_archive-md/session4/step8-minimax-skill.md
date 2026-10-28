<article class="s3-lesson s4-lesson">
<div class="s3-meta">AI 아트웍 · 4회차 · 2026.10.29 목 · 19:05–19:15</div>

# MiniMax 공식 스킬 설치하기

<figure class="s3-screen"><div class="s3-app" aria-label="공식 문서 기반 Codex 화면 목업"><div class="s3-appbar">ChatGPT</div><div class="s3-appbody"><aside><b>Codex</b><span>New chat</span><span>Scheduled</span><span>Plugins</span></aside><div class="s3-work"><div class="s4-response"><div class="s4-install"><div class="s4-files"><span>.agents/skills/</span><b>　h3-prompt-writing/</b><span>　　SKILL.md</span><span>　　references/ref-en.txt</span></div><div><h2>공식 스킬 9개 · 프로젝트 설치</h2><p>다음 새 대화에서<br/>h3-prompt-writing 이름·경로 인식</p></div></div></div><div class="s3-composer"><span class="s3-folder">ai-artwork</span><div class="s3-input">&nbsp;</div><div class="s3-controls"><span>＋　Full access</span><span>GPT-6.1 Sol　⌄</span></div></div></div></div></div><figcaption>공식 OpenAI 문서 기반 앱 목업 · 본문은 PC 실측 결과 재현 · 데스크톱 앱 직접 조작 미검증</figcaption></figure>
<div class="s3-prompt">

```text
MiniMax 공식 저장소 https://github.com/MiniMax-AI/MiniMax-H3 의 skills 폴더를 확인하고 공식 H3 스킬을 현재 작업 폴더에 설치해줘.
공식 안내의 npx skills add https://github.com/MiniMax-AI/MiniMax-H3 --skill '*'를 기준으로, Codex가 찾는 프로젝트 경로 .agents/skills에 설치. 전역 설치는 하지 말고 소유자 설정도 바꾸지 마. 비대화형 실행이 필요하면 실제 도움말을 확인해 에이전트 codex와 확인 옵션을 지정해줘.
실행한 정확한 명령, 설치한 스킬 이름, SKILL.md의 실제 경로를 알려줘. 영상 생성·Comfy 로그인·크레딧 사용은 하지 마.
```

</div>
<p class="s3-note">실측 명령 · <code>npx --yes skills add https://github.com/MiniMax-AI/MiniMax-H3 --skill '*' --agent codex --yes</code></p><p class="s3-task">설치 후 같은 작업 폴더에서 New chat · 다음 페이지 프롬프트 입력</p><p class="s3-note">이번 실습에 쓰는 스킬은 h3-prompt-writing · 프롬프트 작성 지침 · 영상 실행은 Comfy CLI</p>

<div class="s3-footer"><span>08 / 11</span><span><a href="https://github.com/MiniMax-AI/MiniMax-H3/blob/main/skills/README.md" target="_blank" rel="noreferrer">MiniMax 공식 설치 안내</a></span></div>
<nav class="s3-pagination"><a href="#/lectures/session4/step7">이전</a><a href="#/lectures/session4/step9">다음 · 타임스탬프 프롬프트 쓰기</a></nav>
</article>
