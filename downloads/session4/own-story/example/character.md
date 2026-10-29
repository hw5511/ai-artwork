# CHAR-01 — 인물 고정 제안

기준: `idea.md`와 `shots.json`의 CHAR-01 및 손 디테일 샷. 원안의 성인 여성 한 명, 턱선 길이의 검은 단발, 무지 남색 긴팔 셔츠, 장신구 없는 손을 유지한다. 아래 나이·얼굴·체형·의상 세부는 원안에 없는 제작용 제안이다.

## 얼굴과 헤어

- 외관상 29세 전후의 한국인 성인 여성 한 명. 자연스러운 밝은 중간 피부톤과 피부 질감을 유지한다.
- 부드러운 타원형 얼굴, 둥글게 이어지는 턱선과 작은 둥근 턱끝. 일자에 가까운 중간 굵기 눈썹, 짙은 갈색 아몬드형 눈, 곧은 콧대와 둥근 코끝, 중간 두께의 자연스러운 입술을 고정한다.
- 턱선에 닿는 검은 일자 단발. 끝은 약하게 안으로 말리고, 앞머리 없이 이마가 보이는 6:4 가르마. 양옆 머리는 자연스럽게 내린다. 길이·가르마·색을 샷마다 바꾸지 않는다.
- 옅은 자연 메이크업. 안경·귀걸이·목걸이·머리 장식 없음.

## 체형과 손

- 설정 키 약 164cm, 마른 편에서 보통 사이의 자연스러운 체형. 어깨·허리·골반을 과장하지 않는다. 시트는 비율 참고이며 실제 키를 계측하는 자료는 아니다.
- 어깨에 힘을 뺀 곧은 자세. 제품을 다루는 동작은 작고 천천히 한다.
- 양손과 손목은 맨 상태. 반지·시계·팔찌 없음. 손톱은 짧고 매니큐어 없음. 제품 클로즈업에서도 같은 손·소매 길이를 유지한다.

## 의상

- 짙은 남색 무지 무광 면 긴팔 셔츠. 보통 칼라, 여유 있는 레귤러 핏, 남색 작은 단추 한 줄. 맨 위 칼라 단추만 풀고 나머지는 잠근다. 주머니·로고·무늬 없음.
- 소매는 손목까지 내리고 커프스 단추를 잠근다. 걷어 올리지 않는다. 완만한 곡선 밑단은 바지 밖으로 내어 골반 위쪽을 덮는다.
- 하의는 무지 차콜 일자 바지, 신발은 장식 없는 무광 검은 플랫 슈즈로 제안한다. 전신 방향 비교를 위한 보완 사양이다.
- 남색은 균일한 시트 조명에서 확인한다. 본편의 왼쪽 오후 자연광으로 명도는 달라져도 의상 색·소재·칼라·단추·소매는 동일하게 유지한다.

## 표정과 샷별 적용

- 기본: 입을 편하게 다문 차분한 중립 표정.
- 발견(C1): 시선이 카메라로 옮겨가며 눈매에만 작은 호기심. 눈이나 입을 크게 벌리지 않는다.
- 조작부 확인(C2): 눈을 가볍게 내리고 집중한다. 미간을 과하게 찌푸리지 않는다.
- 촬영(C3): 차분한 집중에서 입꼬리가 아주 조금 올라가는 닫힌 입 미소까지. 치아가 보이는 웃음은 사용하지 않는다.
- 네 번째 칸은 작은 호기심과 닫힌 입 미소의 대표 얼굴 표정 한 개를 크게 보여준다. 여러 표정을 추가 칸으로 나누지 않는다.

## 시트 구성 및 제작

- 파일: `sheets/person.png`
- 2×2 네 칸: 왼쪽 위 정면 전신 / 오른쪽 위 왼쪽 측면 전신(코가 화면 왼쪽) / 왼쪽 아래 후면 전신 / 오른쪽 아래 얼굴·어깨 표정 클로즈업.
- 같은 인물 한 명을 각 칸에 한 번씩 배치한다. 전신 세 칸은 같은 비율과 높이로 비교하며 손과 신발이 모두 보이게 한다.
- 연회색 무지 배경, 균일한 중성 확산광. 소품과 문자 없이 얼굴과 의상을 확인하는 시트로 제작한다.
- 생성 방식: Codex 내장 `image_gen`. Comfy 및 별도 유료 API 호출은 사용하지 않는다.
- 최종 파일: 1254×1254 PNG. 2026-10-29에 저장한 `sheets/person.png`를 직접 열어 육안 검수했다.

## 결과 육안 검수

