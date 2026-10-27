# 이미지 생성 방식 4가지 - T2I, I2I, Inpainting, Image Edit

## 학습 목표

입력 재료에 따라 이미지 생성 방식을 구분하고 한 워크플로우에서 결과를 비교합니다.

| 방식 | 입력 | 하는 일 |
|---|---|---|
| T2I | 글 | 글에서 새 이미지를 만듭니다. |
| I2I | 글 + 이미지 | 입력 이미지의 구도나 형태를 참고해 다시 만듭니다. |
| Inpainting | 글 + 이미지 + 마스크 | 마스크로 칠한 부분만 다시 만듭니다. |
| Image Edit | 편집 명령 + 이미지 | “재킷만 청재킷으로 바꿔 줘”처럼 바꿀 내용을 말로 지시합니다. |

<div class="lesson-example-row lesson-example-row--square">
  <figure>
    <img class="lesson-example-image" src="./downloads/session2/step1/park_walk.png" alt="초록색 필드 재킷을 입고 골든리트리버를 산책하는 남성 원본" style="width:100%;max-width:100%;" />
    <figcaption>원본 · 초록색 필드 재킷</figcaption>
  </figure>
  <figure>
    <img class="lesson-example-image" src="./downloads/session2/step1/park_walk_mask.png" alt="남성의 재킷 영역을 지정한 인페인팅 마스크" style="width:100%;max-width:100%;" />
    <figcaption>마스크 · 재킷 영역</figcaption>
  </figure>
  <figure>
    <img class="lesson-example-image" src="./lectures/images/session2/step1/qwen_edit_result.png" alt="남성의 재킷을 청재킷으로 바꾼 이미지 편집 결과" style="width:100%;max-width:100%;" />
    <figcaption>Image Edit 결과 · 청재킷</figcaption>
  </figure>
</div>

## 어떤 방식을 고를까요?

- 처음부터 만들면 **T2I**를 씁니다.
- 원본의 전체 구도를 참고하면 **I2I**를 씁니다.
- 바꿀 위치가 분명하면 **Inpainting**을 씁니다.
- 바꿀 내용을 문장으로 말하고 싶으면 **Image Edit**를 씁니다.

## 실습 프롬프트

### T2I와 I2I 공통 프롬프트

```prompt
A man in his 30s walking a golden retriever on a leash along a tree-lined path in a city park, sunny afternoon, natural light, photo
```

한국어 뜻:

```text
30대 남성이 화창한 오후, 나무가 늘어선 도심 공원 길에서 골든리트리버의 목줄을 잡고 산책하는 모습. 자연광의 사진.
```

### Inpainting 프롬프트

```prompt
In the masked area, change only the man's moss-green field jacket to a light blue denim jacket. Keep the same man, golden retriever, leash, park, pose, camera, and lighting unchanged.
```

한국어 뜻:

```text
마스크로 칠한 영역에서 남성의 이끼색 재킷만 연한 파란색 청재킷으로 바꿉니다. 남성, 골든리트리버, 목줄, 공원, 자세, 카메라와 빛은 그대로 둡니다.
```

### Image Edit 지시문

```prompt
Change only the man's moss-green field jacket to a light blue denim jacket. Keep exactly the same man, golden retriever, red leash, blue collar, park, pose, camera, lighting, and all other details unchanged. Preserve natural hands, paws, and the leash connection.
```

한국어 뜻:

```text
남성의 이끼색 재킷만 연한 파란색 청재킷으로 바꿉니다. 같은 남성, 골든리트리버, 빨간 목줄, 파란 목걸이, 공원, 자세, 카메라, 빛과 나머지 요소는 그대로 둡니다. 손과 발, 목줄 연결은 자연스럽게 유지합니다.
```

## Qwen 이미지 편집 4가지 비교

1. 워크플로우 JSON과 예제 이미지 두 장을 내려받습니다.
2. JSON 파일을 ComfyUI 캔버스에 끌어 놓습니다.
3. `park_walk.png`와 `park_walk_mask.png`를 해당 **Load Image** 노드에 올립니다.
4. 네 그룹의 프롬프트와 입력을 확인합니다.
5. **Run** 또는 **Queue**를 누릅니다.
6. 아래쪽 비교 시트에서 네 결과를 나란히 봅니다.

[[download: downloads/session2/step1/qwen_edit_4tasks.json | Qwen 이미지 편집 4가지 비교 템플릿 (.json)]]

[[download: downloads/session2/step1/park_walk.png | 예제 원본 - 공원 산책 장면 (.png)]]

[[download: downloads/session2/step1/park_walk_mask.png | 예제 마스크 - 남성 재킷 영역 (.png)]]

마스크는 고칠 위치를 알려 줍니다. 편집 명령은 무엇을 바꿀지 알려 줍니다. 두 입력의 역할이 다릅니다.

## 정리

같은 이미지 작업도 입력 재료에 따라 T2I, I2I, Inpainting, Image Edit로 나뉩니다.

---

**다음 강의**: 영상 생성 방식 네 가지를 비교합니다.
