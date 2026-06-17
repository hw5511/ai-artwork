# Canny와 Depth ControlNet

## Canny ControlNet 이해

Canny는 이미지의 엣지(윤곽선)를 검출하여 정확한 형태를 유지하는 ControlNet입니다.  
건축물, 제품 디자인, 정밀한 형태 재현에 탁월합니다.

### Canny의 특징
- 샤프한 엣지 검출
- 디테일한 윤곽선 보존
- 구조적 정확성
- 스타일 변환에 최적

### Canny Edge Detection 원리
```settings
1. 가우시안 블러로 노이즈 제거
2. 그래디언트 계산으로 엣지 강도 측정
3. Non-maximum suppression
4. Double threshold로 엣지 확정
```

## Depth ControlNet 이해

Depth는 이미지의 깊이 정보를 활용하여 3D 공간감을 유지합니다.  
풍경, 인테리어, 공간 구성에 강력합니다.

### Depth의 특징
- 원근감 보존
- 공간 관계 유지
- 전경/배경 분리
- 3D 구조 재현

### Depth Map 생성 방식
```settings
MiDaS: 모노큘러 깊이 추정
DPT: 트랜스포머 기반
ZoeDepth: 메트릭 깊이
LeReS: 고해상도 깊이
```

---

## Canny 실습

이제 Canny ControlNet을 사용하여 이미지의 윤곽선을 유지하면서 다양한 스타일로 변환해봅시다.

### 1단계: 워크플로우 및 이미지 다운로드

[[download: downloads/session2/canny/canny_workflow.json | Canny 워크플로우 다운로드]]

**실습용 이미지 미리보기**:

[[image: canny_girl.png | width:50%]]

### 2단계: 워크플로우 열기

1. **워크플로우 열기**: 다운로드한 `canny_workflow.json` 파일을 ComfyUI에서 열기
   - ComfyUI 로고 클릭 → **file → 불러오기** → 다운로드한 JSON 파일 선택

### 3단계: 이미지 업로드 및 생성

#### 이미지 업로드 및 기본 생성
1. **이미지 로드 노드**에 위의 이미지(`canny_girl.png`)를 우클릭하여 다운로드 후 업로드
2. **이미지 생성 실행**: Queue Prompt 버튼 클릭

#### Threshold 값 조정 실습
Threshold 값을 변경하면서 엣지 검출이 어떻게 달라지는지 확인합니다:

- **Low Threshold 낮게 (50-100)**: 더 많은 디테일과 세밀한 엣지 포함
- **High Threshold 높게 (150-200)**: 주요 윤곽선만 강하게 검출

각 설정으로 생성을 실행하며 결과를 비교해보세요.

#### 프롬프트 변경 실습
다양한 프롬프트로 스타일을 변경해봅니다:

**예시 프롬프트**:
```prompt
anime style, vibrant colors, detailed illustration
```

```prompt
oil painting style, impressionist, soft brushstrokes
```

```prompt
cyberpunk style, neon lights, futuristic atmosphere
```

### 4단계: 자유 실습

다양한 레퍼런스 이미지와 프롬프트를 활용하여 자유롭게 실습해보세요!

**실습 팁**:
- 윤곽선이 명확한 이미지일수록 좋은 결과가 나옵니다
- Threshold 값을 조정하며 원하는 디테일 수준을 찾아보세요
- ControlNet Strength를 조정하여 원본 구조 유지 정도를 조절할 수 있습니다

---

## Depth 실습

이제 Depth ControlNet을 사용하여 이미지의 깊이 정보를 유지하면서 공간감을 살린 이미지를 생성해봅시다.

### 1단계: 워크플로우 및 이미지 다운로드

[[download: downloads/session2/depth/depth_controlnet.json | Depth 워크플로우 다운로드]]

**이미지 미리보기**:

[[image: building.webp | width:50% | row]]
[[image: inner.jpg | width:50% | row]]

### 2단계: 워크플로우 열기

1. **워크플로우 열기**: 다운로드한 `depth_controlnet.json` 파일을 ComfyUI에서 열기
   - ComfyUI 로고 클릭 → **file → 불러오기** → 다운로드한 JSON 파일 선택

### 3단계: building.webp 실습

#### 건축물 이미지 실습
1. **이미지 로드 노드**에 `building.webp` 업로드
2. **이미지 생성 실행**: Queue Prompt 버튼 클릭

건축물의 깊이 정보가 유지되면서 스타일이 변환되는 것을 확인할 수 있습니다.

#### 다양한 스타일 프롬프트 적용

**Steampunk 스타일**:
```prompt
steampunk architecture, brass and copper, mechanical gears,
Victorian era, industrial design, vintage machinery
```

**Futuristic 스타일**:
```prompt
futuristic building, glass and metal, holographic elements,
sci-fi architecture, neon lights, cyberpunk city
```

**Wood 스타일**:
```prompt
wooden structure, traditional timber architecture,
natural materials, rustic design, forest cabin style
```

각 프롬프트로 생성을 실행하고 결과를 비교해보세요.

### 4단계: inner.jpg 애니메이션 스타일 실습

인테리어 이미지를 애니메이션 스타일로 변환해봅시다.

#### 이미지 업로드
1. **이미지 로드 노드**에 `inner.jpg` 업로드
2. 워크플로우에 **SD3.5 Large** 모델(`sd3.5_large_fp8_scaled.safetensors`)이 이미 설정되어 있습니다

#### 프롬프트 설정

