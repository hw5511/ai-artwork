# 더 많은 모델 - Z-Image

---

## Z-Image란?

알리바바 Tongyi Lab이 개발한 오픈소스 이미지 생성 모델입니다.
2025년 출시 후 **오픈소스 포토리얼리즘 최강** 모델로 평가받으며, AI 아트 리더보드에서 오픈소스 1위를 달성했습니다.
**Apache 2.0 라이선스**로 상업적 이용이 자유롭습니다.

### 핵심 특징

| 항목 | 내용 |
|------|------|
| 개발사 | 알리바바 Tongyi Lab (Tongyi-MAI 팀) |
| 아키텍처 | S3-DiT (Scalable Single-Stream Diffusion Transformer), 6B 파라미터 |
| 라이선스 | Apache 2.0 (상업적 이용 가능) |
| 추론 속도 | RTX 4090 기준 약 2.3초/장 (Turbo 버전) |
| 오픈소스 평가 | Artificial Analysis 리더보드 오픈소스 1위 |

---

## 버전별 특징

| 버전 | 스텝 | 특징 |
|------|------|------|
| Z-Image-Turbo | 8 스텝 | 고속 추론, 빠른 프리뷰에 적합 |
| Z-Image-Base | 30~50 스텝 | 최고 품질, 세밀한 디테일 |

**실습 권장**: Turbo로 빠르게 방향을 잡고, Base로 최종 출력하는 2단계 방식이 효율적입니다.

---

## 기존 모델들과의 비교

| 비교 항목 | Illustrious XL | Qwen Image | Z-Image |
|-----------|---------------|------------|---------|
| 아키텍처 | UNet | MMDiT (20B) | S3-DiT (6B) |
| 강점 | 애니/일러스트 | 텍스트 렌더링 | 포토리얼리즘 |
| 추론 속도 | 보통 | 보통 | 매우 빠름 |
| 텍스트 렌더링 | 취약 | 우수 | 우수 |
| 포토리얼리즘 | 중간 | 우수 | 최상 |
| 추천 용도 | 캐릭터/팬아트 | 포스터/배너 | 실사/광고 |

---

## S3-DiT 아키텍처란?

기존 UNet 기반 모델(SDXL 등)과 달리, Z-Image는 텍스트와 이미지 정보를 하나의 통합 스트림으로 처리합니다.

```settings
기존 UNet 방식:
  텍스트 인코더 → [조건 주입] → UNet → 이미지

S3-DiT 방식:
  텍스트 토큰 + 이미지 토큰 → [하나의 Transformer] → 이미지
```

이 구조 덕분에 텍스트 지시를 이미지에 더 정확하게 반영하고, 포토리얼한 디테일을 잘 살릴 수 있습니다.

---

## ComfyCloud에서 사용하기

Z-Image는 Day-0부터 ComfyUI 공식 지원을 받습니다. ComfyCloud에서도 사용 가능합니다.

### 워크플로우 구조

```settings
[CheckpointLoaderSimple]   — Z-Image-Turbo 또는 Z-Image 모델 로드
        ↓
[CLIPTextEncode]           — 프롬프트 입력
[KSampler]                 — Turbo: 8스텝, Base: 30~50스텝
                             CFG: 3~5 권장
[VAEDecode] → [SaveImage]
```

### 권장 KSampler 설정

| 설정 | Turbo | Base |
|------|-------|------|
| steps | 8 | 30~50 |
| cfg | 3~5 | 3~5 |
| sampler | euler | euler |
| scheduler | normal | normal |

## 실습 파일 다운로드

[[download: downloads/session2/zimage/z_image_text_to_image.json | Z-Image - Text to Image 워크플로우]]

[[download: downloads/session2/zimage/z_image_turbo.json | Z-Image Turbo 워크플로우]]

[[download: downloads/session2/zimage/z_image_canny_controlnet.json | Z-Image - Canny ControlNet 워크플로우]]

---

## 프롬프트 실습

### 실습 1: 포토리얼 인물 (Z-Image의 핵심 강점)

```prompt
portrait of a woman, natural sunlight, shallow depth of field, bokeh background, detailed skin texture, photorealistic, high quality
```

### 실습 2: 건축/인테리어 실사

```prompt
modern minimalist living room, large windows with city view, afternoon sunlight, photorealistic, architectural photography, high quality
```

### 실습 3: 제품 광고 이미지

```prompt
perfume bottle on marble surface, studio lighting, elegant, commercial product photography, white background, photorealistic
```

---

## 어떤 프로젝트에 활용할까?

| 프로젝트 유형 | 추천 모델 |
|-------------|---------|
| 캐릭터 일러스트, 팬아트 | Illustrious XL |
| 이미지 내 텍스트, 포스터 | Qwen Image |
| 실사 인물/광고 이미지 | Z-Image |
| 건축/인테리어/제품 사진 | Z-Image |
| 빠른 프리뷰가 필요할 때 | Z-Image Turbo |

---

## 모델 선택 가이드

지금까지 배운 3가지 유형의 모델을 정리하면:

```settings
Illustrious XL  → 애니/일러스트/캐릭터
Qwen Image      → 텍스트 포함 이미지/포스터/배너
Z-Image         → 포토리얼/광고/실사
```

작업 목적에 맞게 모델을 선택하는 것이 프롬프트 공력보다 중요할 때가 많습니다. 같은 프롬프트도 모델에 따라 결과가 전혀 달라집니다.

