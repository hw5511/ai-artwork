# 리서치: 모델 룩북 & AI 인플루언서 (인물 일관성 계열)

> 조사일: 2026-08-21 · 커리큘럼 2회차 실습 B, 3회차 실습 B의 근거 자료.
> 공통 핵심 기술 = **인물 일관성(identity 고정)** — 7회차 캐릭터 IP와 같은 기술 계열.

## 모델 룩북 제작 방식 — 2회차 실습 B

실무 표준 3단계:

1. **페르소나 고정** — 가상 모델 후보를 여러 명 생성 → 1명 선정 →
   **레퍼런스 시트**(정면·측면·표정) 제작. 이후 모든 컷에서 얼굴 골격·헤어·피부톤을
   이 시트 기준으로 고정.
2. **가상 피팅 (Virtual Try-On)** — 인물 사진 + 옷 사진 2장 입력 →
   얼굴·포즈 유지한 채 옷만 착용시킴.
   - ComfyUI에 공식/커뮤니티 워크플로우 템플릿 다수 (Qwen-Image-Edit 기반, FLUX VTON 등)
     → 에이전트가 `search_templates`로 찾아 바로 실행 가능.
   - 옷 사진은 흰 배경/마네킹 컷이 인식 잘됨.
3. **멀티앵글·연출 확장** — 착용컷 1장 → 각도 회전·디테일 클로즈업·로케이션 배경 합성.
   실무 표준 구성: **메인 착용컷 1 + 디테일컷 3**.

실무 현황: DTC 패션 브랜드들이 스튜디오 촬영 없이 주간 신상 룩북을 이 방식으로 처리.

출처:
- https://www.runcomfy.com/comfyui-workflows/comfyui-virtual-try-on-workflow-qwen-model-clothing-fitting
- https://comfy.org/workflows/1c8383fd62e5-1c8383fd62e5/ (FLUX VTON, comfy.org 공식)
- https://www.runcomfy.com/comfyui-workflows/consistent-character-creator-3-8-in-comfyui-hyperrealistic-consistent-ai-characters
- https://blinkstudio.ai/insights/ai-lookbook-workflow (실무 파이프라인)
- https://allmyuniverse.com/image-prompt-guide-model-multi-angle-lookbook-grid/ (멀티앵글)
- https://laongen.com/blog/ko/laongen-ai-lookbook-guide/

## AI 인플루언서 셀카 릴스 제작 방식 — 3회차 실습 B

2026년 표준 워크플로우 4단계:

1. **아이덴티티 고정 (핵심)** — "매번 새 얼굴"이 아니라 **저장된 한 인물**로 운영.
   포트레이트 10~20장으로 아이덴티티 학습(캐릭터 LoRA/ID 고정) →
   이후 어떤 의상·배경·앵글에서도 같은 얼굴.
2. **셀카뷰(POV) 이미지 생성** — 팔 뻗은 셀카 구도, 폰카 플래시 질감, 약간의 흔들림 등
   "일반인 UGC 느낌"을 프롬프트로 연출. (너무 화보 같으면 광고 티가 나서 성과 하락)
3. **i2v + 립싱크** — 대본(Claude) → TTS로 목소리 고정 → 셀카 이미지를 영상화 →
   립싱크 도구로 입모양 동기화 → "카메라 보고 말하는" 릴스.
4. **릴스 규격 결합 + AI 표기** — 9:16 조립.
   **메타·틱톡·유튜브 모두 업로드 시 AI 생성 콘텐츠 표기 토글 의무** → 수업 내 윤리·표기 교육 지점.

실무 수요: UGC형 AI 광고가 브랜드 마케팅 표준으로 정착 중,
AI 인플루언서 계정 운영 자체가 수익 모델 (운영 관례: 초기 60일 일 1~3포스트).

출처:
- https://higgsfield.ai/blog/how-to-create-ai-influencer
- https://www.theinfluencer.ai/ai-ugc-guide
- https://carat.im/blog/ai-influencer-guide
- https://www.how-toai.com/blog/ai-virtual-influencer-side-job-2026 (수익화·표기 의무)

## 커리큘럼 연결 구조

```
2회차 실습 B: 페르소나 고정 + VTON 룩북   (인물 일관성 입문)
3회차 실습 B: 같은 인물 → 셀카 릴스       (일관성 + 영상 + 립싱크)
7회차:        캐릭터 IP 일관성 시트       (일관성 심화 — 사람이 아닌 캐릭터)
```
