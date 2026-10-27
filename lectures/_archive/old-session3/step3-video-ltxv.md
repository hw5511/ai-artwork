# 비디오 생성 - LTX-2 / LTX-2.3

---

## 학습 목표

- LTX-2 / LTX-2.3 모델의 특징과 버전별 차이 이해
- T2V, I2V, FLF2V, IC-LoRA 제어(Pose/Canny/Depth) 6가지 워크플로우 실습
- IC-LoRA 기반 영상 제어 방식 이해

---

## LTX-2 / LTX-2.3 모델 소개

Lightricks가 개발한 DiT(Diffusion Transformer) 기반 비디오 생성 모델 시리즈입니다.
텍스트 인코더로 **Gemma-3**를 사용하여 긴 문장 프롬프트를 잘 이해합니다.

### LTX-2 vs LTX-2.3 비교

| 항목 | LTX-2 | LTX-2.3 |
|------|-------|---------|
| 파라미터 | 19B | 22B |
| 텍스트 인코더 | Gemma-3 12B | Gemma-3 12B |
| 오디오 지원 | 없음 | 동기화된 오디오 생성 |
| IC-LoRA 제어 | Pose / Canny / Depth | - |
| 특징 | 제어 가능성 강화 | 품질 및 디테일 향상 |

### 기존 LTXV(v0.9)와의 차이

| 항목 | LTXV v0.9 | LTX-2/2.3 |
|------|-----------|-----------|
| 모델 구조 | 2B | 19B / 22B |
| 텍스트 인코더 | T5 | Gemma-3 (자연어 이해 우수) |
| 오디오 | 없음 | LTX-2.3에서 동기화 지원 |
| 제어 방식 | 기본 | IC-LoRA (Pose/Canny/Depth) |

---

## 프롬프트 작성 팁 (LTX-2.3)

LTX-2.3은 **긴 서술형 프롬프트**에서 훨씬 좋은 결과를 냅니다.

```
1. Core Actions: 시간 순서대로 동작과 사건을 묘사
2. Visual Details: 화면에 나타나길 원하는 시각적 세부 사항 묘사
3. Audio: 필요한 소리와 대화 묘사 (LTX-2.3 오디오 생성 시)
```

---

## 해상도 및 프레임 수 규칙

```settings
해상도: 반드시 64의 배수 (예: 768x512, 1024x576)
프레임 수: 반드시 8+1 배수 (9, 17, 25, 33, 41, 49 ...)
잘못된 값 입력 시 오류 없이 실행되나 품질 저하 발생
```

---

## LTX-2.3 워크플로우

### 워크플로우 1 - T2V (Text to Video)

텍스트 프롬프트로 비디오를 생성합니다.
LTX-2.3은 T2V에서도 시작 이미지 업로드가 필요합니다(레퍼런스 프레임으로 활용).

[[download: downloads/session3/step3/video_ltx2_3_t2v.json | LTX-2.3 T2V 워크플로우 다운로드]]

**실습**: 원하는 이미지를 업로드하고 프롬프트에 동작을 서술하세요.

---

### 워크플로우 2 - I2V (Image to Video)

입력 이미지를 시작 프레임으로 사용하여 자연스러운 움직임을 생성합니다.

[[download: downloads/session3/step3/video_ltx2_3_i2v.json | LTX-2.3 I2V 워크플로우 다운로드]]

**실습**: LoadImage에 원하는 이미지를 업로드하고 프롬프트에 움직임을 묘사하세요.

---

### 워크플로우 3 - FLF2V (First-Last Frame to Video) + 오디오

시작 프레임과 끝 프레임을 지정해 보간하며, LTX-2.3의 오디오 동기화 기능이 포함됩니다.

**핵심 노드**:
- `LTXVEmptyLatentAudio` - 오디오 latent 생성
- `LTXVAudioVAEDecode` - 오디오 디코딩
- `LTXVCropGuides` + `LTXVAddGuide` - 시작/끝 프레임 가이드

[[download: downloads/session3/step3/video_ltx2_3_flf2v.json | LTX-2.3 FLF2V 워크플로우 다운로드]]

**실습**: 시작·끝 이미지를 각각 업로드하고 프롬프트에 장면과 소리를 함께 묘사하세요.

---

## LTX-2 IC-LoRA 제어 워크플로우

IC-LoRA(In-Context LoRA)는 참조 비디오나 이미지에서 구조·모션 정보를 추출하여
새로운 영상 생성에 적용하는 제어 방식입니다.

```
참조 영상/이미지에서 제어 신호 추출 → IC-LoRA 적용 → 프롬프트 기반 새 영상 생성
```

**주의**: Pose/Canny/Depth IC-LoRA는 동시에 하나만 활성화 권장 (VRAM 충돌 가능)

---

### 워크플로우 4 - Pose Control

참조 비디오의 포즈(관절 위치)를 추출해 새로운 영상에 동일한 동작을 입힙니다.
비주얼 스타일은 바꾸면서 움직임 패턴은 유지하는 데 활용합니다.

**모델**: `ltx-2-19b-ic-lora-pose-control.safetensors`

[[download: downloads/session3/step3/video_ltx2_pose_to_video.json | LTX-2 Pose Control 워크플로우 다운로드]]

**실습**: LoadVideo에 참조 비디오를 업로드하고 원하는 장면을 프롬프트로 입력하세요.

---

### 워크플로우 5 - Canny Control

이미지 또는 비디오의 엣지(윤곽선)를 추출하여 구도와 형태를 제어합니다.
구성과 실루엣을 유지하면서 다른 스타일의 영상을 생성할 때 활용합니다.

**모델**: `ltx-2-19b-ic-lora-canny-control.safetensors`

[[download: downloads/session3/step3/video_ltx2_canny_to_video.json | LTX-2 Canny Control 워크플로우 다운로드]]

**실습**: 참조 이미지/비디오를 업로드하면 Canny 엣지가 자동 추출되어 구도 제어에 활용됩니다.

---

### 워크플로우 6 - Depth Control

Lotus 깊이 추정 모델로 장면의 원근·공간 구조를 추출하여 동일한 3D 구성을 유지합니다.

**사용 모델**:
- `ltx-2-19b-ic-lora-depth-control.safetensors`
- `lotus-depth-d-v1-1.safetensors` (깊이 추정)
- `vae-ft-mse-840000-ema-pruned.safetensors`

[[download: downloads/session3/step3/video_ltx2_depth_to_video.json | LTX-2 Depth Control 워크플로우 다운로드]]

**실습**: 참조 영상을 업로드하면 Lotus 모델이 깊이 맵을 자동 추출합니다.

---

## 6가지 방식 요약

| 워크플로우 | 모델 | 입력 | 특징 |
|-----------|------|------|------|
| T2V | LTX-2.3 (22B) | 텍스트 + 이미지 | 고품질 생성, 서술형 프롬프트 |
| I2V | LTX-2.3 (22B) | 이미지 | 이미지에서 자연스러운 모션 생성 |
| FLF2V | LTX-2.3 (22B) | 이미지 2장 | 보간 + 오디오 동기화 |
| Pose Control | LTX-2 (19B) | 비디오 | 동작 패턴 그대로 스타일 변환 |
| Canny Control | LTX-2 (19B) | 이미지/비디오 | 윤곽선 기반 구도 제어 |
| Depth Control | LTX-2 (19B) | 이미지/비디오 | 공간 구조(원근) 제어 |
