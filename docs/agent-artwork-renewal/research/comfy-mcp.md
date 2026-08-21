# 리서치: Comfy MCP

> 조사일: 2026-08-21 · Comfy MCP는 **public beta** — 도구·동작 변경 가능, 개강 전 재확인 필수.

## 개요

2026-06-30 Comfy Org 공식 발표. AI 에이전트(Claude Code / Claude Desktop / Cursor / Codex 등)를
**MCP(Model Context Protocol)로 ComfyUI 엔진에 직접 연결**한다.
자연어 지시만으로 에이전트가 워크플로우를 탐색·조립·실행하고 결과를 회수한다.
노드 그래프 조작, 수동 모델 다운로드, 로컬 GPU 없이 가능.

## 두 가지 연결 방식

| | Cloud 연결 | Local 연결 |
|---|---|---|
| 서버 | `https://cloud.comfy.org/mcp` | `comfy-mcp` (오픈소스, pip) |
| GPU | Comfy Cloud GPU (저사양 PC OK) | 로컬 GPU |
| 세팅 | Claude Code 한 줄 / Desktop OAuth | Python 3.10+, comfy-cli ≥1.14, ComfyUI 설치 |
| 비용 | 구독 필요 (신규 5회 무료) | 무료 (자기 GPU) |

로컬 설치:
```bash
pip install comfy-mcp
claude mcp add comfy-mcp -e COMFY_BIN=/path/to/venv/bin/comfy -- comfy-mcp
```

## 주요 도구 (Cloud 기준)

- **탐색**: `search_templates`(수백 개 워크플로우, 자동 최신화), `search_models`, `search_nodes`,
  `get_node`, `get_prompting_guide`(모델별 권장 설정), `cql`(그래프 구조 질의)
- **생성**: `run_template`(권장), `submit_workflow`(API 포맷 직접 실행),
  `partner_generate`(상용 모델: Flux, Grok, Gemini, OpenAI, Ideogram, Seedance …), `upload_file`, `apply_slots`
- **작업 관리**: `get_job_status`, `wait_for_job`, `get_output`,
  `use_previous_output`(**결과를 다음 워크플로우에 체이닝** — i2i/i2v 파이프라인 핵심),
  `submit_batch` 등 배치 도구
- **저장/공유**: `save_workflow`, `update_workflow`, `share_workflow`(공유 URL),
  `import_shared_workflow`, `create_app`(워크플로우 → 간단 앱), `get_app_mode_url`
- **계정**: `get_billing_status`, `get_server_info`

로컬 서버는 총 39개 도구: 위 축소판 + `launch/stop/restart_comfyui`, `install_node`,
`download_model`, `system_stats`, `free_memory`, `validate_workflow` 등 (로컬 설치 관리 포함).

## 생성 타입

이미지(t2i, 편집, 업스케일, 배경 제거) / 비디오(t2v, i2v, 연장) / 오디오(음악·사운드) / 3D.

## 강의 관점 시사점

- **"노드 조작 학습"이 불필요해짐** → 학생은 개념(t2i/i2i/i2v)과 에이전트 디렉팅만 배우면 됨.
- 에이전트 흐름: 탐색(`search_templates`) → 실행(`run_template`) → 회수(`wait_for_job`+`get_output`) —
  수업 실습이 이 3단 리듬을 반복하게 설계.
- **주의**: public beta라 도구명·동작이 바뀔 수 있음 → 강의는 개념 중심, 도구명은 유연하게.
- 파트너 모델은 크레딧 차감 + 지출 전 명시 승인 흐름 존재.

## 출처

- 공식 문서: https://docs.comfy.org/agent-tools/mcp
- 로컬 서버: https://github.com/Comfy-Org/comfy-mcp
- 발표 블로그: https://blog.comfy.org/p/comfy-mcp-turn-your-agent-into-a
- 소개 기사: https://comfyui-wiki.com/en/news/2026-06-30-comfy-mcp-agent-integration
