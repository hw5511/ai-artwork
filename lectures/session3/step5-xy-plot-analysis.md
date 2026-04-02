# XY Plot 매개변수 분석

---

## 학습목표
- XY Plot 시스템의 개념과 활용법 이해
- 2차원 그리드를 통한 효율적인 매개변수 비교 분석
- Efficient 노드를 활용한 워크플로우 최적화
- 다양한 매개변수 조합 실험 및 결과 분석
- 시간 효율적인 최적화 방법론 습득

---

## 핵심내용

### XY Plot 시스템 개념
XY Plot은 2차원 그리드 배열을 통해 매개변수를 체계적으로 비교하는 강력한 분석 도구입니다.

**기본 원리**:
- X축과 Y축에 서로 다른 변수를 설정
- 한 번의 실행으로 모든 조합을 자동 테스트
- 그리드 형태로 결과를 직관적으로 비교
- 매개변수 간의 상호작용 효과 분석

**주요 장점**:
- 시간 효율성: 수십 개 조합을 한 번에 테스트
- 체계적 분석: 변수별 영향도 명확히 파악
- 결과 비교: 그리드 상단 타이틀로 변수 확인 가능
- 최적화 지원: 최고 품질 조합 식별

### 효율적인 노드 구성

#### Efficient Loader 활용
기존 체크포인트 로더를 Efficient Loader로 교체하여 관리를 간소화합니다.

```settings
노드 변경: Checkpoint Loader → Efficient Loader
기능: 체크포인트, VAE, LoRA 통합 관리
장점: 연결선 정리, 인터페이스 단순화
```

#### KSampler Efficient 적용
기존 K-Sampler를 KSampler Efficient로 교체하여 매개변수를 통합 관리합니다.

```settings
노드 변경: KSampler → KSampler Efficient
통합 기능: 샘플링 설정, 시드 관리
연동성: XY Plot과 완벽 호환
```

---

## 실습 파일 다운로드

### 워크플로우 파일

[[download: downloads/session3/xyplot.json | XY Plot 워크플로우 다운로드]]

---

## 아래의 템플릿으로 실습해봅시다!

위에서 다운로드한 XY Plot 워크플로우를 활용하여 다양한 매개변수 조합을 실험해보세요.

X축과 Y축에 서로 다른 변수(CFG Scale, Steps, Scheduler 등)를 설정하고, 그리드 형태로 결과를 비교하며 최적의 설정 조합을 찾아보세요.