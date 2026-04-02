# Inpainting 실전

---

## 학습 목표

Inpainting 기법을 실전에서 활용하여 이미지의 특정 영역을 수정하는 방법을 습득합니다.

---

## Inpainting 핵심 개념

Inpainting은 마스크로 지정된 영역에 새로운 콘텐츠를 생성하는 기법입니다.

### Inpainting의 특징
- 마스크 영역에 새로운 요소 생성
- 빈 공간 채우기에 특화
- 기존 요소 수정은 제한적
- 주변과 자연스러운 연결 중요

---

## 마스크 처리 방법

### 알파 채널 PNG 파일 활용
투명 영역을 포함한 PNG 파일을 업로드하면 투명 영역이 자동으로 마스크로 처리됩니다.

```settings
파일 형식: PNG (알파 채널 포함)
투명 영역: 자동 마스크 처리
불투명 영역: 원본 유지
```

### 펜툴로 마스크 영역 편집
업로드 후 펜툴을 사용하여 마스크 영역을 직접 수정할 수 있습니다.

```settings
펜툴 기능: 마스크 영역 직접 편집
브러시 크기: 조절 가능
실시간 미리보기: 마스크 영역 확인
```

---

## 실습 파일 다운로드

### 워크플로우 파일

[[download: downloads/session3/inpaint/inpaint_basic.json | 기본 Inpainting 워크플로우 다운로드]]

[[download: downloads/session3/inpaint/inpaint_advanced.json | 고급 Inpainting 워크플로우 다운로드]]

### 실습용 이미지

[[download: downloads/session3/inpaint/inpaint_upload.png | Inpaint 업로드 이미지 다운로드]]

[[download: downloads/session3/inpaint/sunglass.jpg | 선글라스 이미지 다운로드]]

[[download: downloads/session3/inpaint/결과물예제_seed_575226192007835_00001_.png | 결과물 예제 다운로드]]

### 이미지 미리보기

[[image: inpaint_upload.png | width:33% | row]]
[[image: sunglass.jpg | width:33% | row]]
[[image: 결과물예제_seed_575226192007835_00001_.png | width:33% | row]]

---

## 이 템플릿으로 실습해봅시다!

위에서 다운로드한 워크플로우와 이미지를 활용하여 Inpainting 기법을 실습해보세요.

마스크 영역을 지정하고 다양한 프롬프트로 특정 부분을 수정하며, 자연스러운 결과를 만들어보세요.