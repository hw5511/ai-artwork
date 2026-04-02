# Live Portrait로 표정 제어하기

## Live Portrait 소개

Live Portrait는 얼굴 표정과 머리 움직임을 정밀하게 제어하는 혁신적인 기술입니다.  
원본 영상이나 이미지의 표정을 다른 캐릭터에 자연스럽게 전달할 수 있습니다.

### Live Portrait의 핵심 기능
- 실시간 표정 전이
- 눈, 입, 눈썹 개별 제어
- 머리 회전 및 기울기
- 감정 표현 매핑
- 비디오 표정 추출

---

## Live Portrait 매개변수 설명

Live Portrait의 Expression Editor 노드에서 사용하는 주요 매개변수들입니다.

### 머리 움직임 (Head Movement)
| 매개변수 | 설명 | 예시 |
|---------|------|------|
| rotate_pitch | 고개 상하 움직임 | -20: 고개를 위로 젖힘, +20: 고개를 아래로 숙임 |
| rotate_yaw | 고개 좌우 회전 | -20: 왼쪽으로, +20: 오른쪽으로 |
| rotate_roll | 목 기울기 | -20: 왼쪽으로 목을 꺾음, +20: 오른쪽으로 목을 꺾음 |

### 눈 제어 (Eyes)
| 매개변수 | 설명 | 예시 |
|---------|------|------|
| blink | 눈 감기 | -20 ~ 5 범위, -20: 눈을 완전히 감음, 5: 눈을 크게 뜸 |
| eyebrow | 눈썹 위치 | -: 눈썹이 쳐짐, +: 눈썹을 들어 올림 |
| wink | 윙크 | 한쪽 눈만 감기 |
| pupil_x | 눈동자 좌우 | -15: 왼쪽, +15: 오른쪽 |
| pupil_y | 눈동자 상하 | -15: 아래쪽, +15: 위쪽 |

### 입 모양 (Mouth Shape)
| 매개변수 | 설명 | 예시 |
|---------|------|------|
| aaa | 입 세로 벌림 | +: 입벌림 (아), -: 윗입술을 누르듯이 |
| eee | 입 좌우 벌림 | +: 이 (이빨 보임), -: 입술을 모음 |
| woo | 입 앞으로 내밈 | +: 입을 모음 (우), -: 아랫입술을 아래로 내림 |

**입 모양 조합 예시**:
- '오' 발음: aaa 30, eee -20, woo 15

### 표정 제어 (Expression)
| 매개변수 | 설명 | 예시 |
|---------|------|------|
| smile | 웃음 정도 | +: 광대와 눈밑이 올라가며 웃는 느낌, -: 무표정 |
| src_ratio | 원본 표정 반영 비율 | 0: 원본 표정 무시하고 설정값만 사용, 1: 원본 표정 유지 |
| sample_ratio | 샘플 표정 반영 비율 | 0 ~ 1 범위 |

---

## 실습: Live Portrait 표정 제어하기

### Step 1: 커스텀 노드 설치

**RunDiffusion 접속 및 매니저 실행**:
1. RunDiffusion 실행
2. ComfyUI Manager 클릭
3. Custom Nodes 클릭

**AdvancedLivePortrait 설치**:
```settings
검색창에 입력: ComfyUI-AdvancedLivePortrait
작성자(author): PowerHouseMan
Install 버튼 클릭
```

**ComfyUI 재시작**:
- 설치 완료 후 ComfyUI를 재시작합니다

---

### Step 2: 워크플로우 파일 준비

**📦 실습 자료 다운로드**

필요한 파일을 개별적으로 다운로드할 수 있습니다. 워크플로우는 1단계부터 순서대로 실습하는 것을 권장합니다.

---

#### 🎨 워크플로우 파일 (ComfyUI JSON)

**1단계: 기본 표정 제어**
[[download: downloads/session2/liveportrait/1_simple_expression.json | 1. 간단한 표정 제어 워크플로우]]

**2단계: 참조 사진 활용**
[[download: downloads/session2/liveportrait/2_refrence_photo.json | 2. 참조 사진 활용 워크플로우]]

**3단계: 참조 비디오 활용**
[[download: downloads/session2/liveportrait/3_reference_video.json | 3. 참조 비디오 활용 워크플로우]]

**4단계: 고급 설정**
[[download: downloads/session2/liveportrait/4_advanced.json | 4. 고급 표정 제어 워크플로우]]

---

#### 🖼️ 연습용 이미지 파일

[[download: downloads/session2/liveportrait/chimchakman.webp | 침착맨 이미지 (WEBP)]]

[[download: downloads/session2/liveportrait/nylon.jpg | 나일론 이미지 (JPG)]]

---

#### 🎬 연습용 비디오 파일

[[download: downloads/session2/liveportrait/d0.mp4 | 메인 연습용 비디오 (d0.mp4, 2.9MB)]]

[[download: downloads/session2/liveportrait/driving_video.mp4 | 드라이빙 비디오 (185KB)]]

[[download: downloads/session2/liveportrait/black_3s.mp4 | 블랙 비디오 3초 (9KB)]]

---

**💡 다운로드 방법**: 각 버튼을 클릭하면 해당 파일이 개별적으로 다운로드됩니다.

---

### Step 3: 워크플로우 실행

**워크플로우 열기**:
1. 다운로드한 워크플로우 파일을 ComfyUI에 드래그 앤 드롭
2. 워크플로우가 로드됩니다

**Crop 값 확인**:
- Crop 값이 `NaN`으로 표시되는 경우 `1.5`로 직접 입력

**이미지/비디오 업로드**:
1. Load Image 노드에 연습용 이미지 업로드
2. Load Video 노드에 연습용 비디오 업로드 (해당되는 경우)

**표정 생성**:
- Queue Prompt 버튼을 클릭하여 첫 번째 결과물 생성

**매개변수 조정 실험**:
1. Expression Editor 노드에서 위 표의 매개변수들을 조정
2. 각 설정별로 Queue Prompt를 실행하여 결과 비교
3. 다양한 표정을 만들어 봅니다

---

## 정리

### Live Portrait 핵심 개념
- **실시간 표정 제어**: 매개변수로 정밀한 표정 조절 가능
- **머리 움직임**: pitch, yaw, roll로 3축 회전 제어
- **눈과 입 독립 제어**: 각 요소를 개별적으로 조정

### 실습 포인트
- **커스텀 노드 설치**: AdvancedLivePortrait 필수
- **매개변수 실험**: 다양한 값으로 표정 변화 관찰
- **Crop 값 주의**: NaN일 경우 1.5로 설정

---

**다음 강의**: Step 6에서는 프롬프트 엔지니어링 심화 기법을 학습합니다.