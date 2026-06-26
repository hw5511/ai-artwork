# 비디오 생성 - Wan 2.2

---

## 학습 목표

- Wan 2.2 14B 모델의 다양한 비디오 생성 방식 이해
- T2V, I2V, FLF2V, Camera Control, Inpainting 6가지 워크플로우 실습
- 각 방식의 특징과 적합한 사용 상황 파악

---

## 비디오 생성의 원리

비디오 생성은 **프레임별 이미지들을 생성하고 연결하여 동영상을 구현**하는 방식입니다.

```
프레임 수 ÷ FPS = 영상 길이(초)
예시: 81프레임 ÷ 24fps ≈ 3.4초
```

---

## Wan 2.2 14B 모델

Alibaba의 오픈소스 비디오 생성 모델로, 6가지 생성 방식을 지원합니다.

---

## 워크플로우 1 - T2V (Text to Video)

텍스트 프롬프트만으로 비디오를 생성하는 가장 기본적인 방식입니다.

**핵심 노드**: `EmptyHunyuanLatentVideo` - 빈 latent에서 시작하여 텍스트 기반으로 생성

[[download: downloads/session3/step2/video_wan2_2_14B_t2v.json | T2V 워크플로우 다운로드]]

**실습**: 워크플로우를 불러온 후 Positive Prompt에 원하는 장면을 입력하고 실행하세요.

---

## 워크플로우 2 - I2V (Image to Video)

이미지를 시작 프레임으로 사용하여 비디오를 생성합니다.

**핵심 노드**: `WanImageToVideo` - 입력 이미지를 기반으로 자연스러운 움직임 생성

[[download: downloads/session3/step2/video_wan2_2_14B_i2v.json | I2V 워크플로우 다운로드]]

**실습**: LoadImage에 원하는 이미지를 업로드하고 프롬프트로 움직임 방향을 지정하세요.

---

## 워크플로우 3 - FLF2V (First Last Frame to Video)

시작 프레임과 끝 프레임을 모두 지정하면 두 이미지 사이를 자연스럽게 보간합니다.

[[image: session3/step2/sunglass_first.png | row | 시작 프레임]]
[[image: session3/step2/sunglass_end.png | row | 끝 프레임 (a woman wearing sunglasses)]]

**핵심 노드**: `WanFirstLastFrameToVideo` - 시작/끝 이미지를 모두 받아 보간 비디오 생성

```settings
기본 설정: 저 VRAM 환경을 위해 작은 해상도로 설정됨
VRAM 여유 있을 경우: 해상도 값을 높여 품질 향상 가능
```

[[download: downloads/session3/step2/video_wan2_2_14B_flf2v.json | FLF2V 워크플로우 다운로드]]

**실습**: 시작 이미지와 끝 이미지를 각각 LoadImage 노드에 업로드하고 실행하세요.

---

## 워크플로우 4 - Camera Control

이미지와 함께 카메라 움직임을 직접 지정하여 영상을 생성합니다.

[[image: session3/step2/coffee_video.png | width:60% | 카메라 컨트롤 입력 이미지 (a woman drinking coffee)]]

**핵심 노드**:
- `WanCameraEmbedding` - 카메라 모션 설정 (pan, tilt, zoom, roll 등)
- `WanCameraImageToVideo` - 카메라 정보를 반영하여 비디오 생성

[[download: downloads/session3/step2/video_wan2_2_14B_camera.json | Camera Control 워크플로우 다운로드]]

**실습**: LoadImage에 이미지를 업로드하고, WanCameraEmbedding에서 원하는 카메라 움직임을 설정하세요.

---

## 워크플로우 5 - Fun Inpainting

비디오의 특정 영역을 마스크로 지정하여 해당 부분만 새롭게 생성합니다.

**핵심 노드**: `WanFunInpaintToVideo` - 이미지 + 마스크를 받아 마스킹 영역을 비디오로 생성

```settings
기본: 일반 모드 (품질 우선)
Lightning LoRA 활성화: 생성 속도 향상 (단, 영상 다이나믹 감소 가능)
두 모드 중 하나를 활성화하여 사용
```

[[download: downloads/session3/step2/video_wan2_2_14B_fun_inpaint.json | Fun Inpainting 워크플로우 다운로드]]

**실습**: LoadImage에 이미지를 업로드하고 MaskEditor에서 수정할 영역을 지정한 후 실행하세요.

---

## 워크플로우 6 - VACE Inpainting

기존 비디오를 불러와 특정 영역을 프레임별로 재생성하는 고급 인페인팅 방식입니다.

**핵심 노드**:
- `LoadVideo` - 기존 비디오 파일 로드
- `WanVaceToVideo` - VACE 방식으로 비디오 인페인팅 처리

```settings
기본: steps 20, cfg 6.0
CausVid LoRA 사용 시: steps 2~4, cfg 1.0 (빠른 생성, LoRA 강도 0.3~0.7 권장)
참조 이미지: 단색 배경 이미지가 더 좋은 결과를 냄
```

[[download: downloads/session3/step2/video_wan_vace_inpainting.json | VACE Inpainting 워크플로우 다운로드]]

**실습**: LoadVideo에 비디오를 업로드하고, 마스크 영역을 지정한 후 실행하세요.

---

## 6가지 방식 요약

| 워크플로우 | 입력 | 특징 |
|-----------|------|------|
| T2V | 텍스트 | 가장 기본, 자유로운 생성 |
| I2V | 이미지 1장 | 이미지에서 움직임 시작 |
| FLF2V | 이미지 2장 | 시작·끝 프레임 보간 |
| Camera | 이미지 + 카메라 설정 | 카메라 움직임 직접 제어 |
| Fun Inpaint | 이미지 + 마스크 | 특정 영역만 비디오로 변환 |
| VACE Inpaint | 비디오 + 마스크 | 기존 비디오 영역 재생성 |