- 구성: 정면·왼쪽 측면·후면 전신과 얼굴 표정 클로즈업의 네 칸을 확인했다. 같은 여성 한 명의 방향별 참고 이미지이며 다른 인물이나 소품은 없다.
- 얼굴: 정면과 클로즈업의 타원형 얼굴, 눈썹·눈·코·입 형태가 일관되게 보인다. 측면의 코·턱 윤곽도 자연스럽다. 앞머리 없는 검은 턱선 단발이 앞·옆·뒤에서 유지된다.
- 체형: 전신 세 칸의 보통 체형과 어깨·허리·다리 비율이 일관되게 보인다. 손과 신발이 프레임 안에 들어온다.
- 의상: 남색 무지 셔츠의 칼라, 작은 남색 단추, 손목까지 내려온 소매, 바지 밖으로 나온 밑단을 확인했다. 측면·후면도 같은 셔츠이며 차콜 일자 바지와 검은 플랫 슈즈를 유지한다. 눈에 띄는 로고·무늬·장신구는 없다.
- 표정과 조명: 정면은 차분하고, 얼굴 칸은 치아가 보이지 않는 작은 미소다. 연회색 배경과 부드러운 중성 조명이 네 칸에서 일관되며 얼굴과 남색 원단을 구분할 수 있다.
- 활용 범위: 얼굴·헤어·체형·의상 연속성 기준으로 사용 가능하다. 전신 손은 작게 표현되어 손톱과 손가락의 미세 형상까지 확정하는 자료로는 부족하다. 손 디테일 샷에서는 위의 맨손·짧은 무색 손톱 사양을 함께 적용한다.

## 최종 생성 프롬프트

```text
Use case: photorealistic-natural
Asset type: production character identity and wardrobe reference sheet for a quiet pocket-camera advertisement.
Primary request: Create a single square high-resolution photographic 2 by 2 character sheet with exactly FOUR equal panels, thin light gray gutters, the SAME ONE adult woman shown in every panel. These are separate reference photographs of one person, never a group scene. No other people.
Scene/backdrop: seamless neutral light-gray studio backdrop in all panels.
Subject identity lock: a fictional Korean woman appearing about 29, natural everyday appearance, soft oval face, gently rounded jaw and small rounded chin, straight medium-thickness dark eyebrows, almond-shaped dark brown eyes, straight modest nose with rounded tip, natural medium lips, light-medium skin with natural texture. Straight jet-black blunt bob ending at the jaw, gently curved inward ends, 6:4 off-center part, forehead visible, no bangs, no hair accessories, both sides of hair down. Same face, age, haircut, skin tone, and proportions in all views.
Body lock: average-height adult, approximately 164 cm in character design, normal lean-to-average build with natural shoulders, waist and hips, realistic non-exaggerated proportions, relaxed upright posture.
Wardrobe lock: solid deep NAVY long-sleeved matte cotton button-up shirt, relaxed regular fit, pointed conventional collar, only the top collar button open, a single vertical row of small matching navy buttons; no pockets, no patterns, no logos. Sleeves fully down to wrists with buttoned cuffs, never rolled. Shirt untucked with a shallow curved hem ending at upper hip. Plain charcoal straight-leg trousers, simple matte black flat shoes. Bare hands and wrists, short unpainted nails, no rings, watch, earrings, necklace, or other jewelry. Shirt fabric, collar, button color, cuffs, hem and fit identical in every panel.
Composition/framing: upper-left = front full-body view, looking straight ahead, neutral relaxed mouth; upper-right = exact 90-degree left-side profile full-body, nose points toward the left of the panel; lower-left = exact rear full-body view, back of head and back of shirt clearly visible; lower-right = large front-facing head-and-shoulders facial expression close-up, a tiny closed-mouth smile with subtle interested attentive eyes, no teeth. Exactly one depiction in each panel, no inset heads or mini portraits. Full-body panels show the entire head, both hands with fingers relaxed and slightly separated, and shoes with generous clear margin. Arms hang naturally a little away from torso, hands empty. Front/profile/rear photographs use identical subject scale and straight-on camera height without wide-angle distortion. Face close-up is intentionally larger to inspect identity and expression, retaining the same navy collar.
Lighting/mood: uniform neutral soft diffuse studio illumination, matching exposure and white balance in every panel, gentle minimal shadows, face and navy fabric detail clearly legible. Calm and natural. No dramatic window light.
Style/medium: realistic casting-reference photography, accurate natural anatomy, visible cloth texture and skin texture, sharp facial and clothing details.
Constraints: exact four-cell layout, consistent single identity and outfit; no text, labels, titles, watermark, props, camera, furniture, decorative background, extra limbs, exaggerated smiles, glamorous makeup, dramatic poses, or costume changes.
```
