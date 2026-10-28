# 공원 로케이션 고정 기록

## 결과물과 출처

- 완성 시트: `session4/sheets/park.png`.
- 2행 1열, 위 정면 / 아래 같은 촬영 자리에서 오른쪽으로 조금 돌린 시점.
- 최종 크기: 1168 × 1314 px. 각 사진은 1168 × 657 px로 정확한 16:9. 여백·구분선·글자 없음.
- 읽은 자료: `session4/script.md`, `session4/rules.md`, `park_walk.png`.
- 생성: Codex 내장 `image_gen`만 사용. Comfy 및 별도 유료 이미지 API/CLI 사용 없음.
- 원본 생성 파일: `C:/Users/woohee/AppData/Local/Temp/artwork-s4-rehearsal-20261028/home/generated_images/01a18254-ea00-7792-9a5c-330d5ec6c079/exec-3de99e79-4f95-40a7-ae74-52130abc2b16.png`.
- 생성된 두 패널을 단독 컷으로 분리하고 중앙 구분선과 극소량의 가장자리만 잘라 코드로 재조립했다. 재생성·회전·좌우 반전·왜곡·확대 없이 원본 사진 픽셀을 유지했다.
- 조립 좌표(왼쪽, 위, 오른쪽, 아래; 오른쪽·아래 제외): 위 `(7, 3, 1175, 660)`, 아래 `(7, 670, 1175, 1327)`. 각 컷을 순서대로 세로 연결했다.

## 두 컷의 육안 확인

| 확인 대상 | 위: 정면 | 아래: 오른쪽 회전 | 고정 판단 |
| --- | --- | --- | --- |
| 산책로 | 회색 포장길이 넓은 전경에서 중앙 원경으로 이어짐 | 같은 길의 소실점이 화면 왼쪽으로 이동하고 오른쪽 잔디가 더 넓게 보임 | 갈림길·곡선길을 추가하지 않음 |
| 왼쪽 벤치 | 밝은 회색 석재 상판과 어두운 거친 돌 받침, 왼쪽 잔디에 위치 | 같은 벤치가 왼쪽 가장자리로 이동하며 일부 프레임 밖으로 잘림 | 벤치가 이동하거나 다른 편으로 바뀌지 않음 |
| 가로등 | 벤치 뒤의 어두운 가는 기둥과 원뿔형 지붕, 길을 따라 원경 가로등 반복 | 왼쪽 가로등과 오른쪽 중경 가로등이 모두 왼쪽으로 이동 | 벤치·가로등·나무의 앞뒤 관계 유지 |
| 나무·도시 배경 | 양옆 가로수, 오른쪽 전경의 굵은 줄기, 수관 사이 먼 밝은 건물 | 같은 굵은 줄기와 건물이 왼쪽으로 이동하고 오른쪽 수목이 더 보임 | 같은 공원으로 읽히는 주요 표식 유지 |
| 오후빛 | 따뜻한 자연광, 길 위 얼룩진 수관 그림자 | 같은 색온도와 오른쪽에서 드는 빛, 같은 방향의 얼룩 그림자 | 광원을 반대편으로 바꾸지 않음 |
| 촬영 높이 | 사람 눈높이의 수평 구도, 하늘과 전경 지면 모두 보임 | 비슷한 눈높이·수평 구도, 하늘과 지면 유지 | 부감·지도·항공 시점 없음 |

사람·동물·리드줄·읽히는 글자·로고·워터마크가 보이지 않는지 전체 시트를 육안 점검했다. 두 시점의 주요 표식 이동은 같은 자리의 오른쪽 팬과 일관된다. 회전 약 10도·높이 약 1.6m·28mm 상당은 생성 지시값이며, 실제 측량이나 카메라 보정값은 아니다.

## 이후 제작에서 고정할 특징

