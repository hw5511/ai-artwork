# 리서치: 가격 비교 — Comfy MCP vs Higgsfield MCP

> 조사일: 2026-08-21 · 두 서비스 모두 가격 개편이 잦음 — **개강 직전 재확인 필수**.
> Higgsfield 세부 단가는 서드파티 정리 기준 (공식 페이지는 단가 비공개).

## 구독 플랜

| | Comfy Cloud | Higgsfield |
|---|---|---|
| 무료 | GPU 실행 5회 | 워터마크 + 모델 제한 |
| 입문 | **Standard $16/월 = 4,200cr** | Starter $19/월 = 270cr |
| 중간 | Creator $28/월 = 7,400cr | Plus $59/월 = 1,200cr |
| 상위 | Pro $80/월 = 21,100cr | Ultra $129/월 = 3,000cr |
| 크레딧 이월 | 톱업 1년 유효·이월 | **매월 소멸** (톱업도 90일) |
| 크레딧 단가 | ≈ $0.004/cr | ≈ $0.05/cr |

Comfy 크레딧 소모 구조: GPU 가동 시간(0.266cr/초, 유휴 시간 무과금) + 파트너 노드 정액.

## 생성물 1개당 실제 비용 (환산)

| 생성물 | Comfy Cloud | Higgsfield |
|---|---|---|
| 이미지 — 오픈소스(Flux/Qwen/SDXL, GPU 실행) | **~$0.01~0.03** | 불가(자체 모델만) |
| 이미지 — Nano Banana | ~$0.02 | ~$0.05 |
| 이미지 — Flux 상용 | ~$0.02 (Flux.2 pro 6.33cr) | ~$0.20 (FLUX.2 Max 4cr) |
| 비디오 — 오픈소스(Wan/LTX, GPU 실행) | **~$0.3~0.5/5초 클립** | 불가 |
| 비디오 — Kling (720p 5초) | ~$0.34 (17.7cr/초) | ~$0.34 (7cr) |
| 비디오 — Veo 3.1 | $0.10(lite 4s)~$1.3(1080p 8s) | ~$1.43 (4초 29cr) |
| 비디오 — Sora-2 (5초) | ~$0.40 (21.1cr/초) | (플랜 내 제공) |

주요 파트너 노드 단가(Comfy, cr/이미지 또는 cr/초):
Flux 1.1 pro Ultra 12.66/장 · DALL·E 3 8.44/장 · Ideogram V4 Turbo 9.05/장 ·
Qwen Image 3 9.05/장 · Veo 3.1 lite 6.33/초 · Kling v3 17.72/초 ·
Runway Gen4 Turbo 15.09/초 · Sora-2 21.1/초 · Luma Ray 3.2 63.3/5초.

## 수업 8회차 관점

- **Comfy Standard $16**: 오픈소스 모델(Wan·Flux·Qwen) 위주면 이미지 수백 장 + 5초 영상 수십 개
  (공식 표기 "~380개 5초 영상") → **플랜 하나로 8회차 전체 커버 가능**.
- **Higgsfield Starter $19**: 270cr = Veo 영상 약 9개 / Kling 약 38개 →
  영상 중심 커리큘럼이면 부족, 실질 Plus $59 필요.

## 종합 판단

| 관점 | 결론 |
|---|---|
| 가성비 | **Comfy 압승** — 오픈소스 모델을 GPU 원가로 실행, 같은 비용에 ~10배 생성 |
| 모델 폭 | Comfy: 오픈소스 전부 + 파트너 다수 / Higgsfield: 큐레이션 30+ (Soul 캐릭터 특화 강점) |
| 편의성 | Higgsfield 약간 우위 (큐레이션, Soul 일관성) |
| 교육 적합성 | **Comfy** — 워크플로우 개념 유지(기존 강의 자산 연속), 로컬 무료 대안, 크레딧 이월 |
| 리스크 | Higgsfield 가격 개편 잦음 + 크레딧 매월 소멸 |

**결정**: 주력 = **Comfy MCP (Cloud Standard $16)**.
Higgsfield는 대안 소개 + 캐릭터 회차에서 Soul 언급 정도.

## 출처

- Comfy Cloud 가격: https://comfy.org/cloud/pricing/
- Comfy 파트너 노드 단가: https://docs.comfy.org/tutorials/partner-nodes/pricing
- Comfy 크레딧 통합 발표: https://blog.comfy.org/p/comfy-cloud-update-unified-credit-system
- Higgsfield 가격 정리(서드파티): https://www.scopeful.org/blog/higgsfield-pricing-2026
- Higgsfield MCP 공식: https://higgsfield.ai/mcp
