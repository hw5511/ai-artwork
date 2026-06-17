# 로컬 ComfyUI 설치 및 Civitai 활용

---section---

## 1. 로컬 ComfyUI 설치하기

클라우드 서비스 없이 내 PC에 ComfyUI를 직접 설치하면 모델 제한 없이 자유롭게 사용할 수 있습니다.

### 권장 사양

| 모델 | 최소 VRAM | 권장 VRAM |
|------|-----------|-----------|
| SD 1.5 | 8GB | 12GB |
| SDXL | 8GB | 12-16GB |
| Flux (양자화) | 6-8GB | 12-16GB |
| Flux (Full) | 16GB | 24GB |

> **GPU 확인 방법**: Windows 키 → `dxdiag` 실행 → 디스플레이 1 탭에서 그래픽 카드 모델 확인

### Stability Matrix로 설치하기

ComfyUI를 원클릭으로 설치하고 관리할 수 있는 패키지 매니저입니다.

**다운로드**: https://github.com/LykosAI/StabilityMatrix/releases

1. `StabilityMatrix-win-x64.zip` 다운로드 후 압축 해제 (한글 경로 피하기)
2. `StabilityMatrix.exe` 실행
3. **Portable Mode** 체크 → Continue
4. Packages → Add Package → **ComfyUI** 선택 → Install
5. Launch → http://127.0.0.1:8188 접속

> **ComfyUI Manager 설치**: 우측 퍼즐 아이콘 → Install Extensions → "manager" 검색 → Dr.Lt.data의 ComfyUI-Manager 설치

### 모델 저장 경로

```
[설치 위치]\Data\Models\
├── StableDiffusion    # 체크포인트
├── Lora               # LoRA
├── ControlNet         # ControlNet
├── VAE                # VAE
└── Embeddings         # 임베딩
```

---section---

## 2. Civitai 활용하기

**Civitai** (https://civitai.com) 는 AI 이미지 생성 커뮤니티 플랫폼입니다.
모델을 다운로드하고 다른 사람의 작업물을 참고하는 가장 대표적인 사이트입니다.

### 주요 섹션

**Models** (https://civitai.com/models)
- 체크포인트, LoRA, ControlNet 등 모델 다운로드
- 각 모델 페이지에서 예시 이미지와 사용 프롬프트 확인 가능
- Base Model 필터로 SD 1.5 / SDXL / Flux 구분하여 검색

**Images** (https://civitai.com/images)
- 커뮤니티가 생성한 이미지 탐색
- 이미지 클릭 시 사용된 체크포인트, LoRA, 프롬프트, CFG, Seed 등 전체 정보 확인 가능
- 마음에 드는 이미지의 생성 조건을 그대로 재현하거나 응용 가능

### PNG 메타데이터 활용하기

ComfyUI로 생성된 PNG 이미지에는 워크플로우 정보가 내장되어 있습니다.
Civitai 등에서 다운로드한 이미지를 ComfyUI에 **드래그 앤 드롭**하면 워크플로우가 자동으로 불러와집니다.

**활용 예시**: https://civitai.com/images/103956588

### 탐색 시 유의사항

- Base Model 필터에서 **SD 1.5 또는 SDXL** 기반 이미지 선택 (Flux는 요구 사양이 높음)
- 체크포인트 + LoRA 파일 총합이 로컬 저장 공간에 여유가 있는지 확인
- 이미지 메타데이터에 프롬프트, Seed, CFG 정보가 공개되어 있는지 확인
