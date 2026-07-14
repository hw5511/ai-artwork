# CLIP 인코딩 모델

## 텍스트 인코더란?

AI 이미지 생성 모델은 텍스트 프롬프트를 직접 이해하지 못합니다.
프롬프트를 모델이 처리할 수 있는 숫자 벡터로 변환하는 것이 **텍스트 인코더**의 역할입니다.

```settings
프롬프트 (텍스트)
    ↓ 텍스트 인코더
숫자 벡터 (임베딩)
    ↓ 디퓨전 모델
이미지
```

텍스트 인코더의 성능이 곧 프롬프트 이해력을 결정합니다.

---section---

## CLIP 인코더

**CLIP(Contrastive Language-Image Pre-training)**은 OpenAI가 2021년 발표한 멀티모달 모델입니다.
이미지와 텍스트를 같은 벡터 공간에 매핑하도록 학습하여, 텍스트만으로도 이미지 특성을 표현할 수 있습니다.

### CLIP의 학습 방식

수억 장의 이미지-캡션 쌍으로 학습했습니다.

```settings
"a cat sitting on a sofa" → [0.12, -0.34, 0.87, ...] (텍스트 벡터)
고양이 소파 이미지           → [0.11, -0.35, 0.86, ...] (이미지 벡터)
            ↑ 두 벡터를 최대한 가깝게 학습
```

이렇게 학습된 CLIP은 텍스트를 이미지와 "유사한 언어"로 번역하는 역할을 합니다.

---

### CLIP이 잘하는 것

- 짧고 명확한 키워드 처리
- 스타일, 색감, 분위기 표현
- 객체 나열 및 조합

```prompt
1girl, long hair, blue dress, sunset, soft lighting, masterpiece
```
이런 키워드 나열 프롬프트에서 CLIP은 뛰어난 성능을 발휘합니다.

---

### CLIP의 한계

CLIP은 텍스트의 **순서와 관계**를 완전히 이해하지 못합니다.

예를 들어, 아래 두 문장을 구분하기 어렵습니다:

```settings
"A dog chasing a man"  (개가 사람을 쫓는 중)
"A man chasing a dog"  (사람이 개를 쫓는 중)
```

CLIP은 "dog", "man", "chasing"이라는 키워드를 모두 인식하지만,
**누가 누구를 쫓는지**의 방향성을 정확히 반영하기 어렵습니다.

> 이 때문에 SD 1.5 / SDXL 계열 모델에서 복잡한 관계나 긴 문장 프롬프트가 잘 반영되지 않는 경우가 생깁니다.

---section---

## Stable Diffusion에서의 CLIP

### SD 1.5 - CLIP ViT-L/14

SD 1.5는 **CLIP ViT-L/14** 인코더를 사용합니다.

```settings
CLIP ViT-L/14
- 파라미터: 약 123M
- 최대 토큰 수: 77 토큰 (약 60단어)
- 학습 이미지: LAION 데이터셋 (수십억 장)
```

77 토큰 제한으로 인해 긴 프롬프트는 잘려나가고,
초과된 부분이 이미지에 반영되지 않는 경우가 발생합니다.

---

### SDXL - 듀얼 CLIP (OpenCLIP-ViT-bigG + CLIP ViT-L)

SDXL은 두 개의 CLIP 인코더를 **병렬로** 사용합니다.

```settings
SDXL 텍스트 인코딩 구조

프롬프트 → CLIP ViT-L/14    → 임베딩 A ─┐
         → OpenCLIP-ViT-bigG → 임베딩 B ─┴→ 결합 → 디퓨전 모델
```

| 인코더 | 특징 |
|--------|------|
| CLIP ViT-L | SD 1.5와 동일, 호환성 중심 |
| OpenCLIP-ViT-bigG | 더 큰 모델, 세부 표현 강화 |

