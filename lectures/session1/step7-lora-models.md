# LoRA 모델 탐험

[[image: session2/step1/lora.PNG]]

## LoRA(Low-Rank Adaptation)란?

LoRA는 체크포인트 모델을 수정하지 않고도 새로운 스타일이나 캐릭터를 학습시킬 수 있는 기술입니다.  
기존 모델에 '추가 레이어'를 더하는 방식으로, 원본을 건드리지 않으면서도 새로운 기능을 부여합니다.

## 로라 기본 개념

### 체크포인트 vs LoRA 비교

```comparison
체크포인트 모델:
- 기본 토대 (집의 기초 구조)
- 전체적인 스타일 결정
- 용량: 2~12GB
- 교체 시: 완전히 다른 결과

LoRA 모델:
- 추가 장식 (집의 인테리어)
- 세부적인 스타일 조정
- 용량: 50~500MB
- 추가 시: 기존 결과에 변화 더함
```

---section---

## LoRA 적용 실습

ComfyCloud에는 별도 다운로드 없이 바로 사용할 수 있는 LoRA 모델이 내장되어 있습니다.
모델 라이브러리에서 원하는 LoRA를 선택하면 워크플로우에 바로 적용됩니다.

### ComfyCloud 모델 라이브러리에서 LoRA 불러오기

1. 좌측 사이드바 **모델 아이콘** 클릭
2. **Loras** 카테고리 선택
3. 원하는 LoRA 모델의 **"사용" 버튼** 클릭
4. 캔버스에 **Load LoRA 노드**가 추가됨
5. Load Checkpoint 노드와 연결하여 사용

---section---

### 실습 1: 동양화 스타일 LoRA 실습 (MoXin)

**MoXin** LoRA는 중국 전통 동양화(수묵화) 스타일을 구현하는 LoRA입니다.
아래 워크플로우 파일을 받아 ComfyCloud에서 바로 불러올 수 있습니다.

[[download: downloads/session2/step1/moxin_lora.json | MoXin 동양화 워크플로우 다운로드 (.json)]]

> 워크플로우에는 Load Checkpoint(SD 1.5 계열), Load LoRA(MoXin), 프롬프트가 이미 세팅되어 있습니다.
> 파일을 열면 아래 상태로 준비됩니다:
> ```
> shuimobysim, a painting of mountains and river,
> traditional chinese painting, ink wash, masterpiece
> ```

#### 실습 순서

**1단계: LoRA bypass 상태로 실행**
- 워크플로우를 열면 Load LoRA 노드가 **bypass(비활성)** 상태입니다
- 그대로 이미지를 생성해 LoRA 없는 원본 결과를 확인합니다

**2단계: bypass 해제 후 실행**
- Load LoRA 노드의 **bypass를 해제**합니다
- 동일한 프롬프트로 다시 생성하여 동양화 스타일이 어떻게 적용되는지 비교합니다

**3단계: 강도 실험**
- Load LoRA 노드의 **strength** 값을 변경하며 동양화 효과의 강도 차이를 확인합니다

| strength | 효과 |
|----------|------|
| 0.4 | 은은한 동양화 느낌 |
| 0.7 | 뚜렷한 수묵화 스타일 |
| 1.0 | 강한 동양화 스타일 |

---section---

### 실습 2: 수채화 스타일 LoRA 실습

**Ars MidJourney Watercolor** LoRA를 사용하여 수채화 스타일 이미지를 생성해봅시다.

Illustrious-XL은 선명한 애니메이션/일러스트 스타일로 그리는 반면,
수채화 LoRA를 추가하면 색이 번지고 경계가 흐릿한 수채화 질감으로 바뀝니다.
피사체가 있는 정물 프롬프트를 사용하면 이 차이가 가장 뚜렷하게 드러납니다.

#### 워크플로우 구성
1. **Load Checkpoint**: `Illustrious-XL` 선택
2. **Load LoRA**: 모델 라이브러리에서 `Ars MidJourney Watercolor` 선택
3. **프롬프트 입력**:
```prompt
a glass vase with blooming roses and wildflowers on a wooden table,
soft morning light through window, delicate petals,
pastel tones, botanical still life
```
4. LoRA **bypass 상태**로 먼저 생성 → bypass 해제 후 재생성하여 비교

#### 관찰 포인트
- **LoRA 없음(bypass)**: Illustrious-XL 특유의 선명한 윤곽선과 채색
- **LoRA 적용**: 수채화 특유의 색 번짐, 흐릿한 경계, 종이 질감

#### LoRA 강도 실험
LoRA 노드의 **strength** 값을 변경하며 수채화 효과의 강도 차이를 확인합니다.

| strength | 효과 |
|----------|------|
| 0.4 | 살짝 부드러운 일러스트 느낌 |
| 0.7 | 수채화 질감이 뚜렷하게 표현 |
| 1.0 | 강한 수채화 번짐 효과 |

---section---

### 실습 3: 애니메이션 스타일 LoRA 실습

**Retro Sci-fi 90's anime style** LoRA를 사용하여 레트로 애니메이션 스타일을 적용해봅시다.

#### 워크플로우 구성
1. **Load Checkpoint**: `Illustrious-XL` 또는 `WAI-illustrious-SDXL` 선택
2. **Load LoRA**: 모델 라이브러리에서 `Retro Sci-fi 90's anime style` 선택
3. **프롬프트 입력**:
```prompt
1girl, retro anime style, 90s aesthetic, colorful,
vibrant colors, detailed illustration
```
4. LoRA 비활성화/활성화 상태로 각각 생성하며 비교
5. 강도를 `0.5`, `0.8`, `1.2`로 변경하며 스타일 반영 정도 확인

---section---

## 추가 실습 과제

ComfyCloud에서 제공하는 다양한 스타일 LoRA를 자유롭게 탐색해보세요.

### ComfyCloud 제공 주요 스타일 LoRA

| LoRA | 효과 |
|------|------|
| Ars MidJourney Watercolor | 수채화 스타일 |
| Retro Sci-fi 90's anime style | 레트로 애니메이션 스타일 |
| Stained Glass | 스테인드글라스 스타일 |
| 50s Noir Movie | 흑백 누아르 영화 스타일 |
| 50s Panavision Movie | 50년대 영화 스타일 |
| Low-key lighting Style XL | 저조도 조명 스타일 |

### 자유 실습 가이드

1. **모델 라이브러리 탐색**: Loras 카테고리에서 원하는 LoRA 선택
2. **워크플로우 구성**: Load LoRA 노드를 추가하여 체크포인트에 연결
3. **강도 실험**: strength 값을 0.4~1.2 범위에서 조절하며 비교

### 다중 LoRA 실험

LoRA 노드를 2개 중첩하여 사용하면 두 스타일이 어떻게 조합되는지 테스트해보세요.

**연결 예시**:
```connection
Load Checkpoint → LoRA 1 → LoRA 2 → CLIP Text Encode
                    ↓        ↓
                          KSampler
```

**실험 아이디어**:
- Watercolor LoRA + Low-key lighting LoRA 조합
- Anime style LoRA + Stained Glass LoRA 중첩
- 같은 LoRA를 다른 강도로 2번 적용

다양한 조합을 시도하며 자신만의 독특한 스타일을 만들어보세요!