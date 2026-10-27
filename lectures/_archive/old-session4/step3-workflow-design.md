# 워크플로우 설계 실습 - 서울 옥외 전광판 광고 영상 만들기

## 실습 목표

여러 워크플로우를 단계별로 연결하여 하나의 완성된 광고 영상을 제작합니다.

**완성 결과물**: ㄱ자형(wrap-around) 서울 옥외 LED 전광판에서 제품이 화면 밖으로 돌출되는 아나모픽 광고 영상

---section---

## 전체 워크플로우 흐름

```
[1단계] 전광판 배경 생성
    → ㄱ자 전광판 + 그린스크린(#00FF00) 이미지

[2단계] 제품 광고 이미지 생성 (First Frame용)
    → 전광판에 표시될 평면적인 제품 광고 이미지

[3단계] 그린스크린 합성
    → 1번 전광판 + 2번 광고 이미지 합성 = First Frame 완성

[4단계] Qwen Image Edit으로 Last Frame 생성
    → First Frame에서 제품이 화면 밖으로 돌출되는 효과 추가

[5단계] First-Last 비디오 생성
    → 평면(First) → 돌출(Last) 애니메이션 완성
```

---section---

## 1단계: 서울 옥외 전광판 배경 생성

ㄱ자형(wrap-around) 전광판에 그린스크린(`#00FF00`)이 채워진 서울 거리 이미지를 생성합니다.

[[download: downloads/session4/step3/1_zimageturbo_t2i.json | 1단계 워크플로우 다운로드 (Z-Image Turbo)]]

**설정 포인트:**
- `wrap-around screen`, `chroma key green screen, #00FF00` 명시
- 저앙각(Low angle) 촬영 구도 → 전광판이 위에서 압도하는 구도
- 서울 거리 배경 포함 (버스, 보행자, 아스팔트)

**실습 포인트:** 그린 영역이 ㄱ자(L자) 형태로 균일하게 나왔는지 확인하세요.

---section---

## 2단계: 제품 광고 이미지 생성 (First Frame용)

전광판 화면에 표시될 제품 광고 이미지를 생성합니다.
제품이 화면 **안쪽 깊숙이**, **평면적**으로 배치된 느낌으로 생성합니다.

[[download: downloads/session4/step3/2_qwen_t2i.json | 2단계 워크플로우 다운로드 (Qwen 2512)]]

**설정 포인트 (스튜디오 제품 광고컷 스타일):**
- **오브젝트**: 럭셔리 향수병 (골드 캡, 크리스탈 유리, 앰버 액체)
- **배경**: 어두운 추상 3D 스테이지 (딥 네이비 + 골드 컬러)
- **조명**: Octane Render / UE5 스타일 림 라이팅
- **구도**: 저앙각, 중앙 플로팅 배치, 여백 충분
- 16:9 가로 포맷 (전광판 비율)

**주의:** `billboard`, `outdoor` 같은 단어를 넣으면 전광판 이미지가 생성됩니다. 제품 단독 이미지로 생성하세요.

---section---

## 3단계: AI 합성 → First Frame 완성

1단계(전광판 배경)와 2단계(제품 이미지)를 Qwen Image Edit에 reference로 넣어 AI가 자연스럽게 합성합니다.
단순 붙여넣기가 아닌 AI가 ㄱ자 전광판의 원근감, 조명, 코너 왜곡을 맞춰서 처리합니다.

[[download: downloads/session4/step3/3_qwen_billboard_composite.json | 3단계 워크플로우 다운로드 (Qwen Billboard Composite)]]

**워크플로우 구조:**

```
LoadImage 1 (전광판 배경) ──→ Qwen Image Edit → First Frame (합성 결과)
LoadImage 2 (제품 이미지) ──↗
프롬프트: 그린 영역을 제품 이미지로 교체, 원근감/조명 자동 적용
```

**사용 방법:**
1. `LoadImage 1`: 1단계에서 생성한 전광판 이미지 (그린스크린 포함)
2. `LoadImage 2`: 2단계에서 생성한 향수 제품 이미지
3. AI가 그린 영역을 감지하고 제품 이미지를 ㄱ자 화면 원근감에 맞춰 합성
4. 결과 이미지 저장 → **First Frame**으로 사용

---section---

## 4단계: Qwen Image Edit → Last Frame 생성

3단계에서 완성된 First Frame을 입력 이미지로 넣어, 제품이 전광판 화면 밖으로 돌출되는 **아나모픽 3D 효과**를 추가합니다.

[[download: downloads/session4/step3/4_qwen_image_edit.json | 4단계 워크플로우 다운로드 (Qwen Image Edit)]]

**사용 방법:**
1. `LoadImage`: 3단계에서 저장한 **First Frame 합성 이미지** 연결
2. 프롬프트: 제품이 화면 밖으로 돌출되는 효과 지시
3. 건물, 거리, 배경 환경은 그대로 유지하도록 명시
4. 결과 이미지 저장 → **Last Frame**으로 사용

**실습 포인트:** 돌출 강도를 프롬프트로 조절해보세요. (subtle → dramatic)

---section---

## 5단계: First-Last 비디오 생성

First Frame과 Last Frame을 이어 제품이 화면에서 돌출되는 애니메이션을 생성합니다.

[[download: downloads/session4/step3/5_video_wan_first_last.json | 5단계 워크플로우 다운로드 (Wan 2.2 First-Last)]]

**사용 방법:**
1. First 프레임: 3단계 합성 이미지 (제품 평면 배치)
2. Last 프레임: 4단계 편집 이미지 (제품 돌출)
3. 프레임 수: 49 (기본값, 8의 배수 + 1)
4. 해상도: 1280x720

**결과물**: 정적인 전광판에서 제품이 서서히 화면 밖으로 돌출되는 아나모픽 광고 영상

---section---

## 서브그래프화 도전 과제

각 단계를 하나의 워크플로우 파일로 연결해봅시다.

**목표**: 5개 워크플로우를 각각 **Node Group(서브그래프)**으로 묶고, 단일 파이프라인으로 구성

**방법:**
1. 각 워크플로우의 핵심 노드 선택 → 우클릭 → **Convert to Group**
2. 그룹의 입력/출력 포트 정의 (이미지, 마스크, 비디오)
3. 그룹끼리 연결하여 자동화 파이프라인 완성

이 과정이 바로 **워크플로우 설계**의 핵심입니다.
