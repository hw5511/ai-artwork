# 프롬프트 심화 — Wildcard로 변형 탐색하기

---

## ImpactWildcardEncode란?

ImpactPack 커스텀 노드 중 하나로, 기존 `CLIPTextEncode` 노드를 대체합니다.
프롬프트 안에 **와일드카드 문법**을 넣으면 실행할 때마다 자동으로 다른 값을 골라서 이미지를 생성합니다.

### 기존 방식 vs Wildcard 방식

```settings
기존: CLIPTextEncode → "portrait of a woman, close-up shot, high quality"
      → 매번 동일한 이미지

Wildcard: ImpactWildcardEncode → "portrait of a woman, {close-up shot|medium shot|long shot}, high quality"
          → 실행마다 샷크기가 랜덤으로 바뀌며 다양한 결과 생성
```

---

## 워크플로우 준비

[[download: downloads/session2/wildcard_workflow.json | Wildcard 워크플로우 다운로드]]

**워크플로우 열기:**
1. 다운로드한 `wildcard_workflow.json`을 ComfyUI에 드래그 앤 드롭
2. 워크플로우가 자동 로드됩니다

### 노드 구조

```settings
[CheckpointLoaderSimple]   — 체크포인트 모델 로드
        ↓ model / clip
[ImpactWildcardEncode]     — 와일드카드 처리 + CLIP 인코딩
        ↓ conditioning / model
[KSampler]                 — 이미지 생성
        ↓
[VAEDecode] → [SaveImage]
```

`CLIPTextEncode(positive)` 자리를 `ImpactWildcardEncode`가 대체합니다.

---

## 와일드카드 문법

### 기본 랜덤 선택

```settings
{a|b|c}          — a, b, c 중 하나를 랜덤 선택
{red|blue|green} — 색상 중 하나 선택
```

### 가중 확률 선택

```settings
{3::a|2::b|c}    — a가 3배, b가 2배, c가 1배 확률
예: {3::close-up shot|2::medium shot|long shot}
    → close-up이 가장 자주 나오게 설정
```

### 복수 선택

```settings
{2$$a|b|c}         — a, b, c 중 2개를 골라 공백으로 연결
{2$$, $$a|b|c}     — 2개를 골라 ", "로 연결
예: {2$$, $$rim lighting|golden hour|soft light|dramatic lighting}
    → "rim lighting, soft light" 형태로 조명 두 개 동시 적용
```

### 외부 파일 참조

```settings
__파일명__    — wildcards 폴더의 txt 파일에서 랜덤 1줄 선택
```

---

## 카메라 구도와 조명 키워드

와일드카드에 넣어서 활용할 키워드 목록입니다.

### 샷 크기 (Shot Size)

| 키워드 | 설명 |
|--------|------|
| `extreme close-up shot` | 눈, 입 등 극단적 확대 |
| `close-up shot` | 얼굴/물체에 밀착 |
| `medium close-up shot` | 가슴~머리, 표정 중심 |
| `medium shot` | 허리 위, 대화 장면에 많이 사용 |
| `full shot` | 머리부터 발끝까지 |
| `long shot` | 피사체 전체 + 배경 |
| `extra wide shot` | 광활한 풍경, 대규모 배경 |

### 촬영 각도 (Shot Angle)

| 키워드 | 설명 | 효과 |
|--------|------|------|
| `eye-level shot` | 피사체 눈높이 | 중립적, 자연스러운 시점 |
| `low-angle shot` | 아래에서 위로 | 피사체가 강하고 위압적으로 보임 |
| `high-angle shot` | 위에서 아래로 | 피사체가 작고 취약해 보임 |
| `dutch angle shot` | 카메라를 기울임 | 긴장감, 불안정한 분위기 |
| `bird's-eye-view shot` | 수직 탑뷰 | 지도처럼 평면적 |
| `aerial shot` | 드론/비행 시점 | 광활하고 장대한 느낌 |
| `POV shot` | 1인칭 시점 | 몰입감 |

### 초점 (Focus)

| 키워드 | 설명 |
|--------|------|
| `shallow depth of field, bokeh` | 피사체만 선명, 배경 흐림 |
| `deep focus` | 전경~배경 모두 선명 |
| `soft focus` | 전체적으로 부드럽고 몽환적 |
| `tilt shift` | 선택적 초점, 미니어처 효과 |

