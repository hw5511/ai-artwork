# 1회차 데모 산출물 (2026-08-21 원격 세션 검증분)

"인물 뒤 텍스트" 연출 파이프라인의 실제 산출물. 수업 자료용.
재현 명세는 레포 루트 `AGENTS.md`의 리뉴얼 섹션 참조.

| 파일 | 내용 |
|---|---|
| `00_model_zimage_turbo.png` | 1차 시도: Z-Image Turbo t2i (오픈소스, 720×1280) |
| `01_model_seedream_2048.png` | **최종 모델컷**: Seedream 4.5 t2i (2048², 무신사 룩북 톤) |
| `02_model_916_crop.png` | 01의 중앙 9:16 크롭 (1152×2048) — i2v 입력용 |
| `03_i2v_h3_square_5s.mp4` | MiniMax H3 i2v, 정방형 원본 입력 (640×768, 5.2s) |
| `04_i2v_h3_916_5s.mp4` | **최종 영상 소스**: H3 i2v, 크롭 입력 (576×1024, 5.2s) |
| `05_composite_v1_square.mp4` | 합성 v1 (작은 타이포, 640×768) |
| `06_composite_v2_916.mp4` | **최종 합성본**: 9:16 + 화면 꽉 찬 SEOUL 타이포 |
| `typo_seoul_916.png` | 타이포 레이어 (투명 PNG, Pillow+Anton 렌더) |
| `sample_sam3_mask.png` | SAM3 인물 마스크 샘플 1프레임 (전체 124프레임은 재생성 가능) |
| `compare_aspect_ok.png` | 원본 vs 영상 첫 프레임 — 비율 유지 검증 (크롭 입력) |
| `compare_aspect_distorted.png` | ⚠️ 함정 예시: 정방형→9:16 강제 시 인물 왜곡 비교컷 |
| `Anton-Regular.ttf` | 타이포 폰트 (Google Fonts, SIL OFL 1.1 — 재배포·상업이용 가능) |

## 수업 활용 포인트
- `compare_aspect_*` 두 장 = "입력 이미지와 영상 종횡비를 맞춰라" 교육용 before/after.
- `05` vs `06` = 타이포 크기·배경에 따른 겹침 효과 차이 비교.
- 남은 개선(다음 세션): 단색 배경 → 자연스러운 실내 배경 버전 재생성.
