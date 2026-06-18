# Image to Image 입문

[[image: session1/step9/i2i_1.PNG]]
[[image: session1/step9/i2i_2.PNG]]
[[image: session1/step9/i2i_principle.png]]

---section---

## 그렇다면 노이즈는 어떻게 생성할까? → 노이즈는 seed값을 토대로 생성된다!

[[image: session1/step9/denoising.gif]]

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

### 실습 준비: 샘플 이미지 및 워크플로우 다운로드

[[image: session1/step9/i2i_sample.png | width:448]]

위 이미지를 우클릭하여 다운로드하세요.

[[download: downloads/session1/step9/i2i_workflow.json | Image to Image 워크플로우 다운로드 (.json)]]

---section---

### Step 1: 워크플로우 열기
위에서 받은 `i2i_workflow.json` 파일을 ComfyCloud에 불러옵니다.

- ComfyUI 로고 클릭 → **file → 불러오기** → 다운로드한 JSON 파일 선택

### Step 2: 이미지 투입
**Load Image** 노드에서 위에서 다운로드한 `i2i_sample.png` 파일을 업로드합니다.

### Step 3: 첫 실행
**Queue Prompt** 버튼을 클릭하여 첫 결과를 확인합니다.

---section---

### Step 4: Denoise 값 변경하며 실습
**KSampler** 노드의 `denoise` 값을 변경하며 원본 이미지와의 유사도 차이를 비교해봅시다.

---section---

### Denoise 값에 따른 차이 정리

| Denoise | 결과 특징 |
|---------|----------|
| 0.3 | 원본과 매우 유사, 색감과 스타일만 약간 변경 |
| 0.5 | 원본 구도 유지하며 애니메이션 스타일 적용 |
| 0.75 | 균형잡힌 변환 (기본 권장값) |
| 0.9 | 원본 형태는 남지만 대담한 스타일 변환 |
