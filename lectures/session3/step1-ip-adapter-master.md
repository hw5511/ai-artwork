# IP-Adapter 스타일 전이 마스터

---

## 학습 목표

- IP-Adapter Simple의 기본 개념과 작동 원리 이해
- 참조 이미지를 활용한 스타일 전이 기법 습득
- Weight 값 조정을 통한 참조 강도 제어 방법 학습
- Weight Type 설정에 따른 결과 차이점 파악
- 체크포인트와 LoRA 없이도 스타일을 적용하는 방법 이해

---

## IP-Adapter란?

IP-Adapter(Image Prompt Adapter)는 참조 이미지를 활용하여 AI 생성 이미지의 스타일을 제어하는 기법입니다.
기존 체크포인트나 LoRA 모델 없이도 단일 참조 이미지만으로 원하는 스타일을 적용할 수 있습니다.

### 주요 특징
- 텍스트 프롬프트와 이미지 참조의 결합
- 별도 모델 다운로드 불필요
- 실시간 스타일 참조 적용
- 다양한 Weight 조정 옵션

---

## Weight 값 조정의 효과

### Weight 0.8 (높은 값)
- 참조 이미지의 스타일이 강하게 반영
- 원본 참조 이미지와 유사한 색상과 분위기
- 프롬프트보다 이미지 참조가 우선

### Weight 0.2 (낮은 값)
- 프롬프트 위주의 생성
- 참조 이미지는 약하게 반영
- 원본 프롬프트의 의도가 더 명확히 표현

### Weight 0.1 (매우 낮은 값)
- 참조 이미지의 영향 최소화
- 거의 프롬프트만으로 생성
- 미묘한 스타일 힌트 정도만 적용

```settings
권장 Weight 범위: 0.1 ~ 1.0
초보자 권장값: 0.3 ~ 0.6
실험용 권장값: 0.1, 0.2, 0.8 비교 테스트
```

---

## 실습 파일 다운로드

### 워크플로우 파일

[[download: downloads/session3/ipadapter/ipadapter_advanced.json | IP-Adapter 워크플로우 다운로드]]

### 실습용 이미지

[[download: downloads/session3/ipadapter/aura.jpg | Aura 이미지 다운로드]]

[[download: downloads/session3/ipadapter/gold.webp | Gold 이미지 다운로드]]

[[download: downloads/session3/ipadapter/grass.jpg | Grass 이미지 다운로드]]

[[download: downloads/session3/ipadapter/seramic.png | Seramic 이미지 다운로드]]

### 이미지 미리보기

[[image: aura.jpg | width:50% | row]]
[[image: gold.webp | width:50% | row]]

[[image: grass.jpg | width:50% | row]]
[[image: seramic.png | width:50% | row]]

---

## 템플릿으로 실습해봅시다!

위에서 다운로드한 워크플로우와 이미지를 활용하여 IP-Adapter의 Weight 값을 조정하며 실습해보세요.

다양한 참조 이미지로 스타일 전이 효과를 실험하고, Weight 값 변경에 따른 결과 차이를 직접 확인해보세요.