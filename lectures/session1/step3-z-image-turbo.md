# 이미지 생성하기 - Z-Image Turbo 템플릿

## 학습 목표

공식 템플릿을 열고 프롬프트를 바꿔 첫 이미지를 생성합니다.

[[image: session3/recap/z-image-turbo-official.webp | width:100% | Comfy-Org 공식 Z-Image Turbo 템플릿 미리보기]]

*출처: Comfy-Org `workflow_templates`, 커밋 `67984637eefcd4825dcf5c134e39034785be1682`.*

## 템플릿 열기

### ComfyUI 안에서 열기

1. 상단 **Workflow** 메뉴에서 **Browse Templates**를 엽니다.
2. 검색창에 `Z-Image Turbo`를 입력합니다.
3. **Z-Image Turbo** 템플릿을 선택합니다.
4. 필요한 모델 다운로드 안내가 나오면 내용을 확인한 뒤 진행합니다.

메뉴 위치가 다르면 템플릿 검색 화면에서 이름으로 찾습니다.

### JSON 파일로 열기

[[download: downloads/session1/step3/image_z_image_turbo.json | 공식 Z-Image Turbo 워크플로우 다운로드 (.json)]]

다운로드한 JSON 파일을 ComfyUI 캔버스에 끌어 놓습니다. 공식 템플릿과 같은 노드 구성이 보이면 정상입니다.

## 이미지 생성하기

1. 프롬프트 입력 노드에서 만들 장면을 적습니다.
2. 이미지 크기와 시드는 먼저 그대로 둡니다.
3. **Run** 또는 **Queue**를 누릅니다.
4. 실행이 끝나면 **Save Image** 노드에서 결과를 확인합니다.

```prompt
A man in his 30s walking a golden retriever on a leash along a tree-lined path in a city park, sunny afternoon, natural light, photo
```

한국어 뜻:

```text
30대 남성이 화창한 오후, 나무가 늘어선 도심 공원 길에서 골든리트리버의 목줄을 잡고 산책하는 모습. 자연광의 사진.
```

처음에는 한 항목만 바꿔야 결과가 왜 달라졌는지 알기 쉽습니다. 먼저 프롬프트만 바꿔 비교합니다.

## 정리

공식 템플릿은 필요한 노드와 연결을 이미 담고 있습니다. 템플릿을 열고 프롬프트를 바꾼 뒤 실행하면 됩니다.

---

**다음 강의**: 같은 조건에서 SDXL base와 Illustrious를 비교합니다.
