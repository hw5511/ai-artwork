# OpenPose ControlNet 마스터

## OpenPose ControlNet 소개

OpenPose는 인체의 포즈를 스켈레톤 형태로 추출하여 AI 이미지 생성에 적용하는 강력한 ControlNet입니다.  
정확한 포즈와 자세를 유지하면서 완전히 다른 캐릭터나 스타일로 변환할 수 있습니다.

### OpenPose의 핵심 특징
- 18개 관절점으로 인체 구조 표현
- 얼굴, 손 디테일 추가 가능
- 실시간 포즈 편집 지원
- 다양한 포즈 라이브러리 활용

---

## 워크플로우 준비

이번 실습에서는 OpenPose Editor를 활용하여 포즈를 직접 편집하고, 레퍼런스 이미지의 포즈를 추출하여 AI 이미지 생성에 적용하는 방법을 배웁니다.

### 실습 자료 다운로드

**레퍼런스 포즈 이미지 다운로드**:

[[download: downloads/session2/openpose/openpose.jpg | OpenPose 레퍼런스 이미지 다운로드]]

**이미지 미리보기**:

[[image: openpose.jpg | width:50%]]

**워크플로우 파일**:

[[download: downloads/session2/openpose/openpose.json | OpenPose 워크플로우 다운로드]]

위 버튼을 클릭하여 워크플로우 파일을 다운로드한 후 실습을 진행합니다.

---

## 워크플로우 실습

### Step 1: OpenPose Editor 커스텀 노드 설치

1. **ComfyUI Manager 클릭** (우측 상단 메뉴)
2. **Install Custom Nodes** 또는 **Add Custom Node** 클릭
3. 검색창에 **"openpose"** 검색
4. **huchenlei** 제작자의 **ComfyUI-OpenPose-Editor** 설치
5. 설치 완료 후 **페이지 새로고침** (브라우저 F5)

---

### Step 2: 레퍼런스 이미지로 포즈 추출 및 생성

1. **워크플로우 열기**:
   - ComfyUI 로고 클릭 → **file → 불러오기**
   - 다운로드한 `openpose.json` 파일 선택

2. **레퍼런스 이미지 업로드**:
   - **Load Image** 노드 찾기
   - 위에서 다운로드한 `openpose.jpg` 이미지 업로드

3. **Switch 노드 확인**:
   - **Switch** 노드의 값이 **1**로 설정되어 있는지 확인
   - 값이 1이면 레퍼런스 이미지에서 추출한 포즈를 사용

4. **이미지 생성 실행**:
   - **Queue Prompt** 버튼 클릭
   - 생성된 이미지의 포즈가 레퍼런스 이미지와 일치하는지 확인

---

### Step 3: OpenPose Editor로 포즈 직접 수정

1. **OpenPose Editor 노드 찾기**:
   - 워크플로우에 있는 **OpenPose Editor** 노드 찾기

2. **에디터 열기**:
   - OpenPose Editor 노드를 **우클릭**
   - **Open Editor** 선택

3. **포즈 수정**:
   - 에디터 창이 열리면 관절점을 드래그하여 포즈 수정
   - 팔, 다리, 몸통 각도 조정
   - 원하는 포즈로 편집

4. **ComfyUI에 업로드**:
   - 포즈 수정 완료 후 **Upload to ComfyUI** 버튼 클릭

5. **Switch 노드 변경**:
   - **Switch** 노드의 값을 **2**로 변경
   - 값이 2이면 OpenPose Editor에서 수정한 포즈를 사용

6. **이미지 생성 실행**:
   - **Queue Prompt** 버튼 클릭
   - 수정한 포즈가 반영된 이미지 확인

---

## 자유 실습

레퍼런스 포즈 이미지를 다른 것으로 바꾸거나, OpenPose Editor에서 직접 포즈를 수정하거나, 프롬프트를 변경하면서 다양한 이미지를 만들어보세요.