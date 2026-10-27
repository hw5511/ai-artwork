# 영상 생성 방식 4가지 - T2V, I2V, FLF2V, R2V

## 학습 목표

영상의 시작 조건에 따라 네 가지 생성 방식을 구분합니다.

| 방식 | 입력 | 하는 일 |
|---|---|---|
| T2V | 글 | 글에서 새 영상을 만듭니다. |
| I2V | 글 + 첫 이미지 | 첫 장면에서 움직임을 이어 만듭니다. |
| FLF2V | 글 + 첫 이미지 + 마지막 이미지 | 시작과 끝 사이의 움직임을 만듭니다. |
| R2V | 글 + 레퍼런스 이미지 | 인물이나 대상의 특징을 참고해 영상을 만듭니다. |

## 예제 입력

<div class="lesson-example-row lesson-example-row--mixed">
  <figure><img class="lesson-example-image" src="./downloads/session2/step2/minimax_subject.png" alt="R2V 남성 인물 레퍼런스" style="width:100%;max-width:100%;" /><figcaption>R2V 인물 레퍼런스</figcaption></figure>
  <figure><img class="lesson-example-image" src="./downloads/session2/step2/minimax_first.png" alt="I2V와 FLF2V 첫 프레임" style="width:100%;max-width:100%;" /><figcaption>첫 프레임</figcaption></figure>
  <figure><img class="lesson-example-image" src="./downloads/session2/step2/minimax_last.png" alt="FLF2V 마지막 프레임" style="width:100%;max-width:100%;" /><figcaption>마지막 프레임</figcaption></figure>
</div>

## 실습 프롬프트

네 모드가 아래 문장을 함께 사용합니다.

```prompt
A man walks his golden retriever along a sunny park path, the dog trots ahead wagging its tail, slow side tracking shot, natural light
```

한국어 뜻:

```text
남성이 햇빛 드는 공원 길에서 골든리트리버를 산책시킵니다. 개는 꼬리를 흔들며 앞서 종종걸음으로 걷고, 카메라는 옆에서 천천히 따라갑니다. 자연광입니다.
```

로컬 모델 버전의 R2V 그룹은 레퍼런스 순서를 알려 주려고 아래 문장을 공통 프롬프트 앞에 자동으로 붙입니다.

```prompt
<Picture 1> is the man walking the golden retriever in this video.
```

한국어 뜻:

```text
<Picture 1>은 이 영상에서 골든리트리버와 걷는 남성입니다.
```

## MiniMax 네 가지 모드 실습

### 로컬 모델 버전

공개된 모델 파일을 ComfyUI에서 직접 실행합니다. API 호출 비용은 없지만, 내 PC 자원이나 Comfy Cloud의 GPU 시간을 사용합니다. 필요한 모델이 모두 있어야 실행할 수 있습니다.

[[download: downloads/session2/step2/minimax_4modes.json | MiniMax H3 로컬 모델 4가지 모드 템플릿 (.json)]]

### 유료 API 노드 버전

외부 서버의 MiniMax 모델을 API 노드로 실행합니다. 실행 전에 노드에 표시되는 크레딧을 확인합니다.

[[download: downloads/session2/step2/minimax_4modes_api.json | MiniMax H3 유료 API 노드 4가지 모드 템플릿 (.json)]]

### 예제 이미지

[[download: downloads/session2/step2/minimax_subject.png | 인물 레퍼런스 이미지 (.png)]]

[[download: downloads/session2/step2/minimax_first.png | 첫 프레임 이미지 (.png)]]

[[download: downloads/session2/step2/minimax_last.png | 마지막 프레임 이미지 (.png)]]

1. 먼저 로컬 모델 버전과 API 버전 중 하나를 고릅니다.
2. JSON 파일을 캔버스에 끌어 놓습니다.
3. 세 예제 이미지를 이름이 맞는 **Load Image** 노드에 올립니다.
4. 한 번에 비교하려면 네 그룹을 켭니다. 필요한 방식만 볼 때는 나머지 그룹을 선택하고 **Ctrl+B**로 건너뜁니다.
5. 실행 뒤 시작 조건이 결과에 어떻게 남는지 비교합니다.

## 정리

첫 장면, 마지막 장면, 대상 레퍼런스 중 무엇을 넣는지에 따라 영상의 제어 방법이 달라집니다.

---

**다음 강의**: 로컬 모델과 유료 API 노드의 차이를 비교합니다.
