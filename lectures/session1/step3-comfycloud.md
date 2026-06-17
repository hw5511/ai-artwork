# ComfyCloud 시작하기

## ComfyCloud란?

ComfyCloud는 클라우드 기반 ComfyUI 플랫폼입니다.
별도의 고사양 컴퓨터 없이도 웹 브라우저에서 ComfyUI를 바로 사용할 수 있습니다.

### 주요 장점
- 고사양 GPU 불필요 (클라우드 GPU 제공)
- 설치 과정 없이 즉시 사용 가능
- 다양한 모델과 템플릿 사전 내장
- 월 400 크레딧 무료 제공

---section---

## 계정 생성 및 로그인

### 1. ComfyCloud 접속
웹 브라우저에서 [https://cloud.comfy.org/](https://cloud.comfy.org/) 에 접속합니다.

### 2. 회원가입
우측 상단의 로그인 버튼을 클릭하여 Google 계정으로 가입합니다.

### 3. 무료 플랜 확인
로그인 후 우측 상단 계정 버튼에서 현재 크레딧을 확인할 수 있습니다.

```settings
무료 플랜: 월 400 크레딧 제공
크레딧 소모: 워크플로우 실행 시 GPU 사용량에 따라 차감
```

---section---

## ComfyUI 편집기 시작하기

로그인 후 자동으로 ComfyUI 편집기가 열립니다.

### 기본 화면 구성

```settings
좌측 사이드바:
- 에셋: 생성된 이미지 갤러리
- 노드: 사용 가능한 노드 목록
- 모델: 내장 모델 라이브러리
- 워크플로우: 저장된 워크플로우
- 앱: 앱 빌더
- 템플릿: 공개 템플릿

상단 툴바:
- 실행(Queue Prompt): 워크플로우 실행
- 크레딧 표시: 남은 크레딧 확인
```

---section---

## 모델 라이브러리

ComfyCloud의 가장 큰 특징은 다양한 모델이 내장되어 있다는 점입니다.
별도 다운로드 없이 바로 사용할 수 있습니다.

### 모델 사용 방법

1. 좌측 사이드바 **모델 아이콘** 클릭
2. 원하는 카테고리 선택 (Checkpoints, Loras 등)
3. 모델 카드의 **"사용" 버튼** 클릭
4. 캔버스에 해당 모델 노드가 자동 추가됨

### 주요 내장 모델

| 카테고리 | 주요 모델 | 용도 |
|----------|-----------|------|
| Checkpoints | Illustrious-XL | anime/일러스트 이미지 생성 |
| Checkpoints | WAI-illustrious-SDXL | anime/일러스트 이미지 생성 |
| Checkpoints | RealVisXL V5.0 | 포토리얼리스틱 이미지 생성 |
| Checkpoints | Pony Diffusion V6 XL | 다양한 스타일 이미지 생성 |
| Loras | Ars MidJourney Watercolor | 수채화 스타일 |
| Loras | Retro Sci-fi 90's anime style | 레트로 애니메이션 스타일 |

---section---

## 템플릿 사용하기

ComfyCloud는 다양한 공개 템플릿을 제공합니다.

### 템플릿 열기

1. 좌측 사이드바 **템플릿 아이콘** 클릭
2. 원하는 템플릿 선택
3. **"사용" 버튼** 클릭 → 워크플로우에 자동 적용

### 추천 템플릿 (1회차)

- **Flux.1 Dev**: 고품질 이미지 생성
- **Flux.1 Schnell**: 빠른 이미지 생성
- **SDXL 간단**: SDXL 기반 이미지 생성
