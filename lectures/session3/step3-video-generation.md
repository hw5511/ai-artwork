# 비디오 생성 모델 활용

---

## 학습 목표
- 비디오 생성의 기본 원리 이해
- 주요 비디오 생성 모델별 특징과 차이점 학습
- 텍스트-투-비디오 생성 실습
- 카메라 효과와 고품질 비디오 생성 기법 습득

---

## 비디오 생성의 원리

### 기본 개념
비디오 생성은 **프레임별 이미지들을 생성하고 연결하여 동영상을 구현**하는 방식입니다.

### 프레임과 영상 길이 계산
```
예시: 90프레임 ÷ 30fps (frames per second) = 3초
```

- **프레임 수**: 생성할 이미지 개수
- **FPS**: 초당 재생 프레임 수
- **영상 길이**: 프레임 수 ÷ FPS

각 프레임은 독립적인 이미지로 생성되며, 프레임 간 일관성 유지가 핵심입니다.

---

## 주요 비디오 생성 모델

### 1. Wan (Wan 2.1)

Alibaba의 오픈소스 모델로, 빠른 생성 속도와 가벼운 리소스 요구사항(8GB VRAM)이 특징입니다. 중국어/영어 텍스트 생성을 지원하며, 실시간 움직임과 카메라 모션에 강점을 보입니다.

### 2. LTXV (LTX-Video)

Lightricks의 초고속 모델로, 5초 비디오를 2초만에 생성할 수 있습니다(실시간보다 빠름). Text-to-Video, Image-to-Video, Video-to-Video 등 다양한 입력 방식을 지원하며, 소비자용 GPU에서도 실행 가능합니다.

### 3. HunYuan Video

Tencent의 최고 품질 모델(13B 파라미터)로, 전문가 평가에서 최고 점수를 기록했습니다. 720p~1280p 고해상도를 지원하며, 비디오-오디오 자동 동기화 기능이 내장되어 있습니다.

---

## 실습 파일 다운로드

### 워크플로우 파일

[[download: downloads/session3/video/video_wan2_2_first_to_end.json | Wan 2.2 워크플로우 다운로드]]

[[download: downloads/session3/video/ltxv_text_to_video.json | LTXV 워크플로우 다운로드]]

[[download: downloads/session3/video/hunyuan_video_text_to_video.json | HunYuan Video 워크플로우 다운로드]]

### 실습용 이미지

[[download: downloads/session3/video/first.png | First 이미지 다운로드]]

[[download: downloads/session3/video/last.png | Last 이미지 다운로드]]

### 결과물 샘플

[[download: downloads/session3/video/결과물샘플.mp4 | 결과물 샘플 비디오 다운로드]]

### 이미지 미리보기

[[image: first.png | width:50% | row]]
[[image: last.png | width:50% | row]]

---

## 이 템플릿들을 순차적으로 해봅시다!

위에서 다운로드한 워크플로우들을 순차적으로 실습하며 각 모델의 특징을 직접 경험해보세요.

### 실습 1: Wan 2.2 (First to End)
- **워크플로우**: `video_wan2_2_first_to_end.json`
- **사용 이미지**: `first.png`(시작 프레임), `last.png`(끝 프레임)
- **특징**: 빠른 속도로 시작과 끝 프레임 사이를 보간하는 비디오 생성

### 실습 2: LTXV
- **워크플로우**: `ltxv_text_to_video.json`
- **특징**: 초고속 생성으로 텍스트만으로 비디오 생성

### 실습 3: HunYuan Video
- **워크플로우**: `hunyuan_video_text_to_video.json`
- **특징**: 최고 품질의 프로페셔널 비디오 생성

각 모델의 프레임 수와 FPS를 조정하며 영상 길이를 직접 계산하고 실험해보세요.