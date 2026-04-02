# 고급 워크플로우 실습

---

## 개요

이번 강의에서는 실전에서 활용할 수 있는 다양한 분야별 워크플로우를 실습합니다.
각 분야의 특성에 맞는 기법과 모델을 활용하여 전문적인 결과물을 만들어봅시다.

---section---

## 1. 아트웍 분야: 라인/음영 조절

캐릭터 일러스트에서 라인의 굵기와 음영을 자유롭게 조절할 수 있는 워크플로우입니다.

### 사용 모델
- **체크포인트**: Bridge Toons Mix
- **LoRA**: Line Weight Slider, Shading Slider

### 워크플로우 다운로드

[[download: downloads/session4/line_depth_slider.json | 라인/음영 조절 워크플로우 다운로드]]

[[image: session4/line weight.webp | width:30% | row | 라인 굵기 조절 예시]]
[[image: session4/shading.png | width:30% | row | 음영 조절 예시]]

**참고 링크**:
- [음영 조절 LoRA](https://civitai.com/models/2049756/shading-slider-bridge-tools-noobaiillustriouspony)
- [라인 굵기 LoRA](https://civitai.com/models/2004228/line-weight-slider-bridge-tools-noobaiillustriouspony)
- [체크포인트 모델](https://civitai.com/models/1691010/bridge-toons-mix)

---section---

## 2. 시각편집 분야: Image to Illustration

실사 이미지를 일러스트 스타일로 변환하는 워크플로우입니다.

### 워크플로우 및 샘플 이미지 다운로드

[[download: downloads/session4/image2illust.json | Image to Illustration 워크플로우 다운로드]]
[[download: images/session4/dress.jpg | 샘플 이미지 다운로드]]

**샘플 이미지 미리보기:**

[[image: session4/dress.jpg | width:30% | 샘플 이미지]]

**참고 링크**:
- [Image to Illustration LoRA](https://civitai.com/models/1757495)

---section---

## 3. 3D 그래픽/건축 분야: 렌더링 효과

ZBrush, SketchUp 등의 3D 모델링 화면을 실사 렌더링으로 변환하는 워크플로우입니다.

### MIX LAB 커스텀 노드

화면 공유 기능이 포함된 MIX LAB 노드를 활용하면 더욱 편리하게 작업할 수 있습니다.

### 워크플로우 및 샘플 이미지 다운로드

[[download: downloads/session4/mix_lab.json | MIX LAB 템플릿 다운로드]]
[[download: images/session4/zbrush.jpg | ZBrush 샘플 이미지 다운로드]]

**ZBrush 샘플 이미지 미리보기:**

[[image: session4/zbrush.jpg | width:50% | ZBrush 모델링 화면]]

**활용 분야**:
- **3D 그래픽**: ZBrush, Blender 등의 모델링 렌더링
- **건축**: SketchUp 외관/실내 디자인 시각화
- **인테리어**: 공간 디자인 프리뷰 생성

---section---

## 4. 스톡 이미지 만들기

XY Plot을 활용하여 다양한 바리에이션의 스톡 이미지를 한 번에 생성하는 워크플로우입니다.

### 워크플로우 다운로드

[[download: downloads/session4/aloe_stock.json | 스톡 이미지 템플릿 다운로드]]

**활용 팁**:
- X축에 다양한 색상, 각도, 스타일을 설정
- Y축에 Seed를 설정하여 동일 조건의 다양한 결과 생성
- 생성된 이미지 중 마음에 드는 것을 선택하여 상업적으로 활용

---section---

## 5. 줌인 영상 만들기

Outpaint 기법과 First-Last 워크플로우를 결합하여 줌인 효과의 영상을 제작합니다.

### 워크플로우 및 샘플 이미지 다운로드

[[download: downloads/session4/outpaint/outpaint.json | Outpaint 워크플로우 다운로드]]
[[download: images/session4/coffee.png | 커피 샘플 이미지 다운로드]]

### 실습 과정 미리보기

[[image: session4/coffee.png | width:30% | row | 1단계: 커피 원본]]
[[image: session4/outpaint_raw.png | width:30% | row | 2단계: Outpaint 배경 확장]]
[[image: session4/outpaint_first.png | width:30% | row | 3단계: Hires Fix 품질 향상]]

[[video: session4/outpaint/coffee.mp4 | width:50% | 최종 결과: 줌인 영상]]

**활용 팁**:
- 여러 단계로 Outpaint를 반복하면 더 긴 줌인 효과를 만들 수 있습니다
- 프롬프트를 조정하여 배경 스타일을 일관되게 유지합니다
- 생성된 영상은 SNS 콘텐츠, 광고 영상 등에 활용 가능합니다

---section---

## 참고 모델 탐색

다양한 스타일과 분야에 특화된 모델들을 탐색해보세요.

### 아이콘/로고/벡터 모델
- [LogoRedmond](https://civitai.com/models/124609/logoredmond-logo-lora-for-sd-xl-10)
- [Vector Illustration](https://civitai.com/models/60132/vector-illustration)
- [Vector Illustration Style](https://civitai.com/models/186248/vector-illustration-style)
- [Minimalist Vector](https://civitai.com/models/61823)

### 라인 드로잉 모델
- [VectorLineMinimalist](https://civitai.com/models/1553433/vectorlineminimalist)
- [Anime Lineart](https://civitai.com/models/16014/anime-lineart-manga-like-style)
- [Drawing Lesson](https://civitai.com/models/193924/drawing-lesson)

### 포즈 모델
- [Pose Depot 컬렉션](https://civitai.com/user/Pose_Depot)

### 스톡 일러스트 스타일
- [Stock Illustration SDXL](https://civitai.com/models/1849997/stock-illustration-sdxl)

---

**다음 단계**: 이번 실습에서 배운 기법들을 조합하여 자신만의 독창적인 워크플로우를 만들어보세요!
