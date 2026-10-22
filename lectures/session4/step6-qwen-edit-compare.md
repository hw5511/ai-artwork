# Qwen 이미지 편집 4가지 비교

## 실습 목표

Qwen-Image-Edit 2511 한 모델로 네 가지 작업을 나란히 돌려 차이를 비교합니다.

- **T2I**: 글만으로 이미지 생성
- **I2I**: 그림판으로 그린 사과 그림을 사진처럼 바꾸기 (denoise 0.92, 12스텝)
- **Inpaint**: 마스크로 칠한 사과 하나만 초록 사과로 바꾸기
- **Edit**: "사과 옆에 칼을 놓아 줘" 같은 명령문으로 고치기

[[image: session4/qwen_edit_result.jpg | width:100% | 실행 결과 예시 - 입력 / T2I / I2I / Inpaint / Edit]]

---section---

## 다운로드

템플릿과 예제 그림 2장을 받아, 그림은 Load Image 노드에 올립니다. 마스크 그림은 오른쪽 사과가 이미 칠해져 있어 바로 실행할 수 있고, 마스크 에디터에서 직접 다시 칠해도 됩니다.

[[download: downloads/session4/step6/qwen_edit_4tasks.json | Qwen 이미지 편집 4가지 비교 템플릿 - T2I, I2I, Inpaint, Edit]]

[[download: downloads/session4/step6/apples_paint.png | 예제 그림 - 그림판 사과 (I2I, Edit 입력)]]

[[download: downloads/session4/step6/apples_paint_mask.png | 예제 그림 - 오른쪽 사과 마스크 (Inpaint 입력)]]
