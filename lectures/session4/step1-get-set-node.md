# Get/Set 노드와 워크플로우 정리 기법

## 학습 목표

복잡한 워크플로우를 깔끔하게 정리하는 고급 기법을 익힙니다.

---

## 템플릿 다운로드

아래 고급 기법이 적용된 템플릿을 다운로드하세요.

[[download: downloads/session4/step1/get_set_adv.json | Get/Set 고급 기법 템플릿 다운로드]]

---section---

## 1. Get/Set 노드란?

복잡한 워크플로우에서 노드들을 연결하다 보면 화면이 연결선으로 가득 차서 보기 어려워집니다. **Get/Set 노드**는 이런 문제를 해결해주는 KJNodes의 기능으로, 연결선 없이 데이터를 전달할 수 있게 해줍니다.

**ComfyCloud에서는 KJNodes가 기본으로 포함**되어 있습니다.

### 기본 개념

- **Set 노드**: 데이터를 전역 변수에 저장
- **Get 노드**: 저장된 데이터를 가져와서 사용
- **변수명**: Set과 Get을 연결하는 이름

### 왜 사용하나요?

**기존 방식의 문제:**
```
[노드 A] ────────────────────────────> [노드 B]
           (긴 연결선이 화면 가로지름)
```

**Get/Set 방식:**
```
[노드 A] → [Set: output_image]

[Get: output_image] → [노드 B]
        (연결선 없이 깔끔)
```

### 사용 방법

1. 우클릭 → 노드 추가 → KJNodes → `SetNode` 추가
2. Set 노드의 **변수명** 필드에 이름 입력 (예: `base_pipe`)
3. 같은 이름으로 `GetNode` 추가
4. Set 노드에 데이터 연결 → Get 노드에서 꺼내어 사용

---section---

## 2. ToBasicPipe / FromBasicPipe 노드

**ComfyCloud에서는 Impact-Pack 커스텀 노드가 기본으로 포함**되어 있습니다.

### 역할

여러 매개변수를 하나의 파이프로 묶어서 전달하는 노드입니다.

**ToBasicPipe 입력:**
- model
- clip
- vae
- positive (conditioning)
- negative (conditioning)

**ToBasicPipe 출력:**
- basic_pipe (하나로 묶인 데이터)

### 사용 예시

**복잡한 방식:**
```
[Checkpoint Loader] → model → [KSampler]
                    → clip → [CLIP Text Encode]
                    → vae → [VAE Decode]
```

**파이프 + Get/Set 방식:**
```
[Checkpoint Loader] + [CLIP Text Encode]
  → [ToBasicPipe]
  → [Set: base_pipe]

[Get: base_pipe]
  → [FromBasicPipe]
  → model → [KSampler]
  → vae → [VAE Decode]
```

연결선이 대폭 줄어들고, 워크플로우의 흐름이 명확해집니다.

---section---

## 3. SDXLResolution 노드

**ComfyCloud에서는 ComfyMath 커스텀 노드가 기본으로 포함**되어 있습니다.

### 역할 및 기능

SDXL 모델은 권장 해상도(가로세로 픽셀 비율)가 정해져 있습니다. 이 값들을 외우기 어렵기 때문에, SDXLResolution 노드는 9가지 권장 해상도 중 선택하여 width와 height로 출력해줍니다.

### 권장 해상도 목록

| 비율 | Width | Height |
|------|-------|--------|
| 1:1  | 1024  | 1024   |
| 4:3  | 1152  | 896    |
| 3:4  | 896   | 1152   |
| 16:9 | 1344  | 768    |
| 9:16 | 768   | 1344   |
| 21:9 | 1536  | 640    |
| 3:2  | 1216  | 832    |
| 2:3  | 832   | 1216   |

### 사용 방법

1. SDXLResolution 노드 추가
2. 드롭다운에서 원하는 비율 선택
3. width, height 출력을 Empty Latent Image 노드에 연결

---section---

## 4. 서브그래프(Group Node) 생성 및 진입

ComfyUI에서 여러 노드를 하나의 그룹 노드로 변환하면, 그 안으로 직접 들어가서 편집할 수 있습니다. 이를 **서브그래프**라고 합니다.

### 서브그래프 생성 방법

**1단계: 노드 선택**
- **Ctrl** 키를 누른 채로 드래그하여 묶을 노드들을 선택
- 또는 여러 노드를 Ctrl + 클릭으로 개별 선택

**2단계: 그룹 노드로 변환**
- 선택된 노드 위에 뜨는 토글의 오른쪽 **...** 클릭
- **"그룹 노드로 변환"** 클릭

**결과:**
- 여러 노드가 하나의 그룹 노드(서브그래프)로 합쳐짐
- 외부에서는 input/output 핀만 노출
- 내부 구조는 숨겨져 워크플로우가 깔끔해짐

### 서브그래프 진입 방법

생성된 그룹 노드를 **더블클릭**하면 서브그래프 내부로 진입합니다.

- 내부에서 각 노드를 자유롭게 편집 가능
- 상단의 **뒤로가기(← 화살표)** 또는 **Escape** 키로 상위 워크플로우로 복귀

### 주의사항

- input/output/매개변수 이름이 겹치면 에러 발생 가능
- 기능이 혼합될 경우 문제가 생길 수 있음
- **복잡한 노드끼리는 그룹화하지 않는 것을 권장**
- 자주 함께 사용되는 단순한 노드 조합에 활용

### 활용 예시

**KSampler + 빈 잠재 이미지 묶기:**
```
[서브그래프: Sampling]
  ├── Empty Latent Image
  └── KSampler
      → (latent 출력)
```

외부에서는 해상도/스텝/cfg 값만 입력하면 되므로 메인 워크플로우가 훨씬 간결해집니다.
