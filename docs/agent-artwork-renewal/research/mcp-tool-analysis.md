# 리서치: Comfy MCP 도구 자체 분석 (실측)

> 조사일: 2026-08-21 · 실제 세션에 Comfy Cloud MCP(OAuth, production v0.40.1, 도구 41개)를
> 연결하고 스키마 전수 분석 + 무료 탐색 호출로 카탈로그를 실측한 결과.
> [comfy-mcp.md](./comfy-mcp.md)(문서 조사)와 달리 이 문서는 실기기 검증본.

## 1. 도구 구조 — 6계층 파이프라인

| 계층 | 도구 | 비고 |
|---|---|---|
| 탐색 | search_templates / search_models / search_nodes, get_catalog_overview, get_prompting_guide, get_creative_technique | 무료, 구독 불필요 |
| 설계 | get_template(_schema), get_node, cql, apply_slots | 템플릿의 오버라이드 주소를 알아내 값만 교체 |
| 실행 | run_template(권장) / partner_generate(상용) / submit_workflow(직접 조립) / submit_batch | 3경로 + 배치(최대 50) |
| 회수 | wait_for_job, get_output, get_queue, cancel_job | 결과 = 다운로드 링크 + 셸 명령 |
| 체이닝 | use_previous_output, upload_file | 이전 결과 → 다음 워크플로우 입력 |
| 자산화 | save_workflow(버전관리) → share_workflow(공유 URL) → create_app(앱化) | 워크플로우를 재사용 자산으로 |

수업의 기본 리듬(1회차에 체득시킬 4박자):
`search_templates → run_template(오버라이드) → wait_for_job + get_output → use_previous_output`

## 2. 스키마 분석에서 발견한 것 (공식 문서에 없던 것)

- **지출 게이트 내장**: 유료 파트너 노드 포함 실행은 `confirm` 없이 호출하면 견적을
  되돌려주고 명시 동의를 요구. `estimate_credits`(사전 견적), `get_usage_report`(사후 정산),
  `get_billing_activity`(잔액 변동 내역)도 존재 → **"실행 전 비용 확인" 습관을 도구가 강제** — 교육용 최적.
- **이 커넥터는 Cloud 전용**: 로컬 ComfyUI는 구동 불가 (로컬은 별도 `comfy-mcp` pip 서버).
  → 1회차 "로컬 대안"은 별도 설치 경로임을 명시할 것.
- **dry_run**: submit_workflow에 실행 없는 검증 모드 존재 — 고급 학생용.
- **배치 강제 규약**: 독립 생성 2개 이상이면 submit_batch 1회 호출이 규약.
- **upload_file의 원격 세션 동작**: 학생 로컬 이미지는 학생 셸에서 PUT 명령 실행 방식
  (단일 사용·짧은 TTL URL) → 실습 가이드에 이 단계를 명시 필요. 이미지 확장자만 허용.
- **run_template `wait_for_output: true`**: ~25초 원샷 대기 — 빠른 모델이면 호출 1번으로 완결.
- get_prompting_guide에 topic 가이드(seedance-video, openai-images, templates,
  saved-workflows, output-downloads) + 모델 패밀리별 권장 설정.
- get_creative_technique 레시피는 아직 1개(combine-people) — 베타 흔적.

## 3. 카탈로그 실측 (2026-08-21 기준)

템플릿 총 ~450개 (API 태그 314 / Video 135 / Image 109 / Image Edit 92 / T2I 90 / I2V 74 /
T2V 46 / FLF2V 28 / Upscale 26 / Inpainting 13 / **Lip Sync 12** / Character Reference 10 /
Remove Background 7 / Brand Design 7 / Anime 7 / Voice Cloning 6 / **Virtual Try-On 3** …).
모델 카탈로그: LoRA 758, diffusion_model 388 등. TTS 오픈소스(Qwen3-TTS, Chatterbox),
LivePortrait·LatentSync(립싱크), segformer clothes/fashion(의류 세그멘테이션) 노드 확인.

### 커리큘럼 8회차 대조 — 전 회차 기성 템플릿 존재 확인 ✅

| 회차 | 실측 템플릿 (name) |
|---|---|
| 2 제품·룩북 | Remove Background 7종, Relight 8종, VTON 3종: `api_flux_vto`, `templates_rob_fashion_shoot_vton-4in1.app`(Nano Banana 4in1), `template_eric_seedance_5_subject_and_outfit_combine`(Seedream) |
| 3 말하는 영상 | Lip Sync 12종. 특히 `template_image_speech_to_video` = **"Generate UGC Video With Voice Clone"**(이미지→프롬프트→ElevenLabs 음성→LTX 립싱크) — 인플루언서 릴스 실습이 템플릿 하나로 존재. 오픈소스 대안: `video_wan2_1_infinitetalk`, `templates-wan2_1_infinitetalk_music`, `video_ltx2_3_ia2v` |
| 4 브랜드+포스터 | FLF2V 28종, Brand Design 7종 |
| 5·6 카드뉴스·쇼츠 | TTS: Qwen3-TTS·Chatterbox(오픈소스), ElevenLabs(파트너), Voice Cloning 6종 |
| 7 캐릭터 IP | `templates-character_sheet`(360 턴어라운드), `templates-multiple_consistent_shots-nb_pro`(1장→멀티샷), Character Reference 10종 |
| 8 웹툰/애니 | Reference to Video 11종(Kling O3 `api_kling_o3_i2v`, Vidu Q2 `api_vidu_q2_r2v`, Wan2.6 `api_wan_r2v` — identity 보존), Anime 7종 |

## 4. 종합 판단

1. **커리큘럼 실행 가능성 검증 완료** — 8회차 전 실습이 기성 템플릿 + 오버라이드로 구현
   가능. 워크플로우 직접 조립은 거의 불필요.
2. **비용 원칙**: 템플릿 다수(314/450)가 유료 API. **오픈소스 템플릿(Wan·LTX·Qwen·Flux
   오픈 계열) 우선, 파트너는 품질 비교·특수 기능용** — 지출 게이트가 있어 사고는 방지됨.
3. 다음 단계: 회차별로 사용 모델·템플릿·프롬프트를 확정하는 상세 설계
   (수업 방식: 수강생에게 복사-붙여넣기용 프롬프트 제공).
