# 임베딩 활용하기

[[image: embed.PNG]]

## 임베딩(Embedding)이란?

임베딩은 프롬프트의 단축키 같은 개념입니다.  
복잡한 스타일이나 특징을 간단한 키워드로 호출할 수 있게 해줍니다.

### 임베딩 vs 체크포인트/LoRA
```settings
체크포인트: 전체 모델 교체 (전체 스타일 변경)
LoRA: 특정 스타일 추가 학습 (부분 스타일 추가)
임베딩: 프롬프트 단축키 (설명 간소화)
```

---section---

## 임베드 사용하기 실습

이제 실제로 임베딩을 사용하여 체크포인트 모델이 아는 것과 모르는 것의 차이를 체험해봅시다.

### 1단계: 기본 이미지 생성

RunDiffusion을 실행하면 나오는 기본 default 워크플로우에서 진행합니다.

#### 설정
1. **CFG Scale**: `15`로 설정
2. **체크포인트 모델**: `Astranime` 선택
3. **프롬프트 입력**:
```prompt
solo, 1girl, cowboy-shot, white shirts
```
4. **이미지 생성**: Queue Prompt 버튼 클릭

### 2단계: 체크포인트가 아는 스타일 테스트

이번에는 프롬프트에 특정 아티스트 스타일을 추가해봅시다.

#### 프롬프트 수정
```prompt
solo, 1girl, cowboy-shot, white shirts, Kuvshinov style
```

**실습에서 이미지 생성 후 확인**: [Kuvshinov 작품 검색](https://www.google.com/search?q=kuvshinov)하여 스타일 비교

**설명**:
체크포인트 모델에 이미 학습된 스타일의 경우, 프롬프트에 언급하면 자동으로 반영됩니다. 즉, **체크포인트가 알고 있는 것은 표현이 가능합니다!**

### 3단계: 체크포인트가 모르는 캐릭터 테스트

이제 특정 애니메이션 캐릭터를 추가해봅시다.

#### 프롬프트 수정
"Kuvshinov style"을 제거하고 캐릭터 이름을 추가합니다:
```prompt
solo, 1girl, cowboy-shot, white shirts, chainsaw-man makima
```

**이미지 생성 후 확인**:
마키마 캐릭터의 특징(빨간 머리, 노란 눈의 링 등)이 제대로 반영되지 않은 것을 확인할 수 있습니다.

**설명**:
체크포인트 모델이 학습하지 않은 캐릭터는 프롬프트에 작성해도 제대로 표현되지 않습니다. **체크포인트 모델이 모르는 것은 적용이 안됩니다!**

### 4단계: 임베딩 다운로드 및 적용

**Civitai에서 다운로드**: [Makima Embedding](https://civitai.com/models/4049/makima-embedding)

임베딩 파일을 `models/embeddings` 폴더에 저장 후, 프롬프트에서 `embedding:EMB_sksmakimatest`를 입력하여 사용합니다.

### 5단계: 결과 비교

임베딩 사용 전후를 비교하여 캐릭터 특징(빨간 머리, 노란 눈의 링 등)이 정확하게 표현되는지 확인합니다.

---section---

## 임베딩 추가 활용법

임베딩은 프롬프트 단축어 개념에 가깝기 때문에, 다양한 방식으로 활용할 수 있습니다.

### Negative Prompt용 임베딩

임베딩의 가장 대표적인 활용 사례는 **네거티브 프롬프트용 임베딩**입니다.

#### 왜 Negative Prompt 임베딩을 사용할까?

일반적으로 좋은 이미지를 생성하기 위해 네거티브 프롬프트에 입력하는 내용은 매우 길고 복잡합니다:

```prompt
low quality, blurry, pixelated, jpeg artifacts, poorly drawn hands,
poorly drawn face, bad anatomy, bad proportions, extra limbs,
cloned face, malformed limbs, missing arms, missing legs,
extra arms, extra legs, fused fingers, too many fingers,
long neck, cross-eyed, mutated hands, bad body, bad hands,
text, error, watermark, signature, username, artist name
```

이런 긴 프롬프트를 매번 입력하는 대신, **네거티브 임베딩 하나로 대체**할 수 있습니다.

#### 인기 있는 Negative Embedding 예시

**EasyNegative**:
- 다운로드: [https://civitai.com/models/7808/easynegative](https://civitai.com/models/7808/easynegative)
- 용량: 약 25KB
- 사용법: Negative Prompt에 `embedding:EasyNegative` 입력

**BadDream & UnrealisticDream**:
- SDXL 모델용 네거티브 임베딩
- 저품질 요소와 비현실적 요소를 효과적으로 제거