# 로컬 모델과 유료 API 노드

## 학습 목표

모델을 어디에서 실행하는지 확인하고 작업에 맞는 방식을 고릅니다.

| 구분 | 로컬 모델 노드 | 유료 API 노드 |
|---|---|---|
| 실행 위치 | 내 PC 또는 Comfy Cloud의 ComfyUI 환경 | 외부 회사의 서버 |
| 준비 | 모델 파일과 실행 가능한 하드웨어 | Comfy 계정 로그인과 API 크레딧 |
| 비용 확인 | 내 장비 사용 또는 Cloud GPU 사용량 | 노드에 표시되는 실행 크레딧 |
| 장점 | 모델과 설정을 직접 다룰 수 있음 | 큰 모델도 파일 설치 없이 사용할 수 있음 |
| 확인할 점 | 모델 파일 크기와 메모리 | 실행 전 크레딧과 전송할 입력 자료 |

노드 이름만 보지 말고 모델 파일을 불러오는지, 회사 이름이 붙은 API 노드인지 확인합니다.

## 공통 실습 주제

### 이미지 비교 프롬프트

```prompt
A man in his 30s walking a golden retriever on a leash along a tree-lined path in a city park, sunny afternoon, natural light, photo
```

한국어 뜻:

```text
30대 남성이 화창한 오후, 나무가 늘어선 도심 공원 길에서 골든리트리버의 목줄을 잡고 산책하는 모습. 자연광의 사진.
```

### 5초 영상 비교 프롬프트

```prompt
A man walks his golden retriever along a sunny park path, the dog trots ahead wagging its tail, slow side tracking shot, natural light
```

한국어 뜻:

```text
남성이 햇빛 드는 공원 길에서 골든리트리버를 산책시킵니다. 개는 꼬리를 흔들며 앞서 종종걸음으로 걷고, 카메라는 옆에서 천천히 따라갑니다. 자연광입니다.
```

## 이미지 비교 시트

같은 프롬프트를 여러 로컬 모델과 API 모델에 보내 결과를 한 장으로 모읍니다. 현재 ComfyUI에 없는 노드가 보이면 그 그룹은 실행하지 말고 먼저 ComfyUI 업데이트 여부를 확인합니다.

[[download: downloads/session2/step3/image_compare_sheet.json | 로컬 모델과 API 이미지 비교 시트 (.json)]]

## 5초 영상 비교

로컬 영상 모델과 여러 API 영상 모델의 결과를 나란히 확인하는 템플릿입니다. API 그룹을 실행하면 크레딧이 차감될 수 있습니다.

[[download: downloads/session2/step3/video_compare_5s.json | 로컬 모델과 API 5초 영상 비교 템플릿 (.json)]]

## 실행 전에 확인하기

1. JSON 파일을 캔버스에 끌어 놓습니다.
2. 빨간색 오류나 **Missing Node** 표시가 있는지 확인합니다.
3. 실행할 그룹만 남기고 나머지는 선택한 뒤 **Ctrl+B**로 건너뜁니다.
4. API 노드는 표시된 크레딧을 확인합니다.
5. 먼저 한 모델만 실행해 입력과 출력이 맞는지 봅니다.

## 정리

로컬 모델은 파일과 하드웨어를 준비하고, API 노드는 로그인과 크레딧을 확인합니다. 비교할 때는 같은 프롬프트와 같은 조건을 사용합니다.
