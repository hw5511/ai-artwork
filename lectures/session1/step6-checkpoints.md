# 체크포인트 모델 탐험

[[image: checkpoint.PNG]]

## 체크포인트 모델이란?

체크포인트 모델은 대량의 이미지로 학습된 AI 모델 파일입니다.  
각 모델은 특정 스타일이나 주제에 특화되어 있습니다.

### 모델의 구성 요소
- **학습 데이터**: 모델이 학습한 이미지들
- **가중치**: 학습된 패턴과 특징들
- **스타일**: 모델이 생성하는 이미지의 특성

---section---

## 모델 교체 실습

서로 다른 Stable Diffusion 모델을 비교하며 각 모델의 특성을 이해해봅시다.

### 1. 기본 이미지 생성 템플릿

먼저 SD 1.5 모델로 기본 이미지를 생성합니다.

#### 단계별 실습
1. **템플릿 선택**: "Image Generation" 선택
2. **체크포인트 모델 선택**: `Comfy-Org/stable-diffusion-v1-5-archive - v1-5-pruned-emaonly-fp16` 선택
3. **프롬프트 입력**:
```prompt
a cute fluffy cat sitting in a garden, warm sunlight,
professional photography, detailed fur texture
```
4. **이미지 생성**: Queue Prompt 버튼 클릭

---

### 2. SDXL 테스트

이제 고해상도 모델인 SDXL로 동일한 이미지를 생성해봅시다.

#### 단계별 실습
1. **체크포인트 모델 변경**: Load Checkpoint 노드에서 `stabilityai/stable-diffusion-xl-base-1.0 - sd_xl_base_1.0` 선택
2. **빈 잠재이미지 크기 변경**: Empty Latent Image 노드에서 Width와 Height를 모두 `1024`로 설정
3. **프롬프트 입력**:
```prompt
a cute fluffy cat sitting in a garden, warm sunlight,
professional photography, detailed fur texture
```
4. **이미지 생성**: Queue Prompt 버튼 클릭

SD 1.5와 SDXL의 품질 차이를 비교해보세요.

---section---

## 모델별 학습된 이미지 크기에 따른 차이

<div style="display: flex; gap: 24px; margin: 16px 0;">
  <div style="flex: 1; border-right: 2px solid #e5e7eb; padding-right: 24px;">
    <h4 style="text-align: center; margin-bottom: 12px;">SD 1.5</h4>
    <div style="display: flex; gap: 12px;">
      <figure style="flex: 1; text-align: center; margin: 0;">
        <img src="./lectures/images/sd15_512.png" style="width: 100%;" alt="SD 1.5 512px" />
        <figcaption style="font-size: 0.85em; color: #6b7280; margin-top: 4px;">512×512 생성</figcaption>
      </figure>
      <figure style="flex: 1; text-align: center; margin: 0;">
        <img src="./lectures/images/sd15_1024.png" style="width: 100%;" alt="SD 1.5 1024px" />
        <figcaption style="font-size: 0.85em; color: #6b7280; margin-top: 4px;">1024×1024 생성 (비정상)</figcaption>
      </figure>
    </div>
  </div>
  <div style="flex: 1;">
    <h4 style="text-align: center; margin-bottom: 12px;">SDXL</h4>
    <div style="display: flex; gap: 12px;">
      <figure style="flex: 1; text-align: center; margin: 0;">
        <img src="./lectures/images/sdxl_512.png" style="width: 100%;" alt="SDXL 512px" />
        <figcaption style="font-size: 0.85em; color: #6b7280; margin-top: 4px;">512×512 생성 (어색)</figcaption>
      </figure>
      <figure style="flex: 1; text-align: center; margin: 0;">
        <img src="./lectures/images/sdxl_1024.png" style="width: 100%;" alt="SDXL 1024px" />
        <figcaption style="font-size: 0.85em; color: #6b7280; margin-top: 4px;">1024×1024 생성</figcaption>
      </figure>
    </div>
  </div>
</div>

각 모델은 특정 해상도의 이미지로 학습되었기 때문에, 학습 해상도와 다른 크기로 생성 시 결과물에 차이가 나타납니다.

**SD 1.5 (학습 해상도: 512x512)**
- 512 사이즈에서 안정적인 결과물을 생성합니다.
- SD 1.5는 512 이미지 위주로 학습되었기에, 1024 사이즈의 빈 잠재이미지에서 개체가 여러 개가 생기거나 기괴하게 연결되는 현상이 발생합니다.

