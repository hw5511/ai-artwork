# 영상 생성하기 - LTX 2.5 T2V

## 학습 목표

글로 장면과 움직임을 설명해 짧은 영상을 생성합니다.

[[image: session3/recap/ltx-2.5-t2v-official.webp | width:100% | Comfy-Org 공식 LTX 2.5 T2V 템플릿 미리보기]]

*출처: Comfy-Org `workflow_templates`, 커밋 `67984637eefcd4825dcf5c134e39034785be1682`.*

## T2V란?

T2V는 Text to Video입니다. 시작 이미지 없이 글만으로 장면과 움직임을 만듭니다.

## 템플릿 열기

1. 상단 **Workflow** 메뉴에서 **Browse Templates**를 엽니다.
2. `LTX 2.5 T2V`를 검색해 템플릿을 선택합니다.
3. 또는 아래 JSON 파일을 캔버스에 끌어 놓습니다.

[[download: downloads/session1/step5/video_ltx2_5_t2v.json | 공식 LTX 2.5 T2V 워크플로우 다운로드 (.json)]]

이 공식 템플릿은 로컬 모델 노드를 사용합니다. 필요한 모델 파일이 없으면 ComfyUI가 모델 안내를 표시합니다. Comfy Cloud에서는 실행한 GPU 사용량에 따라 크레딧이 차감될 수 있습니다. 이 파일에는 외부 회사의 Partner API 노드가 없습니다.

## 영상 생성하기

1. 프롬프트에 **장면**, **피사체의 움직임**, **카메라 움직임**을 적습니다.
2. 처음에는 템플릿의 길이와 해상도를 그대로 둡니다.
3. **Run** 또는 **Queue**를 누릅니다.
4. 실행이 끝나면 저장 노드에서 영상과 소리를 확인합니다.

```prompt
A man walks his golden retriever along a sunny park path, the dog trots ahead wagging its tail, slow side tracking shot, natural light
```

한국어 뜻:

```text
남성이 햇빛 드는 공원 길에서 골든리트리버를 산책시킵니다. 개는 꼬리를 흔들며 앞서 종종걸음으로 걷고, 카메라는 옆에서 천천히 따라갑니다. 자연광입니다.
```

이미지보다 계산할 프레임이 많아 영상 생성은 더 오래 걸릴 수 있습니다. 실행 중에는 같은 작업을 여러 번 누르지 않습니다.

## 정리

T2V는 글만으로 영상을 시작합니다. 장면과 움직임을 나누어 적으면 확인하기 쉽습니다.
