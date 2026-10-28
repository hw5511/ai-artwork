# 4회차 실습 대본 — 오후 공원의 작은 쉼

원본: `park_walk.png` · 총 30초 · 정확히 10초 클립 3개 · 클립마다 정확히 5초 샷 2개.

오후 공원을 걷던 남성이 걸음을 멈추고 화면 밖 반려견을 내려다본다. 골든리트리버는 길가 냄새를 맡다가 남성을 향해 고개를 든다. 남성이 미소를 짓고 다시 걷는다. 잠깐의 쉼은 서서 기다리는 행동으로 표현한다.

## 연출과 연결

- 클립 1과 3에는 남성만, 클립 2에는 반려견만 등장한다. 상대의 신체 일부·그림자·반사도 프레임에 넣지 않는다. 배경의 다른 사람과 동물도 제외한다.
- 원본처럼 남성의 해부학적 왼손이 빨간 리드줄을 잡는다. 정면에서 남성의 왼손은 화면 오른쪽이다. 반려견은 남성의 왼편, 정면 기준 화면 오른쪽 길가에 있다.
- 카메라는 같은 동선 축의 정면 쪽에 머문다. 남성 샷에서는 반려견을 오른쪽 화면 밖에, 반려견 샷에서는 남성을 왼쪽 위 화면 밖에 둔다. 시선과 리드줄의 방향으로 관계를 연결한다.
- 모든 샷은 동일한 공원 단독 컷 `session4/views/park.png`를 로케이션 참조로 사용한다. 샷 크기는 바꾸되 공원 구조와 오후 빛은 유지한다.
- 5·10·15·20·25초에 하드 컷한다. 타이틀, 전환용 추가 화면, 엔딩 카드, 페이드는 넣지 않는다. 각 클립의 처음과 끝도 아래 시간에 포함한다.
- 대사·내레이션·자막·화면 글자·음악은 없다. 나뭇잎을 스치는 바람, 멀리서 들리는 새소리, 자연스러운 발소리만 사용한다. 공원 환경음은 컷 사이에서도 이어진다.

## 샷 목록

시간은 전체 영상 기준이며, 괄호 안은 해당 클립 내부 시간이다. 종료 시각은 다음 샷의 시작 경계다. 각 행의 시트와 단독 컷 경로는 프로젝트 루트 기준이다.

| 샷 | 시간 / 길이 | 구도와 등장 대상 | 행동 | 리드줄 위치·움직임 | 필요한 시트 | 사용할 단독 컷 — 정확히 3장 |
| --- | --- | --- | --- | --- | --- | --- |
| C1-S1 | 00:00–00:05 / 5초 (00:00–00:05) | 첫 프레임부터 얼굴·어깨·가슴만 보이는 고정 정면 근접. 가슴에서 자르고 어깨 양옆 여백을 좁게 유지. | 0–3초: 어깨의 작은 잔흔들림이 가라앉으며 멈춘다. 3–4초: 시선을 오른쪽 아래로 내리고 턱을 조금 숙인다. 4–5초: 시선·턱·어깨·가슴 모두 정지 상태. | 가슴에서 자른 구도이므로 손과 리드줄은 보이지 않는다. | `session4/sheets/man_sheet.png`<br>`session4/sheets/leash_sheet.png`<br>`session4/sheets/park_sheet.png` | `session4/views/man.png`<br>`session4/views/leash.png`<br>`session4/views/park.png` |
| C1-S2 | 00:05–00:10 / 5초 (00:05–00:10) | 같은 정면 축의 고정 허리·손·리드줄 근접. 재킷 밑단·셔츠·허리의 데님·왼손·빨간 고리와 띠만 전경에 보인다. | 5초 하드 컷. 5–10초: 서서 기다리는 정지 상태로 허리·손·고리·빨간 띠가 움직이지 않는다. | 해부학적 왼손이 화면 오른쪽 허리 옆에서 빨간 고리 하나를 잡는다. 느슨한 빨간 평평한 띠 하나가 화면 아래 오른쪽 가장자리로 나가며 정지 상태를 유지한다. | `session4/sheets/man_sheet.png`<br>`session4/sheets/leash_sheet.png`<br>`session4/sheets/park_sheet.png` | `session4/views/man.png`<br>`session4/views/leash.png`<br>`session4/views/park.png` |
| C2-S1 | 00:10–00:15 / 5초 (00:00–00:05) | 반려견 눈높이의 낮은 미디엄, 반려견만 중앙~오른쪽. 코와 길가 풀·목걸이가 함께 보인다. | 10–15초: 골든리트리버가 제자리에 선 채 길가 풀과 흙 가까이 코를 대고 천천히 냄새를 맡는다. 남성은 왼쪽 위 화면 밖. | 빨간 줄이 왼쪽 위 프레임 밖에서 들어와 파란 목걸이의 금속 연결부로 이어진다. 고개 움직임에 따라 느슨한 줄이 작게 흔들린다. 손과 손잡이는 보이지 않는다. | `session4/sheets/dog_sheet.png`<br>`session4/sheets/leash_sheet.png`<br>`session4/sheets/park_sheet.png` | `session4/views/dog.png`<br>`session4/views/leash.png`<br>`session4/views/park.png` |
| C2-S2 | 00:15–00:20 / 5초 (00:05–00:10) | 같은 축의 반려견 머리·가슴 클로즈업, 반려견만. 고개를 들어도 귀와 코가 잘리지 않게 위 여백 확보. | 15–18초: 냄새 맡기를 멈추고 고개를 든다. 18–20초: 왼쪽 위 화면 밖 남성을 올려다본다. 몸과 앞발은 제자리에 둔다. | 왼쪽 위에서 들어오는 빨간 줄의 연결 위치를 유지한다. 고개가 들리며 목걸이 쪽 줄의 각도가 조금 바뀌고 곡선이 완만해지지만 팽팽해지지 않는다. | `session4/sheets/dog_sheet.png`<br>`session4/sheets/leash_sheet.png`<br>`session4/sheets/park_sheet.png` | `session4/views/dog.png`<br>`session4/views/leash.png`<br>`session4/views/park.png` |
| C3-S1 | 00:20–00:25 / 5초 (00:00–00:05) | C1-S2와 같은 축·크기의 허리 위 미디엄 클로즈업, 남성만. 얼굴과 왼손 포함. | 20–23초: 오른쪽 아래의 반려견을 보며 입꼬리를 부드럽게 올린다. 23–25초: 미소를 유지하다가 진행 방향인 정면으로 시선을 옮긴다. | 화면 오른쪽 허리 옆 왼손이 같은 빨간 손잡이를 계속 잡는다. 줄은 오른쪽 아래 화면 밖으로 이어지며 느슨하게 머문다. 재출발 신호로 줄을 당기지 않는다. | `session4/sheets/man_sheet.png`<br>`session4/sheets/leash_sheet.png`<br>`session4/sheets/park_sheet.png` | `session4/views/man.png`<br>`session4/views/leash.png`<br>`session4/views/park.png` |
| C3-S2 | 00:25–00:30 / 5초 (00:05–00:10) | 정면 허벅지 위 미디엄, 남성만 왼쪽~중앙. 카메라가 천천히 후진하며 거리와 오른쪽 프레임 경계를 유지한다. | 25–30초: 남성이 카메라 쪽 산책로를 따라 두세 걸음 편안하게 걷는다. 반려견도 같은 속도로 오른쪽 화면 밖에서 동행하는 설정. 걷는 중 정확히 30초에 끝낸다. | 왼손의 빨간 손잡이는 화면 오른쪽 허리 옆. 줄은 오른쪽 아래 프레임 밖으로 계속 이어진다. 걸음에 맞춰 작게 앞뒤로 흔들리며 여유 있는 곡선을 유지한다. 반려견을 프레임 안으로 끌어오지 않는다. | `session4/sheets/man_sheet.png`<br>`session4/sheets/leash_sheet.png`<br>`session4/sheets/park_sheet.png` | `session4/views/man.png`<br>`session4/views/leash.png`<br>`session4/views/park.png` |

