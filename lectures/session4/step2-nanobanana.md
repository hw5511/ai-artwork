# 유료노드 사용해보기

## 유료 API 노드란?

API 노드는 ComfyUI 안에서 외부 회사의 AI 모델(Nano Banana, GPT Image, Kling, Veo 등)을 바로 불러 쓰는 노드입니다.
실행할 때마다 **노드 위에 표시된 만큼 크레딧이 추가로 차감**되니, 실행 전에 꼭 확인하세요.

---section---

## 비교 템플릿 다운로드

같은 프롬프트와 같은 시드로 여러 모델을 한 번에 돌려 결과를 나란히 비교합니다. 끄고 싶은 모델은 그룹을 선택한 뒤 **Ctrl+B**로 건너뛸 수 있습니다.

[[download: downloads/session4/step2/image_compare_sheet.json | 이미지 비교 시트 - 오픈 모델 3개(FLUX.2, Z-Image, Qwen-Image)와 API 16개(Nano Banana, GPT Image, Seedream, FLUX 3, Krea 3, Bria FIBO 등) 19개 모델]]

[[download: downloads/session4/step2/video_compare_5s.json | 5초 영상 비교 - LTX-2.5, Wan 2.2와 MiniMax, Kling, Veo, Seedance, Wan 2.7, Grok, FLUX 3 Max 9개 모델]]

---section---

## MiniMax H3 오픈 모델 4가지 모드 비교

이 워크플로는 유료 API 노드가 아니라 **MiniMax H3 오픈 모델**(가중치 공개판)을 ComfyUI 기본 노드로 직접 돌립니다. 같은 20대 여성 인물과 같은 카페 장면으로 네 가지 방식(텍스트, 첫 프레임, 첫+마지막 프레임, 레퍼런스)을 비교하고, 영상과 함께 스테레오 소리도 한 번에 만들어집니다.

- Comfy Cloud에는 필요한 모델 파일이 이미 올라가 있어 따로 받을 필요가 없습니다. API 노드 요금은 없고 GPU 사용 시간만큼 크레딧이 차감됩니다.
- 내 PC에서 네 모드를 모두 돌리려면 모델 파일이 약 63GB 필요하고(확산 모델 2개 포함), 24GB 그래픽카드(RTX 4090)는 int8 텍스트 인코더를, 32GB(RTX 5090)는 nvfp4 인코더를 씁니다. 자세한 파일 목록은 워크플로 안의 메모(Note)에 있습니다.
- 아래 이미지 3장을 받아 Load Image 노드에 올리세요.

[[download: downloads/session4/step2/minimax_4modes.json | MiniMax H3 오픈 모델 4가지 모드 - T2V, I2V, 첫+마지막 프레임, 레퍼런스 영상 (기본 노드)]]

[[download: downloads/session4/step2/minimax_subject.png | 예제 이미지 1 - 인물 레퍼런스 (R2V 입력)]]

[[download: downloads/session4/step2/minimax_first.png | 예제 이미지 2 - 첫 프레임, 창밖을 보는 장면 (I2V, 첫+마지막 프레임 입력)]]

[[download: downloads/session4/step2/minimax_last.png | 예제 이미지 3 - 마지막 프레임, 돌아보며 웃는 장면 (첫+마지막 프레임 입력)]]

같은 비교를 MiniMax 유료 API 노드로 해 보고 싶다면 아래 파일을 쓰세요. 실행할 때마다 API 크레딧이 차감됩니다(4가지 모드 한 번에 약 2.6달러).

[[download: downloads/session4/step2/minimax_4modes_api.json | (선택) 유료 API 노드 버전 - MiniMax H3 API 4가지 모드]]
