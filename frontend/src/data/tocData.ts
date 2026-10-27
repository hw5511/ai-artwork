// Auto-generated from toc.json

export interface Step {
  id: string
  title: string
  file: string
  hidden?: boolean
}

export interface Session {
  id: string
  title: string
  steps: Step[]
}

export const TOC_DATA: Session[] = [
  {
    "id": "session1",
    "title": "1회차 ComfyUI란?",
    "steps": [
      {
        "id": "step1",
        "title": "Comfy 가입",
        "file": "session1/step1-signup.md"
      },
      {
        "id": "step2",
        "title": "기본 인터페이스 설명",
        "file": "session1/step2-interface.md"
      },
      {
        "id": "step3",
        "title": "이미지 생성하기 - Z-Image Turbo 템플릿",
        "file": "session1/step3-z-image-turbo.md"
      },
      {
        "id": "step4",
        "title": "모델 바꾸기 - SDXL base와 Illustrious 비교",
        "file": "session1/step4-sdxl-illustrious.md"
      },
      {
        "id": "step5",
        "title": "영상 생성하기 - LTX 2.5 T2V",
        "file": "session1/step5-ltx25-t2v.md"
      }
    ]
  },
  {
    "id": "session2",
    "title": "2회차 생성 방식 이해하기",
    "steps": [
      {
        "id": "step1",
        "title": "이미지 생성 방식 4가지 - T2I, I2I, Inpainting, Image Edit",
        "file": "session2/step1-image-modes.md"
      },
      {
        "id": "step2",
        "title": "영상 생성 방식 4가지 - T2V, I2V, FLF2V, R2V",
        "file": "session2/step2-video-modes.md"
      },
      {
        "id": "step3",
        "title": "로컬 모델과 유료 API 노드",
        "file": "session2/step3-local-api.md"
      }
    ]
  },
  {
    "id": "session3",
    "title": "3회차 Codex와 Comfy CLI",
    "steps": [
      {
        "id": "step1",
        "title": "codex(gpt 데스크톱) 설치하기",
        "file": "session3/step1-install.md"
      },
      {
        "id": "step2",
        "title": "gpt 로그인",
        "file": "session3/step2-login.md"
      },
      {
        "id": "step3",
        "title": "챗gpt와 codex의 차이점 설명 (로컬 컴퓨터에서 작업한다)",
        "file": "session3/step3-chatgpt-codex.md"
      },
      {
        "id": "step4",
        "title": "codex 모델을 sol 6.1로 설정해 두고 모든 권한으로 변경",
        "file": "session3/step4-settings.md"
      },
      {
        "id": "step5",
        "title": "작업폴더 생성하고 그 폴더로 설정",
        "file": "session3/step5-folder.md"
      },
      {
        "id": "step6",
        "title": "Comfy CLI 설치와 로그인 요청",
        "file": "session3/step6-comfy-cli.md"
      },
      {
        "id": "step7",
        "title": "로그인 링크 열기와 인증 완료 확인",
        "file": "session3/step7-comfy-login.md"
      },
      {
        "id": "step8",
        "title": "Comfy 공식 CLI를 스킬로 저장",
        "file": "session3/step8-create-skill.md"
      },
      {
        "id": "step9",
        "title": "저장한 스킬을 다음 대화에서 사용",
        "file": "session3/step9-skill-folder.md"
      }
    ]
  },
  {
    "id": "session4",
    "title": "4회차",
    "steps": []
  },
  {
    "id": "session5",
    "title": "5회차",
    "steps": []
  },
  {
    "id": "session6",
    "title": "6회차",
    "steps": []
  },
  {
    "id": "session7",
    "title": "7회차",
    "steps": []
  },
  {
    "id": "session8",
    "title": "8회차",
    "steps": []
  }
]