**SDXL (학습 해상도: 1024x1024)**
- 1024 사이즈에서 세밀하고 풍부한 디테일의 이미지를 생성합니다.
- 반대로 512 사이즈에서는 세부 표현이 뭉개지거나 구도가 어색해질 수 있습니다.

> 모델 선택 시 해당 모델의 학습 해상도에 맞는 Empty Latent Image 크기를 설정하는 것이 중요합니다.

---section---

## Illustrious-XL 모델 실습

### 파인튜닝(Fine-tuning)이란?

**Illustrious-XL**을 이해하려면 먼저 파인튜닝 개념을 알아야 합니다.

파인튜닝이란 이미 학습된 대형 모델(베이스 모델)을 특정 목적에 맞게 **추가 학습**시키는 기법입니다.

```settings
베이스 모델 (SDXL)
  └─ 수백만 장의 이미지로 학습된 범용 모델
     └─ 파인튜닝
        ├─ 애니메이션 이미지 위주 추가 학습 → Illustrious-XL
        ├─ 사진 리얼리즘 위주 추가 학습 → RealVisXL
        └─ 특정 작가 스타일 학습 → 스타일 특화 모델
```

베이스 모델의 방대한 지식은 그대로 유지하면서, 특정 도메인의 표현력을 강화할 수 있습니다.
Civitai 등 커뮤니티에서 배포되는 대부분의 체크포인트가 이 파인튜닝 방식으로 제작됩니다.

---

### Illustrious-XL 모델 정보

- **베이스 모델**: SDXL (Stable Diffusion XL)
- **파인튜닝 방향**: 애니메이션 및 일러스트레이션 특화 학습
- **권장 해상도**: 1024x1024
- **특징**: 선명한 선화, 풍부한 채색, 다양한 애니메이션 스타일 표현

Illustrious-XL은 SDXL을 기반으로 대량의 애니메이션/일러스트 이미지로 파인튜닝된 모델입니다.
ComfyCloud에 내장되어 있어 별도 다운로드 없이 바로 사용할 수 있습니다.

#### Illustrious-XL 실습

1. **모델 라이브러리 열기**: 좌측 사이드바에서 모델(책 모양) 아이콘 클릭
2. **Checkpoints 카테고리** 선택 → **Illustrious-XL** 찾기
3. **"사용" 버튼** 클릭 → Load Checkpoint 노드에 자동 적용
4. **Empty Latent Image** 노드에서 Width와 Height를 `1024`로 설정
5. **프롬프트 입력**:
```prompt
1girl, anime style, long hair, blue eyes, school uniform,
detailed illustration, soft lighting, masterpiece
```
6. **Queue Prompt** 버튼 클릭하여 생성

---section---

### WAI-illustrious-SDXL 워크플로우 실습

**WAI-illustrious-SDXL**은 Illustrious-XL을 한 단계 더 파인튜닝한 모델입니다.
동일한 SDXL 계열이지만 색감과 묘사 방식이 다르게 특화되어 있습니다.

아래 파일을 다운로드하여 워크플로우를 불러올 수 있습니다.
이미지 파일에 워크플로우 정보가 내장되어 있습니다.

[[image: wai_illustrous.png]]

[[download: downloads/session1/wai_illustrous.json | WAI-illustrious 워크플로우 다운로드 (.json)]]
[[download: images/wai_illustrous.png | WAI-illustrious 워크플로우 이미지 다운로드 (.png)]]

#### 불러오기 방법

**방법 1 - JSON 파일**:
1. 위 `.json` 파일 다운로드
2. ComfyUI 로고 클릭 → **file → 불러오기** 선택
3. 다운로드한 JSON 파일 선택

**방법 2 - PNG 이미지 (워크플로우 내장)**:
1. 위 `.png` 이미지 파일 다운로드
2. ComfyUI 작업 공간에 PNG 파일을 **드래그 앤 드롭**
3. 워크플로우가 자동으로 로드됨

```prompt
1girl, anime style, long hair, blue eyes, school uniform,
detailed illustration, soft lighting, masterpiece
```

두 모델(Illustrious-XL vs WAI-illustrious-SDXL)의 화풍과 세부 표현 방식의 차이를 관찰해봅시다.