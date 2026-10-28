# 강의록 작성 가이드

## 파일 구조

### 디렉토리 구조
```
lectures/
├── toc.json                 # 목차 파일
├── session1/                # 1회차 폴더
│   ├── step1-intro.md      # Step 1 파일
│   ├── step2-xxx.md        # Step 2 파일
│   └── step3-xxx.md        # Step 3 파일
├── session2/                # 2회차 폴더
│   └── ...
└── LECTURE_WRITING_GUIDE.md # 이 문서
```

### 파일명 규칙
- 형식: `step[번호]-[주제].md`
- 예시: `step1-intro.md`, `step2-install.md`, `step3-first-image.md`

---

## 목차 파일 (toc.json) 구조

```json
[
  {
    "id": "session1",
    "title": "1회차 - [회차 제목]",
    "steps": [
      {
        "id": "step1",
        "title": "Step 1. [스텝 제목]",
        "file": "session1/step1-[파일명].md"
      }
    ]
  }
]
```

---

## 마크다운 작성 규칙

### 1. 제목 구조
```markdown
# Step [번호]. [메인 제목]

## [섹션 제목]

### [서브섹션 제목]
```

### 2. 코드블록 종류

#### 프롬프트 (복사 가능)
````markdown
```prompt
masterpiece, best quality, 1girl
```
````

#### 네거티브 프롬프트
````markdown
```negative
worst quality, low quality
```
````

#### 파일명
````markdown
```filename
model-name.safetensors
```
````

#### 설정값
````markdown
```settings
Sampling Steps: 20
CFG Scale: 7
```
````

#### 일반 코드
````markdown
```python
import torch
```
````

### 3. 섹션 구분자

강의록에서 논리적 섹션을 구분하고 싶을 때 섹션 구분자를 사용할 수 있습니다.

#### 사용법
```markdown
---section---
```

#### 렌더링 결과
- 가로 그라데이션 라인과 함께 "SECTION" 텍스트가 중앙에 표시됩니다
- 섹션 간 명확한 시각적 구분을 제공합니다

#### 활용 예시
```markdown
## 이론 설명

Stable Diffusion의 기본 원리를 설명합니다...

---section---

## 실습

이제 직접 실습해봅시다...

---section---

## 정리

오늘 배운 내용을 정리하면...
```

#### 주의사항
- 일반 수평선(`---`)과는 다른 용도입니다
- 일반 수평선: 단순 구분선
- 섹션 구분자(`---section---`): 강조된 섹션 전환

### 4. 문서 작성 주의사항

#### 반드시 지켜야 할 규칙
- **이모지 사용 금지**: 강의록에는 이모지를 절대 사용하지 않음
- **간결한 문장**: 핵심만 명확하게 전달
- **실습 중심**: 이론보다 실제 사용법 위주
- **코드블록 활용**: 복사가 필요한 내용은 반드시 코드블록으로

#### 권장사항
- 각 Step은 5-10분 분량으로 작성
- 스크린샷보다 텍스트 설명 선호
- 단계별 설명은 번호 리스트 사용
- 중요 내용은 **볼드** 처리

### 5. 콘텐츠 구성 템플릿

```markdown
# Step [번호]. [제목]

## 학습 목표
[이번 스텝에서 배울 내용 간단 설명]

## 핵심 내용
[메인 설명]

## 실습
[따라할 수 있는 구체적인 예시]

```[코드블록 종류]
[복사 가능한 내용]
```

## 정리
[핵심 내용 요약]

---

**다음 강의**: [다음 스텝 예고]
```

---

## 샘플 강의록

### 좋은 예시
```markdown
# Step 1. AI 이미지 생성 입문

## 학습 목표
Stable Diffusion의 기본 개념을 이해하고 첫 이미지를 생성합니다.

## 기본 프롬프트 작성법

프롬프트는 쉼표로 구분된 키워드들의 조합입니다.

```prompt
masterpiece, best quality, 1girl, blue eyes, long hair
```

## 네거티브 프롬프트

원하지 않는 요소를 제외합니다:

```negative
worst quality, low quality, blurry
```

---

**다음 강의**: Step 2에서는 모델 설치를 진행합니다.
```

### 나쁜 예시 (이모지 사용)
```markdown
# Step 1. AI 이미지 생성 입문 🎨  ← 이모지 사용 금지!

## 😊 학습 목표  ← 이모지 사용 금지!
```

---

## 새 강의 추가 방법

1. **세션 폴더 생성** (필요시)
   ```bash
   mkdir lectures/session[번호]
   ```

2. **마크다운 파일 작성**
   ```bash
   lectures/session[번호]/step[번호]-[주제].md
   ```

3. **toc.json 업데이트**
   - 해당 세션과 스텝 정보 추가

4. **테스트**
   - 브라우저에서 강의록 탭 접속
   - 새 콘텐츠 정상 로드 확인

---

## 체크리스트

새 강의록 작성 시 확인사항:

- [ ] 파일명 규칙 준수 (step번호-주제.md)
- [ ] toc.json에 등록
- [ ] 이모지 미사용 확인
- [ ] 코드블록 타입 적절히 지정
- [ ] 복사 가능한 내용은 코드블록으로
- [ ] 섹션 구분이 필요한 경우 `---section---` 사용
- [ ] 다음 강의 안내 포함

---

## 문의사항

강의록 작성 관련 문의는 프로젝트 관리자에게 연락하세요.