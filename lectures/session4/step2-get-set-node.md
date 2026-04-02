# Get/Set 노드와 워크플로우 정리 기법

## 학습 목표

복잡한 워크플로우를 깔끔하게 정리하는 다양한 고급 기법을 익힙니다.

---

## 템플릿 다운로드

아래 고급 기법이 적용된 템플릿을 다운로드하세요.

[[download: downloads/session4/get_set_advanced.json | Get/Set 고급 기법 템플릿 다운로드]]

---

## 1. Get/Set 노드란?

복잡한 워크플로우에서 노드들을 연결하다 보면 화면이 연결선으로 가득 차서 보기 어려워집니다. **Get/Set 노드**는 이런 문제를 해결해주는 KJNodes의 기능으로, 연결선 없이 데이터를 전달할 수 있게 해줍니다.

**RunDiffusion에서는 KJNodes가 기본으로 설치**되어 있습니다.

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

---

## 2. ToBasicPipe / FromBasicPipe 노드

**RunDiffusion에서는 Impact-Pack 커스텀 노드가 기본으로 설치**되어 있습니다.

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

**파이프 방식:**
```
[Checkpoint Loader] + [CLIP Text Encode]
  → [ToBasicPipe]
  → [Set: base_pipe]

[Get: base_pipe]
  → [FromBasicPipe]
  → [KSampler]
```

---

## 3. SDXLResolution 노드

**RunDiffusion에서는 ComfyMath 커스텀 노드가 기본으로 설치**되어 있습니다.

### 역할 및 기능

SDXL 모델은 권장 해상도(가로세로 픽셀 비율)가 정해져 있습니다. 이 값들을 외우기 어렵기 때문에, SDXLResolution 노드는 9가지 권장 해상도 중 선택하여 width와 height로 출력해줍니다.

### 사용 방법

1. SDXLResolution 노드 추가
2. 드롭다운에서 원하는 비율 선택 (1:1, 16:9, 9:16 등)
3. width, height 출력을 Empty Latent Image 노드에 연결

---

## 4. 노드 그룹화 기법

ComfyUI 자체 기능으로 여러 노드를 하나의 그룹으로 변환할 수 있습니다.

### 그룹화 방법

**1단계: 노드 선택**
- **Ctrl** 키를 누른 채로 드래그
- 또는 여러 노드를 Ctrl + 클릭으로 개별 선택

**2단계: 그룹 노드로 변환**
- 선택된 노드 위에 뜨는 토글의 오른쪽 **...** 클릭
- **"그룹 노드로 변환"** 버튼 클릭

**결과:**
- 노드들의 input, output, 매개변수 리스트가 하나로 합쳐짐
- 화면이 깔끔하게 정리됨

### 주의사항

**그룹화 시 주의할 점:**
- input/output/매개변수 이름이 겹치면 에러 발생 가능
- 기능이 혼합될 경우 문제가 생길 수 있음
- **복잡한 노드끼리는 그룹화하지 않는 것을 권장**
- 화면 정리가 꼭 필요한 경우에만 사용

**예시: KSampler + 빈 잠재 이미지 노드 그룹화**
- 간단한 노드 조합이므로 그룹화 적합
- 자주 함께 사용되는 노드끼리 묶기

---

## 5. 노드 프레임 만들기

노드를 시각적으로 구분하는 프레임 기능입니다.

### 프레임 만들기

**1단계: 노드 선택**
- **Ctrl** 키를 누른 채로 드래그
- 또는 여러 노드를 Ctrl + 클릭으로 개별 선택

**2단계: 프레임 생성**
- 선택된 노드 위에 뜨는 토글의 **우물정(井) 아이콘** 클릭
- 노드들이 프레임으로 묶임

**3단계: 프레임 활용**
- 프레임의 **제목 부분을 드래그**하면 프레임 안의 노드들이 **함께 이동**
- 프레임 제목을 수정하여 구역 이름 지정 가능
