# 프롬프트 엔지니어링 심화

## 학습 목표

프롬프트 엔지니어링은 AI 이미지 생성에서 가장 중요한 기술입니다. 이번 단계에서는 2025년 최신 프롬프트 작성 기법을 학습합니다.

---

## 프롬프트 엔지니어링이란?

프롬프트 엔지니어링은 AI가 원하는 이미지를 생성하도록 명령어를 최적화하는 기술입니다.

### 핵심 개념

**1. 가중치 시스템**:
- 괄호로 강조: `(keyword)` = 1.1배, `((keyword))` = 1.21배
- 정확한 값 지정: `(keyword:1.3)` 형태
- 대괄호로 약화: `[keyword]` = 0.9배
- 실전 권장: 주요 피사체 1.2~1.4, 스타일 1.1~1.2

**2. 2025년 네거티브 프롬프트 전략**:
- **FLUX 모델**: 네거티브 거의 불필요, 자연어로 "avoid" 표현 사용
- **SDXL 모델**: 최소한의 네거티브만 사용 (기존 대비 80% 단축)
- **SD 1.5 모델**: 여전히 상세한 네거티브 프롬프트 필요
- 모델별로 전략이 완전히 다르므로 주의

**3. 와일드카드 활용**:
- Combinational Prompts 노드 사용
- `{option1|option2|option3}` 형식으로 랜덤 선택
- 다양한 변형 이미지를 자동 생성
- 예시: `{woman|man}, {blonde|brunette|red} hair`

**4. 카메라 구도와 촬영 기법**:
- 프레이밍: Single Shot, Two Shot, POV Shot 등
- 샷 크기: Close-Up, Medium Shot, Long Shot 등
- 촬영 각도: Eye-Level, Low-Angle, High-Angle 등
- 초점: Shallow Depth of Field, Bokeh 등
- 조명: Three-Point Lighting, Rim Lighting 등

**5. 모델별 최적화**:
- **FLUX**: 자연어 기반, 긴 프롬프트 효과적
- **SDXL**: 균형잡힌 구조화, 품질 키워드 효과 높음
- **SD 1.5**: 키워드 나열식, 가중치 적극 활용

**6. 고급 프롬프트 구조**:
- [품질 키워드] + [주체 설명] + [스타일 지정] + [구도/시점] + [조명/분위기] + [세부 디테일] + [기술적 키워드]
- 카테고리별 키워드 데이터베이스 활용
- 조명 및 분위기 키워드 체계적 사용

---

## 상세 학습 가이드

프롬프트 엔지니어링의 모든 기법과 실전 예제를 담은 2025년 최신 가이드를 제공합니다.

아래 버튼을 클릭하여 상세 가이드를 새 탭에서 확인하세요:

<a href="/lectures/downloads/session2/prompt_guide.html" target="_blank" rel="noopener noreferrer">
  <button style="
    background-color: #3498db;
    color: white;
    padding: 16px 32px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    margin: 20px 0;
  " onmouseover="this.style.backgroundColor='#2980b9'" onmouseout="this.style.backgroundColor='#3498db'">
    📚 프롬프트 엔지니어링 가이드 2025 열기
  </button>
</a>
