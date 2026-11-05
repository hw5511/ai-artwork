# 공통 이미지 스타일

## 공통 스타일 문장

Vertical 9:16 educational 3D engineering visualization, rendered as one coherent series about the same straight modern concrete road bridge: finely textured neutral-gray concrete, satin brushed silver-gray steel edge rails and guardrails, matte black flexible elastomer, pale blue-gray surroundings, restrained natural colors, soft daylight from the upper left, physically clear depth and gentle contact shadows, precise readable engineering geometry, consistent material scale and a clean uncluttered lower-center area for subtitles added later; no text, letters, numbers, labels, symbols, logos, watermarks or baked-in captions anywhere.

## 적용 기준

- `recipe.md`의 화면 요소에 따라 전경, 문제부 근접, 단면·입체 비교를 사용한다.
- 동일한 곧은 현대 도로교와 이음부를 반복해서 보여 주고, 콘크리트·금속·고무의 색과 질감 및 명암을 유지한다.
- S01의 교량 및 재료 표현을 이후 샷의 시각 기준으로 사용한다.
- 모든 프롬프트에 위 공통 스타일 문장을 그대로 붙인다. 개별 화면 설명은 `shots.json`을 따른다.
- 세로 9:16, 생성 요청 목표 크기 1152×2048. 최종 저장 크기는 전 샷 936×1664. 이미지 자체에는 어떤 글자·숫자·로고도 넣지 않는다.
- S05와 S08도 움직이기 전의 단일 첫 프레임 이미지로 생성한다.
- 따뜻함·차가움과 압축을 보여 주는 S03의 국소 색 띠만 설명에 필요한 범위에서 허용한다.
- 하단 중앙 자막 자리에는 구조 이해에 필수적인 세부를 배치하지 않는다. 자막은 이미지에 합성하지 않는다.

## 생성 방식 및 기록

Codex 내장 이미지 생성 도구를 사용한다. 샷별 최종 프롬프트는 `prompts.json`, 직접 확인 결과는 `image-review.md`에 기록한다.

최종 선택된 내장 생성 원본은 모두 941×1672였다. 정확한 9:16 저장을 위해 왼쪽 2px·오른쪽 3px·위아래 각 4px만 잘라 936×1664 PNG로 내보냈다. 확대나 재료·그림체 변경 없이 가장자리만 정리했다. 최종 저장본 10장을 각각 다시 열어 확인했다.
