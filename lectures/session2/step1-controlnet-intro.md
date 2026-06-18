# ControlNet이란?

[[image: session2/step2/controlnet.png]]

## ControlNet 개념 이해

ControlNet은 Stable Diffusion의 이미지 생성 과정에 **추가 조건을 부여**하여 정밀한 제어를 가능하게 만드는 신경망 구조입니다.

### 왜 ControlNet이 필요한가?

기존 Stable Diffusion은 텍스트 프롬프트만으로 이미지를 생성하기 때문에:
- 원하는 구도를 정확히 만들기 어려움
- 특정 포즈나 형태를 지정하기 힘듦
- 결과물의 일관성 유지가 어려움

ControlNet은 이러한 문제를 **시각적 가이드**를 통해 해결합니다.

---

## ControlNet 작동 원리

### 핵심 메커니즘

```settings
원본 모델 가중치: 잠금 상태로 보존
ControlNet 가중치: 학습 가능한 복사본
Zero Convolution: 두 가중치를 연결하는 특수 레이어
```

**Zero Convolution**은 초기값이 0으로 설정되어, 학습 과정에서 점진적으로 최적값으로 진화합니다. 이를 통해 원본 Stable Diffusion 모델은 그대로 유지되면서도 새로운 조건을 학습할 수 있습니다.

### 입력 처리 방식

```settings
텍스트 프롬프트 + 추가 조건 이미지 = 정밀한 이미지 생성
```

추가 조건은 다양한 형태로 제공됩니다:
- Edge maps (엣지 맵)
- Human poses (인체 포즈)
- Depth maps (깊이 맵)
- Segmentation masks (세그멘테이션 마스크)
- Hand-drawn sketches (손그림 스케치)

---

## 주요 ControlNet 유형 비교

### 1. Canny
```settings
특징: 샤프한 엣지 검출
용도: 세밀한 윤곽선 유지, 건축/제품 디자인
강점: 디테일한 형태 보존
```

### 2. Depth
```settings
특징: 3D 공간 깊이 정보
용도: 풍경, 인테리어, 원근감 중요한 이미지
강점: 전경/배경 관계 유지
```

### 3. OpenPose
```settings
특징: 인체 골격 감지
용도: 캐릭터 포즈 제어
강점: 손, 다리, 머리 위치 정확한 재현
```

### 4. Scribble
```settings
특징: 손그림 스케치 인식
용도: 간단한 낙서를 완성된 이미지로
강점: 빠른 아이디어 시각화
```

---

## ControlNet 선택 가이드

### 전체 이미지 변환이 필요할 때
- **Depth**: 배경 대대적 변경
- **OpenPose**: 완전히 새로운 포즈 생성

### 세부 요소만 수정할 때
- **Canny**: 디테일 추가, 특정 요소 개선
- **Scribble**: 부분적인 수정과 조정

### 복합 사용
여러 ControlNet을 동시에 사용하여 더 정밀한 제어가 가능합니다:

```settings
OpenPose + Canny: 포즈 고정 + 엣지 디테일
Depth + Scribble: 공간감 유지 + 스케치 적용
```

---

## ControlNet 모델 최신 동향 (2024-2025)

### Stable Diffusion 3.5 Large ControlNet
StabilityAI가 공식 출시한 최신 ControlNet 모델:

```settings
지원 타입: Blur, Canny, Depth
학습 데이터: 합성 데이터 기반
특징: 고해상도 이미지 생성 지원
```

### 버전별 지원
```settings
SD 1.5: 가장 많은 ControlNet 모델 보유
SDXL: 고해상도 전용 모델
SD 3.5: 최신 기술 적용
```

---

## 실습: Scribble ControlNet으로 거북이 그리기

### 학습 목표
간단한 스케치 이미지를 사용하여 ControlNet의 작동 원리와 매개변수 조정 방법을 익힙니다.

### 준비물

**워크플로우 다운로드**:

[[download: downloads/session2/step2/turtle.json | 거북이 Scribble 워크플로우 다운로드]]

**연습용 이미지 다운로드**:

[[download: downloads/session2/step2/turtle.png | 거북이 스케치 이미지 다운로드]]

**이미지 미리보기**:

[[image: session2/step2/turtle.png]]

### Step 1: 워크플로우 열기 및 이미지 생성

**워크플로우 불러오기**:
1. 다운로드한 `turtle.json` 파일을 ComfyUI에 드래그 앤 드롭
2. 워크플로우가 자동으로 로드됩니다

**이미지 업로드**:
1. `Load Image` 노드를 찾습니다
2. 위의 거북이 이미지(turtle.png)를 다운로드합니다
3. `Load Image` 노드에 거북이 이미지를 업로드합니다

**첫 이미지 생성**:
```settings
Queue Prompt 버튼 클릭
기본 설정으로 이미지 생성 확인
```

### Step 2: ControlNet 매개변수 조정하기

**ControlNetApplyAdvanced 노드 찾기**:
- 워크플로우에서 `ControlNetApplyAdvanced` 노드를 찾습니다
- 이 노드에는 3개의 중요한 매개변수가 있습니다

**매개변수 설명**:
```settings
strength (적용 강도): ControlNet의 영향력
- 0.0 ~ 2.0 범위
- 높을수록 스케치에 충실

start_percent (시작 퍼센트): ControlNet 적용 시작 지점
- 0.0 ~ 1.0 범위
- 디노이징 과정의 시작 시점

end_percent (종료 퍼센트): ControlNet 적용 종료 지점
- 0.0 ~ 1.0 범위
- 디노이징 과정의 종료 시점
```

**실험해보기**:
1. **strength를 0.5 -> 0.9 -> 1.2**로 변경하며 생성
2. **start_percent를 0.1 -> 0.0 -> 0.2**로 변경하며 생성
3. **end_percent를 0.8 -> 0.6 -> 1.0**으로 변경하며 생성

각 설정별로 결과물의 차이를 관찰합니다.

---

### Step 3: 노드 마스크 편집기로 형태 수정하기

**마스크 편집기 열기**:
1. `Load Image` 노드에서 **연필 아이콘**(노드 마스크 편집기) 클릭
2. 편집 창이 열립니다

**스케치 수정**:
```settings
브러시로 선 추가하기
지우개로 불필요한 선 제거하기
두께 조절하여 디테일 추가
```

**수정 후 재생성**:
1. 편집 완료 후 저장
2. `Queue Prompt`로 새로운 이미지 생성
3. 수정한 부분이 어떻게 반영되는지 확인

**반복 실험**:
```settings
스케치 수정 -> 생성 -> 결과 확인 -> 매개변수 조정 -> 다시 생성
원하는 결과가 나올 때까지 반복
```

---

## 정리

### ControlNet 핵심 개념
- Stable Diffusion에 **시각적 가이드** 추가
- 원본 모델은 보존하며 **새로운 조건 학습**
- 다양한 타입으로 **다양한 제어 방식** 제공

### Scribble ControlNet 실습 핵심
- **간단한 스케치**로 완성도 높은 이미지 생성
- **강도 조절**로 제어 수준 설정
- **반복 수정**을 통한 최적화

---

**다음 강의**: Step 1에서는 OpenPose ControlNet으로 정확한 인체 포즈를 제어하는 방법을 배웁니다.
