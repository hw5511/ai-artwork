# RunDiffusion 시작하기

## RunDiffusion이란?

RunDiffusion은 클라우드 기반 AI 이미지 생성 플랫폼입니다.  
별도의 고사양 컴퓨터 없이도 웹 브라우저에서 Stable Diffusion과 ComfyUI를 사용할 수 있습니다.

### 주요 장점
- 고사양 GPU 불필요 (클라우드 GPU 제공)
- 설치 과정 없이 즉시 사용 가능
- 시간 단위 과금 (사용한 만큼만 지불)
- 다양한 모델과 도구 사전 설치

---section---

## 계정 생성 및 로그인

[[image: rundiffusion_home.png]]

### 1. RunDiffusion 접속
웹 브라우저에서 RunDiffusion 사이트에 접속합니다.  
간혹 다른 페이지로 연결되는 경우가 있으니, 메인 페이지에서 "RunDiffusion" 버튼을 클릭하세요.

### 2. 회원가입
우측 상단의 프로필 버튼을 클릭하여 회원가입을 진행합니다.  
이메일 인증을 완료하면 계정이 활성화됩니다.

### 3. 크레딧 충전
로그인 후 Balance 섹션에서 "Add Funds"를 클릭합니다.

[[image: addfunds.png]]

```settings
최소 충전 금액: $10
권장 충전 금액: $20 (수업용)
결제 수단: 글로벌 신용/체크카드
```

**중요**: 충전된 크레딧은 사용한 시간만큼만 차감됩니다.

---section---

## ComfyUI 세션 시작하기

### 1. ComfyUI 선택
메인 페이지를 스크롤하여 다양한 AI 도구들을 확인할 수 있습니다.  
"ComfyUI" 항목을 찾아 "Select" 버튼을 클릭합니다.

[[image: comfyui_select.png]]

### 2. 세션 설정

[[image: setting.png]]

### 하드웨어 옵션 설명
- **Small**: 기본 학습용, 가장 경제적
- **Medium**: 일반 작업용, 속도 향상
- **Large**: 고급 작업용, 빠른 생성

Software Version 설정 -> 기본 current version 사용, 오류 발생시 최신 beta version 선택 후 사용

*files only 세션의 경우는 2025년 10월 기준 : beta july 3 2025 버전으로 실행하세요

### 3. 세션 시작
"Launch" 버튼을 클릭하면 가상 컴퓨터가 준비됩니다.  
보통 1-3분 내에 ComfyUI 인터페이스가 표시됩니다.

[[image: run_sesions.png]]

[[image: running_home.png]]

---section---

## 세션 관리

### 시간 관리
상단에 현재 세션의 경과 시간이 표시됩니다.  
필요시 "Extend" 버튼으로 시간을 연장할 수 있습니다.

### 세션 종료
**주의**: 반드시 "Stop" 버튼을 클릭하여 세션을 종료하세요.  
브라우저 탭을 닫는 것만으로는 세션이 종료되지 않습니다.

```settings
자동 종료: 설정 시간 경과 시
수동 종료: Stop 버튼 클릭
미사용 크레딧: 자동 환불
```

