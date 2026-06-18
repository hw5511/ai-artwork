# 비디오 생성 - 기타 모델

---

## 학습 목표

- SVD, Kandinsky 5, Capybara 세 가지 모델의 특징과 차이점 이해
- 각 모델의 고유한 생성 방식 실습
- 용도에 맞는 모델 선택 기준 파악

---

## 1. SVD (Stable Video Diffusion) - Stability AI

Stability AI의 이미지→비디오 생성 모델입니다. SDXL로 이미지를 먼저 생성한 뒤, SVD-XT가 해당 이미지를 비디오로 변환하는 **2단계 파이프라인** 방식을 사용합니다.

### 주요 특징

- **모델**: SVD-XT (1.52B 파라미터, Stable Diffusion 기반)
- **해상도**: 576x1024, 최대 25프레임 생성
- **방식**: SDXL(이미지 생성) → SVD-XT(비디오 변환)
- 세밀한 카메라 모션과 자연스러운 움직임

### 핵심 파라미터

```settings
motion_bucket_id (0~255): 모션 양 제어. 높을수록 움직임이 커짐
fps: 초당 프레임 수 (5~30 권장)
augmentation_level: 마이크로-컨디셔닝 강도 (0에 가까울수록 원본 이미지에 충실)
```

### 워크플로우 구조

```
[1단계] SDXL 이미지 생성
KSampler → VAEDecode → 이미지

[2단계] SVD 비디오 변환
SVD_img2vid_Conditioning → VideoLinearCFGGuidance → KSampler → 비디오
```

### 실습

[[download: downloads/session3/step4/svd_txt_to_image_to_video.json | SVD T2I-to-Video 워크플로우 다운로드]]

**실습**: 프롬프트로 SDXL 이미지를 생성한 후 SVD-XT가 자동으로 비디오로 변환합니다. `motion_bucket_id` 값을 조정하며 움직임 강도 변화를 실험해보세요.

---

## 2. Kandinsky 5 - KandinskyLab

러시아 AI 연구소 KandinskyLab의 멀티모달 생성 모델 시리즈입니다. T2I와 I2V를 모두 지원하며, Qwen-2.5-VL 텍스트 인코더를 사용해 풍부한 텍스트 이해력을 갖추고 있습니다.

### 주요 특징

- **아키텍처**: DiT(Diffusion Transformer) 기반
- **텍스트 인코더**: Qwen-2.5-VL + CLIP
- **비디오 인코더**: HunyuanVideo 3D VAE 활용
- 한국어/영어/러시아어 프롬프트 지원
- T2I Lite(6B), Video Lite(2B), Video Pro(19B) 라인업

### 해상도 규칙

```settings
T2I: 128의 배수
I2V(5초): 768x512x121 프레임
I2V(10초): 768x512x241 프레임, Width/Height 반드시 128의 배수
결과 비율은 입력 이미지 비율에 가깝게 자동 조정
```

### 워크플로우 1 - T2I (Text to Image)

[[download: downloads/session3/step4/image_kandinsky5_t2i.json | Kandinsky 5 T2I 워크플로우 다운로드]]

**실습**: 텍스트 프롬프트를 입력하고 이미지를 생성하세요. Qwen 텍스트 인코더 덕분에 자세한 묘사도 잘 반영됩니다.

### 워크플로우 2 - I2V (Image to Video)

[[download: downloads/session3/step4/video_kandinsky5_i2v.json | Kandinsky 5 I2V 워크플로우 다운로드]]

**실습**: LoadImage에 이미지를 업로드하고 실행하세요. 5초와 10초 생성 중 선택할 수 있으며, 10초 모드에서는 해상도가 128의 배수여야 합니다.

---

## 3. Capybara v0.1 - xgen-universe

Salesforce Research(xgen-universe)의 통합 시각 생성 모델입니다. 이미지와 비디오의 생성·편집을 하나의 모델로 처리하는 것이 특징입니다.

### 주요 특징

- **아키텍처**: Diffusion + Transformer 통합
- **텍스트 인코더**: Qwen-2.5-VL 7B + ByT5
- **GPU 요구사항**: Ada Lovelace 이상 (RTX 4090, L40, H100 등, Compute Capability 8.9+)
- T2I, I2V, 이미지 편집, 비디오 편집 4가지 기능 통합

### 해상도 가이드

| 그룹 | 비율 | 해상도 |
|------|------|--------|
| 480p | 16:9 | 848x480 |
| 480p | 1:1 | 640x640 |
| 720p | 16:9 | 1280x720 |
| 720p | 1:1 | 960x960 |

### 워크플로우 1 - T2I (Text to Image)

[[download: downloads/session3/step4/Image_capybara_v0_1_text_to_image.json | Capybara T2I 워크플로우 다운로드]]

**실습**: 원하는 장면을 텍스트로 입력하세요.

### 워크플로우 2 - 이미지 편집

지시사항(instruction) 기반으로 기존 이미지를 편집합니다. 프롬프트에 변경할 내용을 지시 형태로 입력합니다.

[[download: downloads/session3/step4/Image_capybara_v0_1_image_edit.json | Capybara 이미지 편집 워크플로우 다운로드]]

**실습**: LoadImage에 원본 이미지를 업로드하고, 프롬프트에 "Change the background to a forest" 같은 지시문을 입력하세요.

### 워크플로우 3 - I2V (Image to Video)

[[download: downloads/session3/step4/video_capybara_v0_1_image_to_video.json | Capybara I2V 워크플로우 다운로드]]

**실습**: LoadImage에 이미지를 업로드하고 원하는 움직임을 프롬프트로 묘사하세요.

### 워크플로우 4 - 비디오 편집

기존 비디오에 텍스트 지시사항을 적용해 내용을 수정합니다.

[[download: downloads/session3/step4/video_capybara_v0_1_video_edit.json | Capybara 비디오 편집 워크플로우 다운로드]]

**실습**: LoadVideo에 원본 비디오를 업로드하고, 수정할 내용을 지시 프롬프트로 입력하세요.

---

## 3가지 모델 비교

| 항목 | SVD | Kandinsky 5 | Capybara |
|------|-----|-------------|---------|
| 개발사 | Stability AI | KandinskyLab | xgen-universe |
| 기능 | T2I→I2V (2단계) | T2I + I2V | T2I + I2V + 편집 |
| 워크플로우 수 | 1 | 2 | 4 |
| 텍스트 인코더 | CLIP | Qwen-2.5-VL + CLIP | Qwen-2.5-VL + ByT5 |
| GPU 요구 | 일반 | 일반 | Ada Lovelace+ |
| 강점 | 자연스러운 I2V | 러/영 다국어, DiT | 편집 기능 통합 |
