<article class="s3-lesson s4-lesson">
<div class="s3-meta">AI 아트웍 · 4회차 · 2026.10.29 목 · 18:50–19:00</div>

# 로케이션 시트 만들기

<figure class="s3-screen"><div class="s3-app" aria-label="공식 문서 기반 Codex 화면 목업"><div class="s3-appbar">ChatGPT</div><div class="s3-appbody"><aside><b>Codex</b><span>New chat</span><span>Scheduled</span><span>Plugins</span></aside><div class="s3-work"><div class="s4-response"><div class="s4-result-pair s4-result-pair--location"><img class="" src="./lectures/images/session4/sheets/park-sheet.png" alt="같은 공원의 정면 수평 시점과 오른쪽 회전 시점을 담은 두 컷 로케이션 시트"/><div><h2>같은 길 · 같은 오후</h2><p>회색 포장 산책로<br/>왼쪽 돌 벤치 · 어두운 가로등<br/>session4/location.md</p></div></div></div><div class="s3-composer"><span class="s3-folder">ai-artwork</span><div class="s3-input">&nbsp;</div><div class="s3-controls"><span>＋　Full access</span><span>GPT-6.1 Sol　⌄</span></div></div></div></div></div><figcaption>공식 OpenAI 문서 기반 앱 목업 · 본문은 PC 실측 결과 재현 · 데스크톱 앱 직접 조작 미검증</figcaption></figure>
<div class="s3-prompt">

```text
session4/script.md와 rules.md, park_walk.png를 읽고 Codex 내장 이미지 생성으로 로케이션 시트를 session4/sheets/park.png에 만들어줘. Comfy나 유료 이미지 API는 쓰지 마.
2행 1열, 같은 공원의 가로 16:9 사진 두 컷. 위는 사람 눈높이 정면, 아래는 같은 자리에서 오른쪽으로 조금 돌린 시점. 오후 자연광, 나무가 늘어선 회색 포장 산책로, 양옆 잔디, 왼쪽 돌 벤치와 어두운 가로등. 사람·동물·리드줄·글자 제외. 하늘과 지면이 보이는 수평 시점. 부감 지도 제외.
배치가 안 맞으면 단독 컷을 만든 뒤 코드로 조립해줘. 두 컷의 길·벤치·빛 방향을 확인하고 고정할 특징을 session4/location.md에 기록해줘.
```

</div>
<div class="s3-captions"><div><h2>수평 촬영용 가로 컷</h2><p>사람 눈높이 · 하늘과 지면</p></div><div><h2>등장 주체·소품 분리</h2><p>남성·개·리드줄 없는 공원</p></div></div><p class="s3-note">클립이 바뀌어도 같은 park.png 참조 · 참조 없는 역방향 배경은 새로 만들어질 가능성</p>

<div class="s3-footer"><span>06 / 11</span><span>PC 실측 · park_walk.png 기반</span></div>
<nav class="s3-pagination"><a href="#/lectures/session4/step5">이전</a><a href="#/lectures/session4/step7">다음 · 단독 컷으로 잘라 쓰기</a></nav>
</article>
