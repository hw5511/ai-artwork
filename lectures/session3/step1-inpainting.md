# Inpainting & Outpainting 실전

---

## 학습 목표

세 가지 워크플로우를 통해 Inpainting과 Outpainting을 실전에서 활용하는 방법을 습득합니다.

- **Flux Inpaint**: Flux Fill Dev 모델로 마스킹 영역을 프롬프트로 수정
- **Qwen Inpaint**: Qwen 모델 + ControlNet + 마스크 블러 처리로 자연스러운 인페인팅
- **Qwen Outpaint**: 이미지 캔버스를 확장하여 주변 영역을 새롭게 생성

---

## 실습 1 - Flux Inpaint

Flux Fill Dev 모델을 사용하여 이미지의 특정 영역을 마스킹하고 프롬프트로 내용을 교체합니다.

### 워크플로우 구조

```
LoadImage (이미지 + 마스크)
    ├── IMAGE → InpaintModelConditioning
    └── MASK  → InpaintModelConditioning

DualCLIPLoader → CLIPTextEncode (Positive Prompt)
    └── FluxGuidance → InpaintModelConditioning
    └── ConditioningZeroOut → InpaintModelConditioning

UNETLoader → DifferentialDiffusion → KSampler
VAELoader → InpaintModelConditioning
           → VAEDecode → SaveImage
```

### 핵심 노드 설명

**DifferentialDiffusion**
마스크 경계부를 그라데이션으로 처리하여 원본 이미지와 생성 결과 사이의 경계를 부드럽게 만듭니다.

**InpaintModelConditioning**
Flux Fill 전용 컨디셔닝 노드. 이미지, 마스크, VAE, 프롬프트를 하나로 묶어 인페인팅에 최적화된 latent를 생성합니다.

**ConditioningZeroOut**
네거티브 프롬프트를 0으로 만들어 제거하는 노드입니다. Flux 모델은 네거티브 프롬프트 없이도 고품질 결과를 냅니다.

### 마스크 입력 방법

LoadImage 노드에서 알파채널(투명도)이 포함된 PNG를 업로드하면 투명 영역이 자동으로 마스크로 처리됩니다.

```settings
업로드 방식: 알파채널 포함 PNG
투명 영역: 마스크 (교체 대상)
불투명 영역: 원본 유지
```

또는 LoadImage 노드에서 우클릭 → **Open in MaskEditor** 를 선택하면 브러시로 직접 마스크 영역을 그릴 수 있습니다.

### 실습

[[download: downloads/session3/inpaint/flux_inpaint.json | Flux Inpaint 워크플로우 다운로드]]

워크플로우를 불러온 후 LoadImage에 원하는 이미지를 업로드하고, MaskEditor에서 마스킹 영역을 지정합니다.
Positive Prompt에 교체할 내용을 입력하고 실행하세요.

---

## 실습 2 - Qwen Inpaint

Qwen 이미지 모델과 ControlNet(AliMama Inpainting)을 조합한 인페인팅입니다.
마스크 블러 처리 로직이 포함되어 있어 경계 합성이 더욱 자연스럽습니다.

### 워크플로우 구조

```
LoadImage → [마스크 블러 노드] → 블러된 MASK
                ├── SetLatentNoiseMask (latent에 마스크 적용)
                ├── ControlNetInpaintingAliMamaApply
                └── ImageCompositeMasked (원본 픽셀 복원)

UNETLoader → ModelSamplingAuraFlow → LoraLoaderModelOnly → KSampler
CLIPLoader → CLIPTextEncode (Positive / Negative)
VAELoader → VAEEncode → SetLatentNoiseMask → KSampler
           → VAEDecode → SaveImage
```

### 핵심 노드 설명

**마스크 블러 노드 (expand + blur_radius)**
LoadImage에서 추출한 마스크를 받아 두 가지 처리를 합니다.

```settings
expand: 마스크 영역을 바깥으로 n픽셀 확장 (경계 여유 확보)
blur_radius: 마스크 경계를 가우시안 블러로 부드럽게 처리
```

