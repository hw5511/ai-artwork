<article class="s3-lesson s4-lesson">
<div class="s3-meta">AI 아트웍 · 4회차 · 2026.10.29 목 · 19:15–19:25</div>

# 타임스탬프 프롬프트 쓰기

<figure class="s3-screen"><div class="s3-app" aria-label="공식 문서 기반 Codex 화면 목업"><div class="s3-appbar">ChatGPT</div><div class="s3-appbody"><aside><b>Codex</b><span>New chat</span><span>Scheduled</span><span>Plugins</span></aside><div class="s3-work"><div class="s4-response"><div class="s4-prompt-preview"><p>subject_definitions · 구도 보완 전 초안</p><p>&lt;Subject 1&gt; is the man whose appearance alone comes from &lt;Picture 1&gt; ...<br/>&lt;Subject 2&gt; is the single red flat-strap leash ...<br/>&lt;Subject 3&gt; is the park from &lt;Picture 3&gt; ...</p><p>[Shot 1] A locked frontal medium shot, ...<br/>[Shot 2] At 00:05.000, hard cut to ...</p></div></div><div class="s3-composer"><span class="s3-folder">ai-artwork</span><div class="s3-input">&nbsp;</div><div class="s3-controls"><span>＋　Full access</span><span>GPT-6.1 Sol　⌄</span></div></div></div></div></div><figcaption>공식 OpenAI 문서 기반 앱 목업 · 본문은 실제 프롬프트 발췌 · 데스크톱 앱 직접 조작 미검증</figcaption></figure>
<div class="s3-prompt">

```text
$h3-prompt-writing 스킬이 이번 새 대화에서 보이는지 이름과 경로부터 알려줘. 스킬과 reference 모드 지침을 읽고 session4/shots.json을 MiniMax H3 reference-to-video 영어 프롬프트 3개로 작성해 session4/prompts/clip1.txt, clip2.txt, clip3.txt에 저장해줘. 영상 생성은 하지 마.
공식 6개 섹션 순서와 Subject 표기를 따르고, 참조 3장의 역할을 각각 정의해줘. Picture 1은 클립1·3에서 man.png, 클립2에서 dog.png. Picture 2는 leash.png, Picture 3은 park.png. 인물·소품은 외형만 참고, 공원은 지형·배치·빛을 참고하고 시트의 배치나 흰 배경은 복제하지 마.
각 클립은 10초. 첫 샷은 공식 첫 샷 표기, 두 번째 샷은 [Shot 2] At 00:05.000, 으로 시작. 타임스탬프는 각 클립에서 다시 시작. 매 샷에 해당 주체·리드줄·같은 공원을 대응시키고 리드줄의 위치와 움직이지 않는 구간도 명시. 모든 샷에서 지평선 방향 유지. 대사·자막·음악 없이 공원 소리만.
프롬프트별 참조 파일 순서와 총 길이를 session4/prompts/references.json에 기록하고 clip1의 샷 표기를 보여줘.
```

</div>
<div class="s3-captions"><div><h2>10초 클립 안의 샷 시각</h2><p>첫 샷 [Shot 1] · 두 번째 샷 00:05.000</p></div><div><h2>클립마다 00:00부터</h2><p>최종 영상의 10·20초를 프롬프트에 누적하지 않기</p></div></div><p class="s3-note">공식 6섹션 · subject_definitions / summary / retention_analysis / detailed_description / overall_soundscape / non_diegetic_music</p><p class="s3-task"><a href="./downloads/session4/sheets/reference/clip1.txt" download>구도 보완 반영 프롬프트 1</a> · <a href="./downloads/session4/sheets/reference/clip2.txt" download>프롬프트 2</a> · <a href="./downloads/session4/sheets/reference/clip3.txt" download>프롬프트 3</a></p><p class="s3-note"><a href="./downloads/session4/sheets/reference/clip1-before-framing.txt" download>구도 보완 전 클립1 원문</a> · Step 10의 보완 프롬프트 실제 실행 후 갱신</p><p class="s3-note">타임스탬프는 생성 지시 · 생성 후 실제 컷 시점 검수 · 강사 클립1은 5초 지시에 약 6.54초 전환</p>

<div class="s3-footer"><span>09 / 11</span><span><a href="https://github.com/MiniMax-AI/MiniMax-H3/blob/main/skills/h3-prompt-writing/SKILL.md" target="_blank" rel="noreferrer">공식 H3 프롬프트 스킬</a></span></div>
<nav class="s3-pagination"><a href="#/lectures/session4/step8">이전</a><a href="#/lectures/session4/step10">다음 · 비용 확인 후 Comfy Cloud에서 생성하기</a></nav>
</article>
