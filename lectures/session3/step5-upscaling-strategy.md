# 이미지 업스케일링 전략

---

## 학습 목표

이미지를 고해상도로 업스케일하는 두 가지 방법을 실습하고, 각각의 차이점과 원리를 이해합니다.

---

## 1단계: 템플릿 다운로드 받기

아래 두 가지 업스케일링 템플릿을 다운로드하세요.

[[download: downloads/session3/upscale/upscale_basic_workflow.json | 기본 업스케일 워크플로우 다운로드]]

[[download: downloads/session3/upscale/upscale_hiresfix_workflow.json | Hires Fix 업스케일 워크플로우 다운로드]]

---

## 2단계: Basic 업스케일 실습

### upscale_basic.json 열기

다운로드한 `upscale_basic_workflow.json` 파일을 ComfyUI에 드래그 앤 드롭하여 엽니다.

---

### 템플릿으로 실습해봅시다

1. 워크플로우 구조 확인
2. 프롬프트를 원하는 내용으로 수정
3. Queue Prompt 클릭하여 생성
4. 결과 이미지 확인

---

## 3단계: Hires Fix 업스케일 실습

### upscale_hiresfix.json 열기

다운로드한 `upscale_hiresfix_workflow.json` 파일을 ComfyUI에 드래그 앤 드롭하여 엽니다.

---

### 템플릿으로 실습해봅시다

1. 워크플로우 구조 확인
2. Basic 방식과의 노드 차이 비교
3. Queue Prompt 클릭하여 생성
4. Basic 방식과 결과 비교

---

## 4단계: 두 방식의 차이점 이해하기

---

### Basic 업스케일 방식

**작동 원리:**
- RealESRGAN 업스케일러 모델 사용
- 이미지 확대 노드로 생성된 이미지를 **그대로 확대**
- 단순하고 빠른 처리

**워크플로우 구조:**
```
KSampler → VAE Decode → Upscale Image → Save Image
```

**특징:**
- 빠른 처리 속도
- 기존 이미지의 디테일 보존
- 추가 생성 과정 없음

---

### Hires Fix 업스케일 방식

**작동 원리:**
1. RealESRGAN 업스케일러로 이미지 확대
2. **VAE Encode** 노드로 이미지를 다시 **데이터(Latent) 형태로 변환**
3. 변환된 Latent를 **KSampler에 투입하여 다시 생성**

**워크플로우 구조:**
```
KSampler → VAE Decode → Upscale Image →
VAE Encode → KSampler → VAE Decode → Save Image
```

**특징:**
- 디테일 추가 생성
- 더 선명한 결과물
- 처리 시간이 더 소요됨

---

### VAE Encode와 Decode의 관계

**복습: VAE Decode**
- KSampler의 산출물 (Latent 데이터)을 **이미지로 변환**
- Latent → Image

**VAE Encode**
- VAE Decode의 **반대 방향**으로 작동
- 이미지를 다시 **Latent 데이터로 변환**
- Image → Latent

**Hires Fix에서의 활용:**
- 업스케일된 이미지를 다시 Latent로 변환
- KSampler가 이 Latent를 받아서 디테일을 추가 생성
- 결과적으로 더 선명하고 디테일한 이미지 획득

---

## 정리

---

**Basic 방식**
- 장점: 빠른 처리, 원본 이미지 유지
- 단점: 디테일 추가 없음
- 추천: 빠르게 확대만 필요한 경우

---

**Hires Fix 방식**
- 장점: 디테일 추가 생성, 더 선명한 결과
- 단점: 처리 시간 소요
- 추천: 최종 결과물, 고품질 필요 시

목적에 따라 적절한 방식을 선택하여 사용하세요!
