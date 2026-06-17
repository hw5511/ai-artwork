# 고급 워크플로우 실습

## 개요

실전에서 활용할 수 있는 다양한 분야별 워크플로우를 실습합니다.
아래 템플릿들은 ComfyCloud 환경에 맞게 구성되어 있습니다.

---section---

## 1. 아트웍: 라인/음영 조절

캐릭터 일러스트에서 라인의 굵기와 음영을 슬라이더로 자유롭게 조절하는 워크플로우입니다.

[[download: downloads/session4/line_depth_slider.json | 라인/음영 조절 워크플로우 다운로드]]

[[image: session4/line weight.webp | width:30% | row | 라인 굵기 예시]]
[[image: session4/shading.png | width:30% | row | 음영 예시]]

---section---

## 2. 시각편집: Image to Illustration

실사 이미지를 일러스트 스타일로 변환하는 워크플로우입니다.

[[download: downloads/session4/image2illust.json | Image to Illustration 워크플로우 다운로드]]
[[download: downloads/session4/dress.jpg | 샘플 이미지 다운로드]]

[[image: session4/dress.jpg | width:30% | 샘플 이미지]]

---section---

## 3. 3D/건축: 렌더링 효과

ZBrush, SketchUp 등의 3D 모델링 화면을 실사 렌더링으로 변환하는 워크플로우입니다.

MIX LAB 커스텀 노드를 활용하면 화면 공유 기능으로 더욱 편리하게 작업할 수 있습니다.

[[download: downloads/session4/mix_lab.json | MIX LAB 템플릿 다운로드]]
[[download: downloads/session4/zbrush.jpg | ZBrush 샘플 이미지 다운로드]]

[[image: session4/zbrush.jpg | width:50% | ZBrush 모델링 화면]]

**활용 분야**
- 3D 그래픽: ZBrush, Blender 모델링 렌더링
- 건축: SketchUp 외관/실내 시각화
- 인테리어: 공간 디자인 프리뷰

---section---

## 4. 스톡 이미지 만들기

다양한 바리에이션의 스톡 이미지를 한 번에 생성하는 워크플로우입니다.

[[download: downloads/session4/aloe_stock.json | 스톡 이미지 템플릿 다운로드]]

**활용 팁**
- X축에 색상, 각도, 스타일 등 변수 설정
- Y축에 Seed를 설정하여 같은 조건의 다양한 결과 생성
- 마음에 드는 결과를 선택하여 상업적으로 활용

---section---

## 5. 줌인 영상 만들기

Outpaint 기법과 First-Last 워크플로우를 결합하여 줌인 효과 영상을 제작합니다.

[[download: downloads/session4/outpaint/outpaint.json | Outpaint 워크플로우 다운로드]]
[[download: downloads/session4/coffee.png | 커피 샘플 이미지 다운로드]]

[[image: session4/coffee.png | width:30% | row | 1단계: 원본]]
[[image: session4/outpaint_raw.png | width:30% | row | 2단계: Outpaint 배경 확장]]
[[image: session4/outpaint_first.png | width:30% | row | 3단계: Hires Fix 품질 향상]]

[[video: session4/outpaint/coffee.mp4 | width:50% | 최종 결과: 줌인 영상]]

**활용 팁**
- Outpaint를 여러 단계 반복하면 더 긴 줌인 효과를 만들 수 있습니다
- 프롬프트를 일관되게 유지하면 배경 스타일이 통일됩니다