**긍정 프롬프트** (Positive Prompt):
```prompt
anime style interior, cozy room, warm lighting, detailed furniture, soft colors, high quality illustration, masterpiece
```

**부정 프롬프트** (Negative Prompt):
```prompt
(low quality, blurry, realistic, deformed, extra limbs, text, watermark, sketch)
```

3. **이미지 생성 실행**: Queue Prompt 버튼 클릭

공간의 깊이감을 유지하면서 애니메이션 스타일의 인테리어가 생성되는 것을 확인할 수 있습니다.

### 5단계: 자유 실습

다양한 이미지와 프롬프트를 활용하여 Depth ControlNet을 자유롭게 탐구해보세요!

---

## Canny vs Depth 비교

### 언제 Canny를 사용할까?
```settings
✓ 정확한 윤곽선 필요
✓ 건축물, 기계 디자인
✓ 선화 스타일 변환
✓ 텍스트나 로고 보존
```

### 언제 Depth를 사용할까?
```settings
✓ 공간감 중요
✓ 풍경, 인테리어
✓ 전경/배경 분리
✓ 3D 느낌 유지
```

---

## 고급 Canny 테크닉

### Soft Edge 효과
부드러운 엣지를 위한 설정:
```settings
low_threshold: 30
high_threshold: 100
blur_radius: 2
```

### Multi-Scale Canny
다양한 스케일의 엣지 조합:
1. 저해상도 엣지 (큰 구조)
2. 고해상도 엣지 (세부사항)
3. 두 결과 병합

### Selective Edge
특정 영역만 엣지 적용:
```settings
mask_area: true
edge_region: foreground_only
preserve_background: true
```

## 고급 Depth 테크닉

### Depth 편집
깊이맵 수동 조정:
1. Depth Editor 노드 사용
2. 브러시로 깊이값 수정
3. 전경/배경 관계 조정

### Depth 강조
```settings
depth_multiplier: 1.5 (깊이 과장)
near_clip: 0.1 (가까운 객체)
far_clip: 100 (먼 객체)
```

### Atmospheric Perspective
거리에 따른 대기 효과:
```prompt
distant mountains with fog,
atmospheric haze, depth layers
```

---

## Canny + Depth 조합

### 듀얼 ControlNet 설정
두 ControlNet 동시 사용:
```settings
Canny strength: 0.6
Depth strength: 0.4
Total influence: 1.0
```

### 조합 장점
- Canny: 정확한 형태
- Depth: 올바른 공간감
- 결과: 완벽한 구조 재현

### 실습 예제
건물 내부 변환:
1. Canny로 구조 유지
2. Depth로 공간감 보존
3. 스타일만 변경

---

## 실전 프로젝트

### 프로젝트 1: 도시 재구성
현대 도시 → SF 도시:

```settings
Canny: 건물 윤곽 유지
Depth: 거리감 보존
Prompt: futuristic cityscape, flying cars
```

### 프로젝트 2: 캐릭터 의상 변경
인물 사진 → 판타지 캐릭터:

```settings
Canny: 포즈와 형태 유지
Prompt: medieval armor, fantasy warrior
Strength: 0.7
```

### 프로젝트 3: 자연 풍경 변환
숲 → 외계 정글:

```settings
Depth: 나무들의 깊이 유지
Prompt: alien jungle, bioluminescent flora
```

---

## 전처리 최적화

### Canny 전처리 팁
```python
# 이미지 선명도 증가
sharpen_kernel = np.array([[0,-1,0],
                           [-1,5,-1],
                           [0,-1,0]])
```

### Depth 전처리 팁
- 고대비 이미지 사용
- 명확한 전경/배경 분리
- 균일한 조명 선호

---

## 문제 해결

### Canny 엣지가 너무 복잡할 때
- Threshold 값 증가
- 가우시안 블러 적용
- Simplify edges 옵션

### Depth가 부정확할 때
- 다른 depth 모델 시도
- Manual depth painting
- Multiple depth maps 평균

### 결과가 원본과 너무 다를 때
- ControlNet strength 증가
- 프롬프트 조정
- Denoising 감소

---

## 스타일별 설정 가이드

### 애니메이션 스타일
```settings
Canny: low_threshold: 100
Depth: 사용 안 함
Prompt: anime style, cel shading
```

### 포토리얼리스틱
```settings
Canny: 사용 안 함
Depth: strength: 0.8
Prompt: photorealistic, 8k detail
```

### 아트 스타일
```settings
Canny: strength: 0.5
Depth: strength: 0.5
Prompt: oil painting, impressionist
```

---

## 실습 과제

### 기초 실습
1. 건물 사진으로 Canny 엣지 추출
2. 풍경 사진으로 Depth map 생성
3. 각각 3가지 다른 스타일 적용

### 응용 실습
1. Canny + Depth 동시 사용
2. Threshold 값 비교 (50, 100, 200)
3. Depth 모델 비교 (MiDaS vs DPT)

### 창작 프로젝트
포토 시리즈 제작:
1. 하나의 원본 사진
2. Canny로 5가지 스타일 변환
3. Depth로 5가지 공간 변환
4. 최고 조합 선정

---

## 전문가 팁

### 엣지 품질 향상
```settings
Pre-process: denoise → sharpen
Canny: adaptive threshold
Post-process: edge smoothing
```

### 깊이 정확도 향상
```settings
Multi-model ensemble
Depth refinement network
Manual correction layer
```

### 렌더링 최적화
- Batch processing
- Resolution stepping
- Cache preprocessed data