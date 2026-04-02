# LoRA 모델 탐험

[[image: lora.PNG]]

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

step6에서 LoRA를 추가하고 적용하는 방법을 배웠습니다. 이번에는 다양한 LoRA 모델을 직접 다운로드하고 테스트해봅시다.

### 권장 LoRA 모델

다음 LoRA 모델들을 Civitai에서 다운로드하여 실습에 활용할 수 있습니다:

- **ChilloutMix**: https://civitai.com/models/6424/chilloutmix?modelVersionId=11745
- **Moxin (동양화 스타일)**: https://civitai.com/models/12597/moxin?modelVersionId=14856
- **Makima (체인소맨)**: https://civitai.com/models/5373/makima-chainsaw-man-lora?modelVersionId=6244

[[download: downloads/session1/lora/download_guide.txt | 다운로드 가이드]] - RunDiffusion FILES ONLY 모드에서 `cd /models/lora/custom/v1/` 이동 후 `aria2c "모델URL?token=YOUR_API_KEY"` 명령어로 다운로드

---section---

### 실습 1: 동양화 스타일 LoRA 실습

[[download: downloads/session1/lora/lora_workflow.json | 동양화 워크플로우 다운로드]] - 워크플로우 다운로드 후 Load하여 열기 → LoRA 비활성화/활성화 상태로 각각 생성하며 비교 → 강도를 0.4, 0.7, 1.0으로 변경하며 차이 확인

---section---

### 실습 2: 캐릭터 LoRA 실습 (마키마)

[[download: downloads/session1/lora/lora_makima.json | 마키마 워크플로우 다운로드]] - 워크플로우 다운로드 후 Load하여 열기 → LoRA 비활성화/활성화 상태로 각각 생성하며 비교 → 강도를 0.5, 0.8, 1.2로 변경하며 캐릭터 특징 반영 정도 확인

---section---

## 추가 실습 과제

위의 실습 방법을 활용하여 Civitai에서 원하는 LoRA 모델을 직접 다운로드하고 적용해보세요.

### 자유 실습 가이드

1. **Civitai 탐색**: [https://civitai.com](https://civitai.com)에서 관심 있는 LoRA 검색
2. **모델 다운로드**: aria2c를 활용하여 RunDiffusion에 다운로드
3. **워크플로우 구성**: Load LoRA 노드를 추가하여 적용
4. **강도 실험**: 다양한 강도 값으로 테스트하며 결과 비교

### 다중 LoRA 실험

LoRA 노드를 2개 또는 3개 중첩하여 사용하면 어떻게 스타일이 조합되는지 테스트해보세요.

**연결 예시**:
```connection
Load Checkpoint → LoRA 1 → LoRA 2 → LoRA 3 → CLIP Text Encode
                    ↓        ↓        ↓
                          KSampler
```

**실험 아이디어**:
- 스타일 LoRA + 캐릭터 LoRA 조합
- 여러 캐릭터 LoRA 동시 적용
- 스타일 LoRA를 다양한 강도로 중첩

다양한 조합을 시도하며 자신만의 독특한 스타일을 만들어보세요!