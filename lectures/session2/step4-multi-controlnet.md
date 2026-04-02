# 복합 ControlNet 워크플로우

## 복합 ControlNet 개념

여러 ControlNet을 동시에 사용하여 이미지 생성을 다차원적으로 제어합니다.  
각 ControlNet의 장점을 결합하여 더욱 정밀하고 창의적인 결과를 얻을 수 있습니다.

### 복합 사용의 장점
- 다중 제약 조건 동시 만족
- 더 정확한 결과물
- 창의적 가능성 확장
- 세밀한 제어력

### 주요 조합 패턴
```settings
OpenPose + Depth: 포즈와 공간감
Canny + OpenPose: 형태와 자세
Depth + Canny: 구조와 깊이
Scribble + Depth: 스케치와 3D
```

---

## 복합 워크플로우 실습

이번 실습에서는 여러 ControlNet을 동시에 사용하여 이미지 생성을 다차원적으로 제어하는 방법을 배웁니다.

### 실습 자료 다운로드

**레퍼런스 이미지 다운로드**:

[[download: downloads/session2/2control/2_controlnet.jpg | 복합 ControlNet 레퍼런스 이미지 다운로드]]

**이미지 미리보기**:

[[image: 2_controlnet.jpg | width:50%]]

**워크플로우 파일**:

[[download: downloads/session2/2control/2_controlnet.json | 복합 ControlNet 워크플로우 다운로드]]

위 이미지와 워크플로우 파일을 다운로드한 후 실습을 진행합니다.

---

### 실습 진행

1. **RunDiffusion 세션 실행**

2. **워크플로우 열기**:
   - RunDiffusion에서 **Load** 버튼 클릭
   - 다운로드한 `2_controlnet.json` 파일 선택

3. **레퍼런스 이미지 업로드**:
   - **Load Image** 노드 찾기
   - 위에서 다운로드한 `2_controlnet.jpg` 이미지 업로드

4. **이미지 생성 실행**:
   - **Queue Prompt** 버튼 클릭
   - 두 개의 ControlNet이 동시에 적용된 결과 확인

5. **프롬프트 변경 후 재실행**:
   - **CLIP Text Encode** 노드에서 프롬프트 수정
   - 다양한 프롬프트로 실험하며 결과 비교

---

## 자유 실습

다양한 ControlNet을 복합적으로 연결해가며 일관성을 유지한 이미지를 만들어보세요.