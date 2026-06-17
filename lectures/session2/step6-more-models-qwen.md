# 더 많은 모델 - Qwen Image

---

## Qwen Image란?

알리바바(Alibaba) Qwen 팀이 개발한 오픈소스 이미지 생성 모델입니다.
**Apache 2.0 라이선스**로 완전 공개되어 상업적 이용도 가능하며, ComfyCloud에서 기본 제공됩니다.

### 핵심 특징

| 항목 | 내용 |
|------|------|
| 개발사 | 알리바바 Qwen 팀 |
| 아키텍처 | MMDiT (Multimodal Diffusion Transformer), 20B 파라미터 |
| 라이선스 | Apache 2.0 (상업적 이용 가능) |
| 최대 해상도 | 최대 3584×3584px |
| ComfyCloud | 기본 내장 모델로 제공 |

---

## Illustrious XL과의 차이

지금까지 강의에서 주로 쓴 Illustrious XL과 비교했을 때, Qwen Image는 완전히 다른 용도에서 강점을 보입니다.

| 비교 항목 | Illustrious XL | Qwen Image |
|-----------|---------------|------------|
| 아키텍처 | UNet 기반 | MMDiT Transformer |
| 강점 | 애니메이션/일러스트, 스타일 표현 | 실사, 텍스트 렌더링, 고해상도 |
| 이미지 내 텍스트 | 매우 취약 | 한국어/영어/중국어 정확 렌더링 |
| LoRA 생태계 | 방대 | 초기 단계 |
| 적합한 용도 | 캐릭터, 일러스트, 팬아트 | 포스터, 배너, 광고, 실사 |

> **Qwen Image가 빛나는 순간**: 이미지 안에 글자를 넣어야 할 때. 포스터, 앨범 커버, 배너 등에서 기존 SD 모델들이 흐릿하거나 깨진 텍스트를 출력하는 것과 달리, Qwen Image는 다국어 텍스트를 정확하게 렌더링합니다.

---

## 버전별 특징

| 버전 | 특징 |
|------|------|
| Qwen-Image | 기본 텍스트→이미지 생성 |
| Qwen-Image-2512 | 2025년 12월 개선판, 현재 권장 버전 |
| Qwen-Image-Edit-2511 | 이미지 편집 특화 (텍스트 지시로 부분 수정) |
| Qwen-Image-Layered | RGBA 레이어 분리 편집 (고급) |

---

## ComfyCloud에서 사용하기

Qwen Image는 ComfyCloud 내장 모델로 추가 설치 없이 바로 사용할 수 있습니다.

### 워크플로우 구조

기존 워크플로우와 핵심 흐름은 동일하지만, 체크포인트 로드 방식이 다릅니다.

```settings
[UNETLoader]          — Qwen-Image-2512 모델 로드
[DualCLIPLoader]      — 텍스트 인코더 로드
[VAELoader]           — VAE 로드
        ↓
[CLIPTextEncode]      — 프롬프트 입력
[KSampler]            — 이미지 생성
[VAEDecode] → [SaveImage]
```

ComfyCloud의 **Workflow Templates**에서 Qwen Image 템플릿을 불러오면 바로 시작할 수 있습니다.

## 실습 파일 다운로드

[[download: downloads/session2/qwen/qwen_text_to_image.json | Qwen Image - Text to Image 워크플로우]]

[[download: downloads/session2/qwen/qwen_image_canny_controlnet.json | Qwen Image - Canny ControlNet 워크플로우]]

---

## 프롬프트 실습

### 실습 1: 텍스트 렌더링 (Qwen의 핵심 강점)

```prompt
a modern music album cover, the text "MIDNIGHT" in bold white letters centered at the top, dark blue gradient background with stars, cinematic lighting, high quality
```

기존 Illustrious XL에서 같은 프롬프트를 실행하면 텍스트가 깨지거나 왜곡되지만, Qwen Image는 정확하게 출력합니다.

### 실습 2: 고해상도 실사 인물

```prompt
portrait of a woman, studio lighting, photorealistic, detailed skin texture, high quality, 4k
```

### 실습 3: 포스터/배너 제작

```prompt
a promotional poster for a coffee shop, text "MORNING BREW" at the top, text "Open 7AM - 10PM" at the bottom, warm colors, coffee cup illustration, elegant typography
```

---

## 어떤 프로젝트에 활용할까?

| 프로젝트 유형 | 추천 |
|-------------|------|
| 캐릭터 일러스트, 팬아트 | Illustrious XL |
| 광고 배너, 포스터 | **Qwen Image** |
| 이미지 내 텍스트가 필요한 작업 | **Qwen Image** |
| 고해상도 실사 이미지 | **Qwen Image** |
| 애니메이션 스타일 | Illustrious XL |

용도에 맞는 모델을 선택하는 것이 좋은 결과의 첫 번째 조건입니다.