1. 회색의 미세한 입자감이 있는 넓고 곧은 포장 산책로. 전경에서 원경까지 이어지는 길의 양옆은 잔디와 군데군데 드러난 흙이다.
2. 왼쪽의 낮고 긴 석재 벤치: 밝은 평평한 상판 + 어두운 거친 돌 받침. 벤치 뒤 어두운 원뿔 지붕 가로등과의 상대 위치를 유지한다.
3. 양옆의 성숙한 활엽수 줄과 오른쪽 전경의 굵은 줄기, 길을 따라 반복되는 어두운 가로등, 나뭇잎 틈의 먼 밝은 도시 건물을 유지한다.
4. 녹색과 황록색 잎, 따뜻한 오후 자연광, 위 정면 컷 기준 카메라 오른쪽 위에서 들어오는 빛과 전경 왼쪽 방향으로 놓이는 그림자를 기준으로 한다. 아래 컷은 팬에 따른 화면상 변화만 허용한다.
5. 정면을 기준 시점으로 삼고 오른쪽 회전 컷은 공간 관계 확인에 사용한다. 회전 시 길·벤치·가로등·나무·건물은 함께 화면 왼쪽으로 이동한다. 좌우 반전, 벤치 위치 변경, 광원 반전, 촬영 자리 이동으로 해석하지 않는다.
6. 빈 공원만 로케이션 기준으로 쓴다. 사람·동물·리드줄·그에 속한 그림자·반사·화면 글자를 추가하지 않는다.

## 대본의 예정 경로와 이번 요청의 관계

이번 사용자의 지정에 따라 시트는 `session4/sheets/park.png`에 저장했다. 기존 문서의 예정 시트명 `session4/sheets/park_sheet.png`와는 다르며, 대본·규칙·샷 명세는 수정하지 않았다.

이 두 컷 시트는 공간 확인용 준비 자료다. 기존 영상용 단독 로케이션 참조 `session4/views/park.png`는 이번에 생성하지 않았다. 이후 영상 제작에서는 그 단독 컷 한 파일을 확정해 여섯 샷 모두에 재사용한다.

## 사용한 최종 생성 프롬프트

참조 이미지 `park_walk.png`를 환경 참조로 전달했다.

```text
Use case: photorealistic-natural.
Create a photographic location continuity sheet using the supplied park_walk.png ONLY as an environment reference. Remove the man, dog, leash, ALL background people, animals and any associated shadows or reflections. Preserve the recognizable park, not the subjects.
LAYOUT: exactly TWO photographs stacked vertically, TWO ROWS and ONE COLUMN. Both individual photographs must be wide horizontal 16:9, equal size, full width. Overall sheet ratio 8:9 (for example 2048 wide by 2304 high). Top photo occupies precisely the upper half, bottom photo precisely the lower half. No surrounding border, no margins, no text or labels, no map, no diagrams, no inset, no third frame.
ENVIRONMENT LOCK for BOTH: same single urban park from reference, straight broad fine gray asphalt walking path receding between mature deciduous tree rows; patchy green and yellow-green grass with small bare earth areas on both sides; a low rectangular pale stone slab bench on a dark rough stone plinth on the LEFT lawn near the path; a slim dark charcoal park lamp with small conical cap just behind the left stone bench; further dark park lamps receding along the route; subtle pale urban buildings glimpsed through distant foliage. Natural realistic textures, green foliage with a few yellow leaves, warm afternoon natural light from upper frame right / camera right, casting consistent dappled leaf shade across asphalt and shadows generally toward foreground-left. No sunset, no change of weather or season.
TOP: level camera at standing human eye height about 1.6m, 28mm equivalent lens, looking straight along the path, centered vanishing point, wide establishing photograph. Show blue-white sky through upper foliage AND extensive ground in the foreground, keep trunks vertical. Stone bench fully readable at left foreground/midground, left lamp visible.
BOTTOM: the SAME camera standing in EXACTLY the SAME spot, same eye height, lens, pitch and roll, rotated only about 10 degrees to the RIGHT. This is a gentle horizontal pan, no translation, no reverse angle, no aerial or overhead perspective. The SAME path and its distant vanishing point shift slightly LEFT within the bottom photo; show a little more of the right lawn and right-hand tree trunks. The exact SAME left bench and lamp remain visible toward the far left edge and keep identical world position and construction. Tree trunk identities, spacing, path width, bench-to-lamp relationship, building glimpses and sun direction stay consistent between images; change only camera yaw. Sky and ground are both visible. Both images are equally sharp, realistic location photographs at a horizontal eye-level perspective.
ABSOLUTE EXCLUSIONS: any human including distant silhouettes or body fragments, animals including birds, red leash or rope, words, typography, signs with lettering, logos, watermarks, cartographic symbols, top-down/overhead/aerial view, contact-sheet grids with side-by-side images.
```