두 인코더의 임베딩을 합쳐 더 풍부한 프롬프트 표현이 가능하지만,
근본적인 키워드 중심 처리 방식은 동일합니다.

---section---

## Flux - CLIP + T5-XXL

Flux는 CLIP의 한계를 보완하기 위해 **T5-XXL 인코더**를 함께 사용합니다.

```settings
Flux 텍스트 인코딩 구조

프롬프트 → CLIP-L  → 임베딩 A ─┐
         → T5-XXL  → 임베딩 B ─┴→ 결합 → 디퓨전 모델
```

### T5-XXL이란?

**T5(Text-to-Text Transfer Transformer)**는 Google이 개발한 대형 언어 모델입니다.

> 쉽게 말하면 **미니 GPT**라고 생각하면 됩니다.
> GPT나 Llama 같은 LLM처럼 문장의 의미를 이해하고 토큰화해주는 언어 모델입니다.
> CLIP이 "단어 사전"처럼 키워드를 조회하는 방식이라면,
> T5는 "문장을 읽고 이해하는 독자"처럼 문맥 전체를 파악합니다.

```settings
T5-XXL
- 파라미터: 11B (110억)
- 설계 목적: 문장 의미 이해와 변환
- 처리 방식: 문장 전체를 "의미 단위"로 임베딩
```

T5는 원래 텍스트 번역, 요약, 질의응답을 위해 설계된 모델로,
문장의 구조와 의미 관계를 CLIP보다 훨씬 정밀하게 이해합니다.

---

### CLIP vs T5: 역할 분담

Flux 템플릿의 프롬프트 예시를 보면 두 인코더의 역할 차이가 명확합니다.

**CLIP 입력 (clip_l)** - 키워드 중심:
```prompt
Cute retro mini car, pastel-colored 3D flowers overflowing from it,
soft green background, minimalist and fresh style, high-precision rendering,
spring-like vibrant atmosphere, delicate petal details, gentle color grading.
```

**T5 입력 (t5xxl)** - 자연어 문장:
```prompt
Create a 3D-styled image: A cute, retro-looking mini car with soft,
pastel-colored flowers (like daisies, pink blooms) overflowing from it.
Set against a gentle green background, giving a fresh, spring-vibe.
Make it look whimsical and delicate, like a sweet illustration.
```

위 예시가 그대로 담긴 Flux 워크플로우(FLUX.1-schnell + DualCLIPLoader: clip_l + t5xxl)를 내려받아 ComfyUI에 불러오면 바로 실행해볼 수 있습니다.

[[download: downloads/session1/step7/flux_schnell_t2i.json | Flux (CLIP + T5-XXL) 워크플로우 다운로드 (.json)]]

| | CLIP | T5-XXL |
|---|---|---|
| 강점 | 스타일·분위기 키워드 | 관계·순서·문맥 이해 |
| 프롬프트 형태 | 쉼표로 나열된 태그 | 완성된 자연어 문장 |
| 토큰 한계 | 77 토큰 | 수백 토큰 이상 |

---section---

## 정리: 인코더 세대 비교

| 모델 | 인코더 | 프롬프트 스타일 |
|------|--------|----------------|
| SD 1.5 | CLIP ViT-L (단일) | 짧은 키워드 나열 |
| SDXL / Illustrious-XL | 듀얼 CLIP | 키워드 + 다소 긴 문장 |
| Flux | CLIP + T5-XXL | 키워드 또는 자연어 모두 가능 |

모델 세대가 올라갈수록 텍스트 이해 능력이 향상됩니다.
Flux에서 자연어로 작성된 긴 프롬프트가 잘 반영되는 이유가 바로 T5-XXL 인코더 덕분입니다.

> ComfyUI에서 Flux 워크플로우를 열면 **CLIPTextEncodeFlux** 노드에 `clip_l`과 `t5xxl` 두 입력 필드가 있습니다. 각각에 다른 스타일의 프롬프트를 입력해보세요.
