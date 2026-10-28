<article class="s3-lesson s4-lesson">
<div class="s3-meta">AI 아트웍 · 4회차 · 2026.10.29 목 · 19:25–19:45</div>

# 비용 확인 후 Comfy Cloud에서 생성하기

<figure class="s3-screen"><div class="s3-app" aria-label="공식 문서 기반 Codex 화면 목업"><div class="s3-appbar">ChatGPT</div><div class="s3-appbody"><aside><b>Codex</b><span>New chat</span><span>Scheduled</span><span>Plugins</span></aside><div class="s3-work"><div class="s4-response"><div class="s4-cost"><div><h2>예상 크레딧</h2><strong>814.8</strong><p>27.16 × 10초 × 3클립</p></div><div><p>클립당 271.6 · 768P · 참조 3장<br/>가격표로 계산한 추정값<br/>미리보기: status = preview<br/>업로드·제출·크레딧 사용 없음</p></div></div></div><div class="s3-composer"><span class="s3-folder">ai-artwork</span><div class="s3-input">&nbsp;</div><div class="s3-controls"><span>＋　Full access</span><span>GPT-6.1 Sol　⌄</span></div></div></div></div></div><figcaption>공식 OpenAI 문서 기반 앱 목업 · 본문은 PC 실측 결과 재현 · 데스크톱 앱 직접 조작 미검증</figcaption></figure>
<div class="s3-prompt">

```text
작업 폴더에 저장한 Comfy 스킬과 session4/prompts/references.json을 읽고 Comfy Cloud의 MiniMax H3 R2V 클립 3개를 준비해줘. 지금은 견적과 제출 전 미리보기까지만. 로그인·인증·업로드·영상 제출·크레딧 사용은 하지 마.
공식 템플릿 api_minimax_h3_r2v를 Comfy CLI로 받아 API 워크플로 3개를 session4/cloud에 저장해줘. MinimaxHailuo03ReferenceNode, MiniMax H3, 768P, 16:9, 10초, 클립당 참조 3장. H3 Max나 로컬 모델 템플릿으로 바꾸지 마. 프롬프트와 참조 순서는 references.json 그대로. SaveVideo의 format.codec도 확인해줘.
공식 파트너 가격표 https://docs.comfy.org/tutorials/partner-nodes/pricing 에서 단가를 확인하고 클립당·총 예상 크레딧을 먼저 보여줘. 참고값은 초당 27.16크레딧, 30초 약 815크레딧. 재생성은 별도 비용. CLI 미리보기에 숫자 견적이 없으면 가격표로 계산한 값임을 표시해줘.
comfy run의 --where cloud --print-prompt로 세 워크플로의 입력만 검증하고 멈춰줘. 비용 확인 뒤 내가 생성 승인을 주면, 단독 컷 업로드 응답의 cloud_name을 LoadImage에 반영하고 미리보기를 다시 확인한 후 --allow-spend로 제출할 계획까지 알려줘. 완료 후에는 jobs wait와 download로 session4/clips/clip1.mp4, clip2.mp4, clip3.mp4를 받을 예정이야. 오류 1026이면 원문 오류를 보여주고 자동 재시도는 하지 마.
```

</div>

