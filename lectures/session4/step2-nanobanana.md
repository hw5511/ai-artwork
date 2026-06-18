# 유료노드 사용해보기

## ComfyCloud 유료 API 노드란?

ComfyCloud에서는 외부 AI 서비스(OpenAI, ElevenLabs, Grok 등)를 ComfyUI 노드로 바로 사용할 수 있습니다.

> **크레딧 차감 방식**
> 워크플로우를 실행하면 ComfyCloud 기본 실행 크레딧이 차감됩니다.
> 유료 API 노드를 포함한 경우, **노드 상단에 표시된 크레딧이 API 비용으로 추가 차감**됩니다.

---section---

## 1. 이미지 생성 API 노드

### OpenAI DALL-E 2

OpenAI의 이미지 생성 모델입니다. 텍스트 프롬프트로 이미지를 생성합니다.

[[download: downloads/session4/step2/openai_dalle2.json | OpenAI DALL-E 2 워크플로우 다운로드]]

---

### Bytedance Seedream

Bytedance(바이트댄스)의 이미지 생성 모델입니다. 한국어 프롬프트도 지원합니다.

[[download: downloads/session4/step2/bytedance_seedream.json | Bytedance Seedream 워크플로우 다운로드]]

---

### Recraft

디자인 특화 이미지 생성 모델입니다. 스타일 지정과 일러스트 생성에 강점이 있습니다.
Infinite Style Library를 활용해 다양한 아트 스타일을 적용할 수 있습니다.

[[download: downloads/session4/step2/recraft.json | Recraft 워크플로우 다운로드]]

---

### Grok Text-to-Image

xAI의 Grok 이미지 생성 모델입니다.

[[download: downloads/session4/step2/grok_t2i.json | Grok T2I 워크플로우 다운로드]]

---section---

## 2. 이미지 편집/변환 API 노드

### 나노바나나 Image-to-Image

Google의 Gemini 기반 나노바나나(Nano Banana) 모델로 이미지를 변환합니다.
입력 이미지를 참고하여 프롬프트 방향으로 재생성합니다.

[[download: downloads/session4/step2/nano_banana_i2i.json | 나노바나나 I2I 워크플로우 다운로드]]

---

### Recraft 배경제거 + Gemini 스타일 변환

Recraft로 배경을 제거한 뒤 Gemini로 스타일을 재적용하는 콤보 워크플로우입니다.
스프라이트 이미지를 원하는 아트 스타일로 리스킨할 때 활용합니다.

[[download: downloads/session4/step2/recraft_gemini_restyle.json | Recraft+Gemini 리스타일 워크플로우 다운로드]]

---section---

## 3. 음성 생성 API 노드

### ElevenLabs Text-to-Speech

ElevenLabs의 고품질 TTS(텍스트-to-음성) 모델입니다.
텍스트를 자연스러운 음성으로 변환하고, 음성 클로닝도 지원합니다.

- **ElevenLabsTextToSpeech**: 텍스트 입력 → 음성 파일 출력
- **ElevenLabsVoiceSelector**: 제공되는 음성 목록에서 선택
- **ElevenLabsInstantVoiceClone**: 샘플 오디오로 즉석 음성 클로닝

[[download: downloads/session4/step2/elevenlabs_tts.json | ElevenLabs TTS 워크플로우 다운로드]]

---section---

## 4. 비디오 / 3D 모델 생성 API 노드

ComfyCloud에서는 비디오 생성(Luma, Runway, Wan, Kling 등)과 3D 모델 생성(Tripo) API 노드도 제공됩니다.

> **주의: 크레딧 소모가 매우 큽니다.**
> 비디오/3D 생성은 이미지 생성 대비 수십~수백 배의 크레딧이 차감될 수 있습니다.
> 실습 전 노드 상단의 예상 크레딧을 반드시 확인하세요.

| 서비스 | 종류 |
|--------|------|
| Luma | 비디오 생성 |
| Runway | 비디오 생성 |
| Wan | 비디오 생성 |
| Kling | 비디오 생성 |
| Tripo | 3D 모델 생성 |
