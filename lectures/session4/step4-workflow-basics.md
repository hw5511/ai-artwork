# 워크플로우 기초 실습

## 학습 목표

ComfyCloud 내장 모델로 워크플로우를 직접 구성하고, 다양한 기법을 응용하여 이미지를 발전시키는 방법을 익힙니다.

---section---

## 1단계: Civitai에서 참고 이미지 찾기

**Civitai** (https://civitai.com/images)에서 마음에 드는 이미지를 탐색합니다.

- Base Model 필터에서 **SDXL** 기반 이미지 선택 (ComfyCloud 내장 모델과 호환)
- 이미지 클릭 시 사용된 체크포인트, LoRA, 프롬프트, CFG, Seed 등 확인
- 시연용 예시: https://civitai.com/images/105765701

> **PNG 메타데이터 활용**: Civitai에서 다운로드한 PNG 이미지를 ComfyUI에 **드래그 앤 드롭**하면 워크플로우가 자동으로 불러와집니다.

---section---

## 2단계: ComfyCloud 모델로 워크플로우 구성하기

### 내장 모델 확인

ComfyCloud에서는 별도 다운로드 없이 내장 체크포인트와 LoRA를 바로 사용할 수 있습니다.

- **체크포인트**: WAI-illustrious-SDXL, Illustrious-XL, Pony Diffusion 등
- **LoRA**: MoXin, 수채화 스타일 등 다양한 내장 LoRA 포함

### 기본 노드 구성

1. **Load Checkpoint** → 내장 체크포인트 선택
2. **CLIP Text Encode** → 프롬프트 입력
3. **SDXLResolution** (ComfyMath) → 권장 해상도 선택
4. **Empty Latent Image** → 해상도 연결
5. **KSampler** → 매개변수 설정
6. **VAE Decode** → 이미지 디코딩
7. **Save Image** → 결과 저장

### LoRA 추가하기

참고 이미지에서 LoRA 정보를 확인한 뒤, 내장 LoRA 중 유사한 것을 선택합니다.

- **Load LoRA** 노드 추가
- Weight 값 설정 (0.5~1.0 사이 권장)

---section---

## 3단계: 생성 결과 확인 및 디벨롭하기

### 시드 고정으로 비교하기

- 참고 이미지의 **Seed 값**을 동일하게 설정하여 결과 비교
- 만족스러운 결과가 나오면 Seed 값 기록

### 워크플로우 발전시키기

**포즈 제어 추가**
- OpenPose ControlNet 노드 추가
- 원하는 포즈로 변경 실험

**LoRA 조합**
- 여러 LoRA를 동시에 적용하여 스타일 혼합
- 각 LoRA의 Weight를 조절하며 비율 실험

**Image-to-Image 적용**
- 생성된 이미지를 입력으로 사용
- Denoise 강도를 낮추면 원본을 유지하며 세부 수정 가능

**형태 유지가 필요할 때**
- **Depth ControlNet**: 깊이 정보로 구조 유지
- **Canny ControlNet**: 윤곽선 정보로 형태 유지

---section---

## 4단계: 자유 실습

지금까지 배운 내용을 바탕으로 자유롭게 이미지를 만들어보세요!

**실습 아이디어**
- Civitai에서 마음에 드는 이미지를 골라 ComfyCloud 내장 모델로 재현해보기
- PNG 드래그앤드롭으로 외부 워크플로우 불러와서 실행해보기
- LoRA 조합을 바꿔가며 나만의 스타일 찾기
