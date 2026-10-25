<article class="s3-lesson s3-recap-modes">
<div class="s3-meta">AI 아트웍 · 3회차 · 2026.10.27 화 · 18:05–18:10</div>

# 입력 재료에 따라 달라지는 생성 방식


<h2>10월 22일 · 이미지 편집 비교</h2>
<figure class="s3-qwen-results"><div class="s3-sheet-scroll"><a href="./lectures/images/session4/qwen_edit_result.jpg" target="_blank" rel="noreferrer"><img src="./lectures/images/session4/qwen_edit_result.jpg" alt="실제 Qwen 수업 비교 시트 · 입력 그림, t2i 사진, i2i 사진, 오른쪽 사과만 초록색으로 바꾼 inpaint, 칼을 추가한 edit 순서"/></a></div><figcaption>수업 실행 결과 · Qwen-Image-Edit 2511 · 왼쪽부터 입력 / t2i / i2i / inpaint / edit · 모바일은 좌우로 밀어 보기 · 클릭하면 원본</figcaption></figure>
<div class="s3-mode-definitions"><p><b>t2i</b> · 글로 새 이미지</p><p><b>i2i</b> · 입력 그림을 사진으로</p><p><b>inpaint</b> · 오른쪽 사과만 수정</p><p><b>edit</b> · 칼 추가 지시</p></div>
<h2>영상 · 시작 이미지와 참조 이미지의 역할</h2>
<div class="s3-recap-grid s3-video-modes"><figure><img src="./lectures/images/session3/recap/ltx-2.5-t2v-official.webp" alt="t2v · LTX 2.5 공식 템플릿 영상 프리뷰"/><figcaption><b>t2v</b> · 글로 영상<br/>LTX 2.5 공식 출력 프리뷰</figcaption></figure><figure><img src="./downloads/session4/step2/minimax_first.png" alt="i2v 수업 입력 · 카페 창밖을 보는 여성의 첫 프레임"/><figcaption><b>i2v</b> · 시작 이미지<br/>MiniMax 수업 입력</figcaption></figure><figure><div class="s3-frame-pair"><img src="./downloads/session4/step2/minimax_first.png" alt="flf2v 첫 프레임 · 창밖을 보는 모습"/><img src="./downloads/session4/step2/minimax_last.png" alt="flf2v 끝 프레임 · 돌아보며 웃는 모습"/></div><figcaption><b>flf2v</b> · 첫 프레임 → 끝 프레임<br/>MiniMax 수업 입력 2장</figcaption></figure><figure><img src="./downloads/session4/step2/minimax_subject.png" alt="r2v 수업 입력 · 흰 스웨터를 입은 여성의 인물 참조 사진"/><figcaption><b>r2v</b> · 참조 이미지·영상<br/>MiniMax 수업 인물 참조</figcaption></figure></div>
<p class="s3-note">수업 자료: <a href="#/lectures/session4/step6">Qwen 4가지 편집 결과</a> · <a href="#/lectures/session4/step2">MiniMax 4모드 입력 사진·워크플로우</a> · t2v 프리뷰: <a href="https://github.com/Comfy-Org/workflow_templates/blob/67984637eefcd4825dcf5c134e39034785be1682/templates/video_ltx2_5_t2v-1.webp" target="_blank" rel="noreferrer">Comfy-Org/workflow_templates</a></p>
<div class="s3-captions"><div><h2>로컬 모델</h2><p>내 PC의 GPU로 실행 · 모델 파일 필요</p></div><div><h2>유료 API 노드</h2><p>외부 서비스 호출 · 서비스별 요금</p></div></div>

<div class="s3-footer"><span>02 / 11</span><span></span></div>
<nav class="s3-pagination"><a href="#/lectures/session3/step1">이전</a><a href="#/lectures/session3/step3">다음 · 챗gpt와 codex의 차이점 설명 (로컬 컴퓨터에서 작업한다)</a></nav>
</article>
