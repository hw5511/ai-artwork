# Width 옵션 테스트

이 문서는 이미지 width 옵션이 정상적으로 작동하는지 테스트합니다.

---

## 테스트 1: width:20% (작은 크기)

작은 아이콘 크기입니다.

[[image: vae.jpg | width:20%]]

---

## 테스트 2: width:50% (중간 크기)

중간 크기 이미지입니다.

[[image: 2_controlnet.jpg | width:50%]]

---

## 테스트 3: width:80% (큰 크기 - 기본값과 동일)

기본값과 동일한 크기입니다.

[[image: controlnet.png | width:80%]]

---

## 테스트 4: width:100% (전체 너비)

화면 전체 너비를 사용합니다.

[[image: comfyui.PNG | width:100%]]

---

## 테스트 5: width 옵션 없음 (기본값 80%)

width 옵션이 없으면 기본값 80%가 적용됩니다.

[[image: ksampler.PNG]]

---

## 테스트 6: width:5% (최소값 보정)

5%는 너무 작으므로 10%로 자동 보정됩니다.

[[image: lora.PNG | width:5%]]

---

## 테스트 7: width:150% (최대값 보정)

150%는 너무 크므로 100%로 자동 보정됩니다.

[[image: stablediffusion.PNG | width:150%]]

---

## 테스트 8: width + align 조합

width와 align을 함께 사용할 수 있습니다.

[[image: denoising1.PNG | width:60% | align:center | 중앙 정렬 60% 이미지]]

---

## 테스트 9: 잘못된 형식 (px 단위)

px 단위는 무시되어 기본 마크다운으로 표시됩니다.

[[image: embed.PNG | width:500px]]

---

## 테스트 10: 다양한 크기 비교

여러 이미지를 다양한 크기로 표시합니다.

[[image: checkpoint.PNG | width:30%]]

[[image: i2i_sample.png | width:60%]]

[[image: word-chain.PNG | width:90%]]

---

**테스트 완료**

모든 이미지가 지정된 너비로 정상 표시되어야 합니다.
