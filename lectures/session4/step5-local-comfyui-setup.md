# 로컬 ComfyUI 설치하기

## 학습 목표

로컬 PC에 ComfyUI를 설치하여 제한 없이 사용하는 방법을 익힙니다.

---

## 컴퓨터 사양 확인하기

로컬에서 ComfyUI를 사용하려면 그래픽 카드(GPU)의 VRAM 용량을 먼저 확인해야 합니다.

### GPU 확인 방법

[[image: dxdiag.jpg | width:800]]

1. Windows 키 누르기
2. **"dxdiag"** 입력 및 실행
3. **"디스플레이 1"** 탭 클릭
4. 그래픽 카드 모델 확인

---

## 모델별 권장 사양

| 모델 | 최소 VRAM | 권장 VRAM | 비고 |
|------|-----------|-----------|------|
| **SD 1.5** | 8GB | 12GB | 입문자 추천 |
| **SDXL** | 8GB | 12-16GB | 고해상도 작업 시 16GB |
| **Flux (양자화)** | 6-8GB | 12-16GB | Q8 양자화 버전 |
| **Flux (Full)** | 16GB | 24GB | 최고 품질 |

### 추천 그래픽 카드

**입문/중급 (SD 1.5, SDXL)**
- NVIDIA RTX 3060 12GB (가성비 최고)
- NVIDIA RTX 4060 Ti 16GB

**고급 (SDXL, Flux 양자화)**
- NVIDIA RTX 4070 12GB
- NVIDIA RTX 3070 Ti 8GB

**전문가 (Flux Full)**
- NVIDIA RTX 3090 24GB
- NVIDIA RTX 4090 24GB

### 기타 시스템 요구사항

- **RAM**: 최소 16GB, 권장 32GB
- **저장 공간**: SSD 최소 100GB
- **CPU**: Intel i7 9세대 이상 / AMD Ryzen 3700X 이상

---

## Stability Matrix란?

ComfyUI를 로컬 PC에 **간편하게 설치하고 관리**할 수 있는 올인원 패키지 매니저입니다.

### 주요 장점

- **원클릭 설치** (Python, Git 자동 설치)
- **포터블 모드** 지원 (USB에 담아 이동 가능)
- 모델 및 커스텀 노드 관리 간편
- 여러 UI 통합 관리 (ComfyUI, Automatic1111 등)

---

## 설치 과정

### 1단계: Stability Matrix 다운로드

**공식 사이트**: https://github.com/LykosAI/StabilityMatrix/releases

1. 최신 버전 **"StabilityMatrix-win-x64.zip"** 다운로드
2. ZIP 파일 압축 해제
3. 원하는 위치로 이동
   - 권장: `C:\StabilityMatrix`
   - ⚠️ 한글 경로 피하기

### 2단계: Stability Matrix 실행

1. **StabilityMatrix.exe** 파일 실행
2. 첫 실행 시 초기 설정 화면 표시

### 3단계: 포터블 모드 설정

1. **"Portable Mode"** 체크박스 선택
   - 폴더만 복사하면 다른 PC에서도 사용 가능
2. **"Continue"** 클릭

### 4단계: ComfyUI 패키지 설치

1. **"Packages"** 탭 클릭
2. **"Add Package"** 버튼 클릭
3. **"ComfyUI"** 선택
4. 설치 옵션 설정
   - Package Name: `ComfyUI`
   - Version: `Stable` (안정 버전 권장)
5. **"Install"** 클릭
6. 자동 설치 완료 대기
7. **"Launch"** 버튼으로 ComfyUI 실행

**기본 주소**: http://127.0.0.1:8188

### 5단계: ComfyUI Manager 설치

ComfyUI Manager는 커스텀 노드를 쉽게 관리할 수 있는 필수 확장입니다.

1. ComfyUI 화면 우측 **퍼즐 아이콘** 클릭
2. **"Install Extensions"** 클릭
3. 검색창에 **"manager"** 입력
4. **Dr.Lt.data**의 **"ComfyUI-Manager"** 찾기
5. **"Install"** 클릭
6. **ComfyUI 재시작** (브라우저 새로고침)
7. 화면 우측에 **Manager** 버튼 확인

---

## 주요 모델 저장 경로

```
[포터블 설치 위치]\Data\Models\
├── StableDiffusion    # 체크포인트
├── Lora               # LoRA
├── ControlNet         # ControlNet
├── VAE                # VAE
├── Embeddings         # 임베딩
├── ESRGAN             # 업스케일러
└── IpAdapter          # IP-Adapter
```