<details class="s4-details"><summary>견적 확인 뒤 · 실제 제출·회수 명령</summary><div class="s4-command-list"><p>1. 단독 컷 업로드 · 반환된 cloud_name을 LoadImage에 반영</p><pre><code class="language-powershell">comfy --json upload session4/views/man.png session4/views/leash.png session4/views/park.png --where cloud --no-overwrite</code></pre><p>2. 클립별 미리보기 · 프롬프트·참조 순서·10초 재확인</p><pre><code class="language-powershell">comfy --json run --workflow session4/cloud/clip1.api.json --where cloud --print-prompt</code></pre><p>3. 수강생 비용 확인과 생성 승인 뒤 제출</p><pre><code class="language-powershell">comfy --json run --workflow session4/cloud/clip1.api.json --where cloud --allow-spend</code></pre><p>4. 응답의 실제 prompt_id로 대기·회수 · 클립 2·3도 같은 순서</p><pre><code class="language-powershell">comfy --json jobs wait &lt;prompt_id&gt; --where cloud
comfy --json download &lt;prompt_id&gt; --where cloud --out-dir session4/clips</code></pre></div></details>
<p class="s3-note">2026-10-28 기준 · 공식 템플릿 api_minimax_h3_r2v · MinimaxHailuo03ReferenceNode · MiniMax H3 768P · Standard 월 4,200크레딧 · 재생성 비용 별도</p><p class="s3-note">사전 검증은 제출 전 preview까지 · Comfy 계정 로그인·업로드·유료 생성·회수 미실행 · CLI 자체 숫자 견적 없음</p><div class="s3-captions"><div><h2>오류 1026 · 문구 차단</h2><p>원문 오류 확인 후 중단 · 거친 감정·폭력 묘사는 실제 의도에 맞는 일상 동작으로 수정 · 예: 격하게 날뛰기 대신 고개 들고 꼬리 흔들기</p></div><div><h2>배경이 바뀐 클립</h2><p>같은 park.png 연결 여부 · 참조 순서와 공원 묘사 확인 · 재생성 전 새 비용 확인</p></div></div><p class="s3-task">생성 대기 중이면 강사 데모 클립으로 이어붙이기 실습 · 내 작업 ID 보관</p>
<details class="s4-details s4-framing-recovery"><summary>참조 없는 대상이 나타날 때 · 구도 보완</summary>
<p class="s3-note">강사 실측 · 시드 변경만으로 남은 첫 프레임의 다른 개 외형 · 보이는 요소 중심으로 클립1 구도 보완 · Cloud 10초 재생성 예상 271.6크레딧 추가 · 새 비용 확인 뒤 생성 승인</p>
<div class="s3-prompt">

```text
클립1 첫 프레임 가장자리에 참조에 없는 개가 나타났어. $h3-prompt-writing 공식 스킬로 session4/prompts/clip1.txt의 구도만 보완해줘. 대본의 멈추고 내려다보기, 10초와 5초 지점 전환, 같은 남성·빨간 리드줄·공원은 유지. 클립2·3 프롬프트와 참조 파일은 바꾸지 마.
첫 샷은 남성의 얼굴·어깨·가슴만 보이는 고정 근접, 둘째 샷은 같은 축에서 허리·손·리드줄 근접. 시선·어깨의 작은 움직임으로 멈춤을 표현. 화면 밖 대상의 외형 설명은 빼고 보이는 요소만 써줘. 사람 클립의 영어 프롬프트에는 dog, animal, collar 같은 단어를 부정문에도 쓰지 마. 리드줄은 손에 든 고리와 화면 아래로 나가는 빨간 띠로만 묘사하고, 멈춘 구간은 정지 상태 명시.
공식 6섹션과 Subject 표기, [Shot 1] 및 [Shot 2] At 00:05.000 형식 유지. Picture 1은 man.png의 외형, Picture 2는 leash.png의 형태, Picture 3은 park.png의 지형·배치·빛. 참조 순서 유지. 보완 전 원문은 별도 보관하고 샷 목록의 클립1 구도도 맞춰줘.
Comfy 스킬을 읽고 clip1.api.json에도 같은 새 프롬프트를 CLI로 반영한 뒤 --where cloud --print-prompt까지만 확인해줘. 로그인·업로드·영상 제출·크레딧 사용은 하지 마. 768P 10초 한 편 재생성의 새 예상 비용을 공식 단가로 계산해 먼저 보여줘. 견적 확인 뒤 내가 생성 승인을 줄 때까지 멈춰줘.
```

</div>

</details>


<div class="s3-footer"><span>10 / 11</span><span><a href="https://docs.comfy.org/tutorials/partner-nodes/pricing" target="_blank" rel="noreferrer">파트너 단가</a> · <a href="https://comfy.org/pricing" target="_blank" rel="noreferrer">Comfy 플랜</a> · <a href="https://docs.comfy.org/agent-tools/cli" target="_blank" rel="noreferrer">공식 CLI</a></span></div>
<nav class="s3-pagination"><a href="#/lectures/session4/step9">이전</a><a href="#/lectures/session4/step11">다음 · 30초로 이어 보고 비교하기</a></nav>
</article>