## 클립별 참조 묶음

| 클립 | 구간 | 화면에 등장 | 실제 입력할 참조 3장 |
| --- | --- | --- | --- |
| clip1 | 00:00–00:10 | 남성만 | `session4/views/man.png`, `session4/views/leash.png`, `session4/views/park.png` |
| clip2 | 00:10–00:20 | 반려견만 | `session4/views/dog.png`, `session4/views/leash.png`, `session4/views/park.png` |
| clip3 | 00:20–00:30 | 남성만 | `session4/views/man.png`, `session4/views/leash.png`, `session4/views/park.png` |

시트는 외형을 정리하는 준비 자료이며 클립 입력 참조 수에 포함하지 않는다. `park_walk.png`도 외형·관계 확인용 원본으로만 기록한다. 이후 영상 제작 시 각 클립에는 위 단독 컷 3장만 입력한다.

## 참조 제작 계획과 현재 상태

이번에 생성하는 파일은 `session4/script.md`, `session4/shots.json`, `session4/rules.md`뿐이다. 아래 PNG는 제작 예정 경로이며 현재 생성하지 않았다. 영상도 생성하지 않았다.

| 용도 | 준비할 시트 | 시트에서 확정할 단독 컷 | 제작 조건 |
| --- | --- | --- | --- |
| 인물 | `session4/sheets/man_sheet.png` | `session4/views/man.png` | 원본 남성의 얼굴·머리·복장·전신 비율을 정리. 단독 컷에는 남성만, 반려견과 공원은 제외. 리드줄은 소품 참조로 별도 제공. |
| 반려견 | `session4/sheets/dog_sheet.png` | `session4/views/dog.png` | 원본 골든리트리버의 얼굴·황금빛 털·체형·파란 목걸이를 정리. 단독 컷에는 반려견과 목걸이만, 남성과 공원은 제외. |
| 소품 | `session4/sheets/leash_sheet.png` | `session4/views/leash.png` | 빨간 평평한 띠, 고리형 손잡이, 금속 연결부를 정리. 단독 컷은 사람·반려견 없이 리드줄만 담는다. |
| 로케이션 | `session4/sheets/park_sheet.png` | `session4/views/park.png` | 원본 공원의 회색 산책로·가로수·가로등·돌 벤치·오후 빛을 정리. 단독 컷은 사람·동물·리드줄을 제거한 공원만 담는다. 이 한 파일을 6개 샷 모두에 재사용한다. |

외형과 연결의 고정 기준은 `session4/rules.md`, 기계 판독용 샷 명세는 `session4/shots.json`을 따른다.
