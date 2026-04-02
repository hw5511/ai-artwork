# Image to Image 입문

[[image: i2i_1.PNG]]
[[image: i2i_2.PNG]]
[[image: i2i_principle.png]]

---section---

## 그렇다면 노이즈는 어떻게 생성할까? → 노이즈는 seed값을 토대로 생성된다!

[[image: denoising.gif]]

---section---

## Image to Image란?

Image to Image(Img2Img)는 기존 이미지를 참조하여 새로운 이미지를 생성하는 기법입니다.
Text to Image와 유사하지만, 참조 이미지를 조건으로 추가하여 더욱 정밀한 제어가 가능합니다.

### Image to Image의 활용
- 사진을 애니메이션 스타일로 변환
- 스케치를 완성된 이미지로 변환
- 이미지 복원 및 화질 개선
- 흑백 이미지 컬러화
- 스타일 변환 (예: 사실적 사진 → 수채화)

---section---

## Image to Image 실습

### 실습 준비: 샘플 이미지 다운로드

[[image: i2i_sample.png | width:448]]

위 이미지를 우클릭하여 다운로드하세요.

---section---

### Step 1: 템플릿 열기 및 이미지 업로드
ComfyUI 왼쪽 상단 아이콘 클릭 → **보기** → **템플릿 탐색** → **"Image to Image"** 선택 → **Load Image** 노드에서 다운로드한 `i2i_sample.png` 파일 업로드

### Step 2: 체크포인트 모델 변경
**Load Checkpoint** 노드에서 **Astranime** 모델 선택 (step5에서 다운로드한 모델)

### Step 3: 첫 실행
**KSampler** 노드에서 Denoise 값 확인 후 **Queue Prompt** 버튼 클릭하여 결과 확인

---section---

### Step 4: Denoise 값 변경하며 실습
**KSampler** 노드의 `denoise` 값을 `0.3`, `0.5`, `0.9`로 각각 변경하며 원본 이미지와의 유사도 차이를 비교해봅시다.

---section---

### Denoise 값에 따른 차이 정리

| Denoise | 결과 특징 |
|---------|----------|
| 0.3 | 원본과 매우 유사, 색감과 스타일만 약간 변경 |
| 0.5 | 원본 구도 유지하며 애니메이션 스타일 적용 |
| 0.75 | 균형잡힌 변환 (기본 권장값) |
| 0.9 | 원본 형태는 남지만 대담한 스타일 변환 |