### 조명 (Lighting)

| 키워드 | 설명 | 분위기 |
|--------|------|--------|
| `three-point lighting` | 주조명+보조+역광 | 전문적인 스튜디오 느낌 |
| `rim lighting` | 역광으로 윤곽선 강조 | 후광 효과, 드라마틱 |
| `high-key lighting` | 밝고 그림자 최소 | 밝고 긍정적 |
| `low-key lighting` | 어둡고 선택적 조명 | 극적, 누아르 |
| `golden hour` | 일출/일몰 자연광 | 따뜻하고 시네마틱 |
| `dramatic lighting` | 강한 명암 대비 | 강렬하고 인상적 |
| `soft light` | 확산된 빛, 그림자 최소 | 부드럽고 온화 |
| `backlighting` | 피사체 뒤에서 조명 | 실루엣, 신비로운 느낌 |

---

## 가중치 문법

프롬프트 안에서 특정 단어의 영향력을 숫자로 조절하는 SD/ComfyUI 전용 문법입니다.

### 기본 문법

```settings
(keyword)        = 1.1배 강조
((keyword))      = 1.21배 강조
(keyword:1.3)    = 정확히 1.3배 지정

[keyword]        = 0.9배 약화
(keyword:0.7)    = 정확히 0.7배 지정
```

### 실전 권장 범위

| 용도 | 추천 범위 | 예시 |
|------|---------|------|
| 주요 피사체 강조 | 1.2 ~ 1.4 | `(portrait of woman:1.3)` |
| 스타일 강조 | 1.1 ~ 1.2 | `(oil painting:1.2)` |
| 조명/분위기 강조 | 1.1 ~ 1.3 | `(dramatic lighting:1.2)` |
| 배경 약화 | 0.7 ~ 0.9 | `(background:0.8)` |
| 품질 키워드 | 1.1 | `(masterpiece:1.1)` |

> **주의**: 1.5 이상은 이미지가 깨지거나 왜곡될 수 있습니다. 조금씩 조절하세요.

와일드카드 안에도 가중치 문법을 그대로 사용할 수 있습니다:

```settings
{(dramatic lighting:1.4)|(soft light:1.1)|golden hour}
```

---

## 실습 1: 샷크기 × 조명 랜덤 탐색

와일드카드로 두 변수를 동시에 바꿔가며 다양한 조합을 탐색합니다.

### wildcard_text 설정

```prompt
portrait of a woman, {close-up shot|medium shot|long shot}, {rim lighting|golden hour|soft light|dramatic lighting}, (high quality:1.1)
```

### 실행 방법

1. Queue Prompt를 여러 번 클릭
2. 실행마다 `populated_text` 창에 실제로 선택된 조합이 표시됨
   예: `portrait of a woman, medium shot, golden hour, (high quality:1.1)`
3. 마음에 드는 조합이 나왔을 때 `populated_text` 값을 확인하고 기록

> **팁**: mode를 `reproduce`로 바꾸면 마지막 결과를 동일하게 재현할 수 있습니다.

---

## 실습 2: 가중치 포함 조합 탐색

가중치를 조합에 포함시켜 강도까지 변화를 줍니다.

### wildcard_text 설정

```prompt
portrait of a woman, medium shot, {(rim lighting:1.4)|(golden hour:1.1)|(dramatic lighting:1.2)|soft light}, {oil painting style|watercolor style|digital art style}, high quality
```

Queue를 여러 번 실행하며 조명 강도와 스타일의 조합이 어떻게 달라지는지 확인하세요.

---

## 자유 실습

위 키워드 표에서 원하는 것을 골라 직접 와일드카드를 구성해보세요.

**조합 아이디어:**

```prompt
a woman, {eye-level shot|low-angle shot|bird's-eye-view shot}, {bokeh|deep focus|soft focus}, {three-point lighting|rim lighting|low-key lighting}, (masterpiece:1.1)
```

```prompt
cityscape at night, {aerial shot|long shot|extra wide shot}, {dramatic lighting|golden hour|backlighting}, high quality
```

**팁**: `{}` 블록을 3~4개 이상 넣으면 조합이 너무 많아집니다. 2~3개가 탐색하기 적당합니다.