블러 처리된 마스크는 3곳에 동시 사용됩니다.
1. **SetLatentNoiseMask** - 노이즈 주입 범위를 부드럽게 제어
2. **ControlNetInpaintingAliMamaApply** - ControlNet이 마스크 경계를 부드럽게 인식
3. **ImageCompositeMasked** - 생성 결과와 원본을 자연스럽게 합성

**ModelSamplingAuraFlow**
Qwen 모델에 맞는 시그마 스케일(shift)을 조정하는 노드입니다. 값이 높을수록 디테일보다 전체 구조를 우선합니다.

**ControlNetInpaintingAliMamaApply**
AliMama 방식의 ControlNet 인페인팅 적용 노드. strength, start_percent, end_percent로 ControlNet 적용 강도와 구간을 제어합니다.

**ImageScaleToMaxDimension**
입력 이미지를 최대 1536px 이하로 리사이즈합니다. 너무 큰 이미지는 품질 저하의 원인이 되므로 활성화를 권장합니다.

### 마스크 입력 방법

LoadImage 노드에서 우클릭 → **Open in MaskEditor** 로 마스크 영역을 직접 그립니다.

### KSampler 권장 설정

| 파라미터 | Qwen 공식 | 일반 권장 | 4steps LoRA |
|---------|-----------|---------|-------------|
| Steps | 50 | 20 | 4 |
| CFG | 4.0 | 2.5 | 1.0 |
| Sampler | euler | euler | euler |

### 실습

[[download: downloads/session3/inpaint/qwen_inpaint.json | Qwen Inpaint 워크플로우 다운로드]]

[[download: downloads/session3/inpaint/inpaint_upload.png | 실습용 이미지 다운로드]]

워크플로우와 이미지를 다운받은 후, LoadImage에 실습 이미지를 업로드합니다.
MaskEditor에서 수정할 영역을 칠한 다음 Positive Prompt를 입력하고 실행하세요.

### 이미지 미리보기

[[image: inpaint_upload.png | width:50%]]

---

## 실습 3 - Qwen Outpaint

아웃페인팅은 인페인팅의 반대 방향입니다. 이미지의 캔버스를 확장하고, 빈 영역에 새로운 내용을 자연스럽게 생성합니다.

### Inpainting vs Outpainting

| 구분 | Inpainting | Outpainting |
|------|-----------|------------|
| 방향 | 이미지 내부 수정 | 이미지 외부 확장 |
| 마스크 위치 | 이미지 안쪽 | 이미지 바깥쪽 (패딩 영역) |
| 핵심 노드 | InpaintModelConditioning | ImagePadForOutpaint |

### 워크플로우 구조

```
LoadImage → ImagePadForOutpaint (캔버스 확장)
    ├── 확장된 IMAGE → VAEEncode
    └── 자동 생성된 MASK → [마스크 블러 노드]
                              ├── ControlNetInpaintingAliMamaApply
                              └── SetLatentNoiseMask

UNETLoader → ModelSamplingAuraFlow → LoraLoaderModelOnly → KSampler
CLIPLoader → CLIPTextEncode (Positive / Negative)
VAELoader → VAEDecode → SaveImage
```

### 핵심 노드 설명

**ImagePadForOutpaint**
이미지 사방에 빈 영역(패딩)을 추가하고, 추가된 영역에 대한 마스크를 자동 생성합니다.

```settings
left / right / top / bottom: 각 방향으로 확장할 픽셀 수
feathering: 원본 이미지 경계의 페더링 강도 (0 = 경계 선명)
```

이 워크플로우는 상하좌우 각 400px씩 확장하도록 설정되어 있습니다.
원하는 방향만 값을 넣고, 나머지는 0으로 설정하면 한쪽 방향만 확장할 수 있습니다.

### 실습

[[download: downloads/session3/inpaint/qwen_outpaint.json | Qwen Outpaint 워크플로우 다운로드]]

[[download: downloads/session3/inpaint/outpaint_coffee.png | 아웃페인팅 실습 이미지 다운로드]]

워크플로우와 커피 이미지를 다운받은 후, LoadImage에 커피 이미지를 업로드합니다.
ImagePadForOutpaint에서 확장 방향과 픽셀 값을 조정한 다음 실행하세요.

### 이미지 미리보기

[[image: outpaint_coffee.png | width:50%]]
