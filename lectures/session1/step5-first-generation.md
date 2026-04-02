# 첫 이미지 생성 (기본 템플릿)

[[image: running_home.png]]

---section---

## Default 템플릿으로 첫 이미지 생성하기

ComfyUI를 처음 실행하면 기본 워크플로우(Default Template)가 이미 로드되어 있습니다.
별도로 템플릿을 불러올 필요 없이 바로 이미지 생성을 시작할 수 있습니다.

### 기본 상태 그대로 실행하기

1. 화면에 표시된 기본 노드 구성을 확인하세요
2. 프롬프트를 수정하지 않고 현재 상태 그대로 유지합니다
3. 우측 하단의 **"Queue Prompt"** 버튼을 클릭하여 생성을 시작하세요

이렇게 기본 설정만으로도 첫 이미지 생성이 가능합니다!

---section---

## 기본 워크플로우 구조 이해

### 필수 노드들

기본 이미지 생성에 필요한 핵심 노드들:

```settings
1. Load Checkpoint: 모델 로드
2. CLIP Text Encode (긍정): 긍정 프롬프트
3. CLIP Text Encode (부정): 부정 프롬프트  
4. Empty Latent Image: 이미지 크기 설정
5. KSampler: 이미지 생성 엔진
6. VAE Decode: 디코딩
7. Save Image: 이미지 저장
```

### 노드 연결 흐름

데이터가 흐르는 순서를 이해하는 것이 중요합니다:

1. **Load Checkpoint** → 모델, CLIP, VAE 출력
2. **CLIP** → 긍정/부정 Text Encode 노드로 연결
3. **Text Encode** → KSampler의 조건 입력으로 연결
4. **Empty Latent** → KSampler의 latent 입력으로 연결
5. **KSampler** → VAE Decode로 연결
6. **VAE Decode** → Save Image로 연결

---section---

## 각 노드 상세 설명

### Load Checkpoint 노드

체크포인트 모델을 로드하는 노드입니다.

```settings
입력: 없음
출력: 
  - MODEL: 생성 모델
  - CLIP: 텍스트 인코더
  - VAE: 이미지 디코더
```

모델이 없다는 오류가 나타나면:
1. 드롭다운 클릭
2. "dreamshaper_8" 선택
3. 또는 사용 가능한 다른 모델 선택

### CLIP Text Encode 노드

프롬프트를 AI가 이해할 수 있는 형태로 변환합니다.

#### 긍정 프롬프트 (Positive)
원하는 요소들을 설명합니다:

```prompt
masterpiece, best quality, ultra-detailed,
beautiful landscape, mountains, sunset,
golden hour lighting, photorealistic
```

#### 부정 프롬프트 (Negative)
원하지 않는 요소들을 명시합니다:

```negative
worst quality, low quality, blurry,
bad anatomy, watermark, text
```

### Empty Latent Image 노드

생성할 이미지의 기본 설정을 정의합니다:

```settings
Width: 512 (이미지 너비)
Height: 512 (이미지 높이)
Batch Size: 1 (생성할 이미지 수)
```

**주의**: 크기가 클수록 생성 시간과 VRAM 사용량이 증가합니다.

### KSampler 노드

실제 이미지 생성을 담당하는 핵심 노드입니다:

```settings
Seed: -1 (랜덤, 특정 숫자로 고정 가능)
Control After Generate: randomize
Steps: 20 (생성 단계)
CFG: 7 (프롬프트 강도)
Sampler Name: dpm++ 2m karras
Scheduler: normal
Denoise: 1.0
```

### VAE Decode 노드

latent 이미지를 실제 이미지로 변환합니다.  
체크포인트에서 자동으로 VAE를 가져옵니다.

### Save Image 노드

생성된 이미지를 저장합니다:

```settings
파일명 접두사: ComfyUI
저장 위치: outputs/
```

#### 파일명 자동 지정 설정

이미지를 생성할 때마다 고유한 파일명을 자동으로 지정할 수 있습니다.

**파일명 접두사 변경**:
```filename
seed-%KSampler.seed%
```

이 설정을 사용하면:
- **seed-%KSampler.seed%**: 사용된 시드값을 파일명에 포함

**결과 예시**:
```filename
seed-123456789.png
```

---section---

## Step 4: 생성 실행

모든 설정이 완료되었다면 이제 이미지를 생성해봅시다.

### 생성 시작하기

1. 우측 하단의 **"Queue Prompt"** 버튼 클릭
2. 진행 상황이 화면에 표시됩니다
3. 완료되면 생성된 이미지가 노드에 표시됩니다

### 생성 완료

이미지가 성공적으로 생성되면:
- Save Image 노드에서 이미지 확인 가능
- outputs/ 폴더에 자동 저장
- 설정한 파일명으로 저장됨

---

**다음 강의**: Step 5에서는 체크포인트 모델의 종류와 특성을 알아봅니다.