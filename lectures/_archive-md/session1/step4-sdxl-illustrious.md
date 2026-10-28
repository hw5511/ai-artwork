# 모델 바꾸기 - SDXL base와 Illustrious 비교

## 학습 목표

같은 프롬프트와 생성 설정을 두 모델에 연결하고 결과의 차이를 봅니다.

[[download: downloads/session1/step4/sdxl_vs_illustrious.json | SDXL base와 Illustrious 비교 워크플로우 다운로드 (.json)]]

## 두 모델

- **SDXL base**는 범용 베이스 모델입니다.
- **Illustrious**는 SDXL 계열에서 일러스트 표현에 맞게 추가 학습된 모델입니다.

워크플로우에는 `sd_xl_base_1.0.safetensors`와 수업에서 사용한 `wai-illustrious-sdxl.safetensors`가 지정되어 있습니다.

## 실습 프롬프트

두 모델에 아래 문장을 그대로 함께 보냅니다. Illustrious에도 같은 문장을 써야 모델 자체의 표현 차이를 볼 수 있습니다.

```prompt
A man in his 30s walking a golden retriever on a leash along a tree-lined path in a city park, sunny afternoon, natural light, photo
```

한국어 뜻:

```text
30대 남성이 화창한 오후, 나무가 늘어선 도심 공원 길에서 골든리트리버의 목줄을 잡고 산책하는 모습. 자연광의 사진.
```

## 비교 실습

1. JSON 파일을 ComfyUI 캔버스에 끌어 놓습니다.
2. 왼쪽의 긍정 프롬프트와 부정 프롬프트를 확인합니다. 두 모델이 같은 글을 함께 사용합니다.
3. 두 **KSampler**의 seed, steps, cfg, sampler, scheduler가 같은지 확인합니다.
4. 두 **Empty Latent Image**가 모두 1024×1024인지 확인합니다.
5. **Run** 또는 **Queue**를 누릅니다.
6. 두 **Save Image** 결과에서 구도, 질감, 선 표현, 색감을 비교합니다.

같은 입력과 설정을 써야 모델 차이에 집중할 수 있습니다.

## 기존 예시 보기

<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;">
  <figure style="margin:0;"><img src="./lectures/images/session1/step6/sdxl_1024.png" alt="SDXL base로 만든 고양이 사진 예시" style="width:100%;"/><figcaption>SDXL base 예시</figcaption></figure>
  <figure style="margin:0;"><img src="./lectures/images/session1/step6/wai_illustrous.png" alt="WAI Illustrious로 만든 일러스트 예시" style="width:100%;"/><figcaption>WAI Illustrious 예시</figcaption></figure>
</div>

> 이 두 이미지는 프롬프트와 시드가 서로 다릅니다. 모델의 공정한 비교 결과가 아니라 각 모델의 기존 수업 예시입니다. 같은 프롬프트·같은 시드 비교 이미지는 추후 교체합니다.

## 정리

모델을 비교할 때는 프롬프트, 시드, 샘플러와 이미지 크기를 같게 맞춥니다.

---

**다음 강의**: LTX 2.5 T2V 공식 템플릿으로 영상을 만듭니다.
