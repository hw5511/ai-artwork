<article class="s3-lesson s4-lesson">
<div class="s3-meta">AI 아트웍 · 4회차 · 2026.10.29 목 · 19:00–19:05</div>

# 단독 컷으로 잘라 쓰기

<figure class="s3-screen"><div class="s3-app" aria-label="공식 문서 기반 Codex 화면 목업"><div class="s3-appbar">ChatGPT</div><div class="s3-appbody"><aside><b>Codex</b><span>New chat</span><span>Scheduled</span><span>Plugins</span></aside><div class="s3-work"><div class="s4-response"><div class="s4-view-row"><figure><img class="" src="./lectures/images/session4/sheets/man.png" alt="얼굴을 크게 확인할 수 있는 남성 반신 단독 컷"/><figcaption>man.png · 반신 보완본</figcaption></figure><figure><img class="" src="./lectures/images/session4/sheets/dog.png" alt="골든리트리버 앞 3/4 전신 단독 컷"/><figcaption>dog.png</figcaption></figure><figure><img class="" src="./lectures/images/session4/sheets/leash.png" alt="빨간 리드줄 전체 단독 컷"/><figcaption>leash.png</figcaption></figure><figure><img class="" src="./lectures/images/session4/sheets/park.png" alt="같은 공원의 가로 단독 컷"/><figcaption>park.png</figcaption></figure></div></div><div class="s3-composer"><span class="s3-folder">ai-artwork</span><div class="s3-input">&nbsp;</div><div class="s3-controls"><span>＋　Full access</span><span>GPT-6.1 Sol　⌄</span></div></div></div></div></div><figcaption>공식 OpenAI 문서 기반 앱 목업 · 본문은 PC 실측 결과 재현 · 데스크톱 앱 직접 조작 미검증</figcaption></figure>
<div class="s3-prompt">

```text
session4/sheets의 원본 시트를 코드로 잘라 영상 참조용 단독 컷을 만들어줘. 재생성·Comfy 호출 없이 원본 픽셀을 잘라 저장.
man.png와 dog.png는 우상 앞 3/4 전신, leash.png는 좌상 전체 모습, park.png는 위쪽 수평 가로 컷. session4/views/man.png, dog.png, leash.png, park.png에 저장해줘.
각 파일을 열어 다른 칸·글자·잘린 신체가 섞이지 않았는지 확인하고 크기를 알려줘. 얼굴이 작거나 흐리면 그 사실을 알려주고 멈춰줘. 시트 원본은 보관하고 영상 참조에는 views의 단독 컷만 사용해.
```

</div>
<p class="s3-task">시트 보관 · 영상 입력은 session4/views의 단독 컷</p><p class="s3-note">PC 실측 · 남성 전신 크롭 627×627, 얼굴 폭 약 60px · 얼굴 판독 한계로 중단 후 아래 보완 실행</p>
<details class="s4-details"><summary>얼굴이 작을 때 · 남성 반신 한 장만 보완</summary>

<div class="s3-prompt">

```text
방금 자른 남성 전신 컷은 얼굴이 작아. session4/sheets/man.png의 우하 얼굴 근접 컷을 코드로 잘라 man-face.png에 보관하고, 그 얼굴과 rules.md를 기준으로 Codex 내장 이미지 생성에서 남성 앞 3/4 반신 단독 컷 한 장만 만들어줘. Comfy나 유료 이미지 API는 쓰지 마.
같은 얼굴·검은 머리·초록 필드 재킷·크림색 티셔츠, 회색 무배경·균일 조명. 머리부터 골반까지, 양 어깨와 양손을 화면 안에 넣고 얼굴 높이는 화면 세로의 약 1/4. 소품·개·글자 제외. 시트 전체를 다시 만들지 마.
기존 session4/views/man.png는 man-full.png로 보관하고 새 단독 컷을 session4/views/man.png에 저장해줘. 열어서 얼굴이 읽히는지 확인하고 크기를 알려줘. 나머지 dog.png·leash.png·park.png는 그대로 사용해.
```

</div>

</details>


<div class="s3-footer"><span>07 / 11</span><span>PC 실측 · 원본 픽셀 크롭과 얼굴 보완</span></div>
<nav class="s3-pagination"><a href="#/lectures/session4/step6">이전</a><a href="#/lectures/session4/step8">다음 · MiniMax 공식 스킬 설치하기</a></nav>
</article>
