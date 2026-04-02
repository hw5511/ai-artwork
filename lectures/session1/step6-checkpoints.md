# 체크포인트 모델 탐험

[[image: checkpoint.PNG]]

## 체크포인트 모델이란?

체크포인트 모델은 대량의 이미지로 학습된 AI 모델 파일입니다.  
각 모델은 특정 스타일이나 주제에 특화되어 있습니다.

### 모델의 구성 요소
- **학습 데이터**: 모델이 학습한 이미지들
- **가중치**: 학습된 패턴과 특징들
- **스타일**: 모델이 생성하는 이미지의 특성

---section---

## 모델 교체 실습

서로 다른 Stable Diffusion 모델을 비교하며 각 모델의 특성을 이해해봅시다.

### 1. 기본 이미지 생성 템플릿

먼저 SD 1.5 모델로 기본 이미지를 생성합니다.

#### 단계별 실습
1. **템플릿 선택**: "Image Generation" 선택
2. **체크포인트 모델 선택**: `v1/v1-5-pruned-emaonly` 선택
3. **프롬프트 입력**:
```prompt
a cute fluffy cat sitting in a garden, warm sunlight,
professional photography, detailed fur texture
```
4. **이미지 생성**: Queue Prompt 버튼 클릭

---

### 2. SDXL 테스트

이제 고해상도 모델인 SDXL로 동일한 이미지를 생성해봅시다.

#### 단계별 실습
1. **체크포인트 모델 변경**: Load Checkpoint 노드에서 `sdxl/sd_xl_base_1.0` 선택
2. **빈 잠재이미지 크기 변경**: Empty Latent Image 노드에서 Width와 Height를 모두 `1024`로 설정
3. **프롬프트 입력**:
```prompt
a cute fluffy cat sitting in a garden, warm sunlight,
professional photography, detailed fur texture
```
4. **이미지 생성**: Queue Prompt 버튼 클릭

SD 1.5와 SDXL의 품질 차이를 비교해보세요.

---

### 3. Flux 테스트

Flux는 최신 세대 모델로, 고품질 이미지와 뛰어난 프롬프트 이해력을 제공합니다.

> **참고**: 수강 환경에 따라 강사 시연으로 대체될 수 있습니다.

#### 단계별 실습
1. **RunDiffusion Session을 Large로 실행**:
   - 기존 세션 종료 후 Large 세션으로 재시작
   - Flux는 높은 컴퓨팅 파워가 필요합니다
2. **템플릿 선택**: `flux_schnell_full_text_to_image` 선택
3. **이미지 생성 실행**: Queue Prompt 버튼 클릭
   - 약 250초 정도 소요될 수 있음

[[image: flux-sdxl-comparison.png]]

---section---

### Flux의 특징: 향상된 텍스트 인코더

Flux 모델은 기존 SD 모델과 다른 텍스트 인코더 구조를 사용합니다.

#### CLIP vs T5-XXL 인코더

기존 Stable Diffusion 모델들은 주로 **CLIP 인코더**를 사용합니다:
- CLIP은 이미지와 텍스트를 연결하는 임베딩 모델
- 키워드 중심의 프롬프트 이해에 최적화
- 단순한 문장 구조에 강점

**CLIP의 한계**:
예를 들어 CLIP 기반 모델은 다음 두 문장을 구분하기 어렵습니다:
- "A dog chasing a man" (개가 사람을 쫓는 중)
- "A man chasing a dog" (사람이 개를 쫓는 중)

**Flux의 개선점**:
Flux는 CLIP과 함께 **T5-XXL 인코더**를 사용합니다:
- T5-XXL은 11B 파라미터급 대형 언어 모델
- 원래 문장 의미 이해와 변환에 특화
- 완전한 문장/단락을 "의미 단위"로 임베딩 가능
- 복잡한 문맥과 관계를 정확하게 이해

#### 템플릿 프롬프트 예시

템플릿에 포함된 프롬프트를 살펴보면 두 인코더의 역할을 알 수 있습니다:

**CLIP 인코더 (clip_l) 입력**:
```prompt
Cute retro mini car, pastel-colored 3D flowers overflowing from it,
soft green background, minimalist and fresh style, high-precision rendering,
spring-like vibrant atmosphere, delicate petal details, gentle color grading,
whimsical and lovely scene.
```
키워드 중심의 간결한 설명

**T5 인코더 (t5xxl) 입력**:
```prompt
Create a 3D-styled image: A cute, retro-looking mini car with soft,
pastel-colored flowers (like daisies, pink blooms) overflowing from it.
Set against a gentle green background, giving a fresh, spring-vibe.
Make it look whimsical and delicate, like a sweet illustration.
```
자연어 문장으로 된 상세한 설명

이처럼 Flux는 두 인코더를 함께 사용하여 키워드와 문맥을 모두 이해하며, 더욱 정확한 이미지를 생성합니다.

---section---

## 모델 다운로드 실습

### 1단계: Civitai 사이트 탐색

Civitai는 AI 이미지 생성 모델을 공유하는 커뮤니티 플랫폼입니다.

**Civitai 사이트**: [https://civitai.com](https://civitai.com)

### 2단계: RunDiffusion API 다운로드 방식 활용

#### Civitai 다운로드 도구

RunDiffusion 터미널에서 사용할 aria2c 명령어를 쉽게 생성할 수 있는 도구입니다.

[[download: downloads/session1/CivitaiDownloader.exe | Civitai Downloader 다운로드]]

**주요 기능**:
- Civitai API 키 저장 및 관리
- 다운로드 링크 자동 파싱
- aria2c 명령어 자동 생성
- 클립보드 복사 기능

**사용 방법**:
1. CivitaiDownloader.exe 실행
2. Civitai API 키 입력 후 Save 버튼 클릭
3. Civitai 다운로드 링크 붙여넣기
4. 생성된 명령어를 Copy to Clipboard 버튼으로 복사
5. RunDiffusion 터미널에 붙여넣기하여 실행

### 3단계: Civitai API 키 발급

1. **Civitai 회원가입**: [https://civitai.com](https://civitai.com)에서 계정 생성
2. **API 키 발급**:
   - 우측 상단 프로필 클릭 → Account Settings
   - API Keys 섹션으로 이동
   - "Add API Key" 버튼 클릭하여 새 키 생성
   - 생성된 API 키 복사 (안전하게 보관)

#### aria2c 명령어 생성 방법

**수동 작성 방법**:

원하는 모델의 다운로드 링크를 복사한 후, 아래 형식으로 명령어를 작성합니다:

```bash
aria2c "[civitai 사이트 모델 다운로드 링크]&token=[발급받은 API 키]"
```

**예시**:
```bash
aria2c "https://civitai.com/api/download/models/123456?type=Model&token=abcd1234ef5678gh9012ij3456kl7890"
```

**도구 사용 방법** (권장):

위에서 다운로드한 Civitai Downloader를 사용하면 명령어를 자동으로 생성할 수 있습니다.

---section---

### 4단계: Astranime 모델 다운로드 실습

실제로 Civitai에서 인기 있는 애니메이션 스타일 모델을 다운로드해봅시다.

#### Astranime 모델 정보
- **모델명**: Astranime
- **Civitai 링크**: [https://civitai.com/models/248011/astranime](https://civitai.com/models/248011/astranime)
- **스타일**: 애니메이션 스타일 이미지 생성에 특화
- **권장 해상도**: 512x512 (SD 1.5 기반)

#### 다운로드 실습
1. Civitai에서 Astranime 모델 페이지 접속
2. 다운로드 버튼 클릭하여 다운로드 링크 복사

---section---

### 5단계: RunDiffusion에서 파일 터미널 실행

1. **터미널 열기**:
   - RunDiffusion 인터페이스에서 상단 메뉴의 "Terminal" 클릭

2. **다운로드 명령어 실행**:
   - 준비한 `aria2c` 명령어를 터미널에 붙여넣기
   - Enter 키를 눌러 다운로드 시작
   - 다운로드 진행 상황 확인

3. **세션 새로고침으로 모델 적용 확인**:
   - 다운로드 완료 후 브라우저 새로고침 (F5)
   - ComfyUI의 Load Checkpoint 노드에서 드롭다운 클릭
   - 새로 다운로드한 모델이 목록에 표시되는지 확인
   - 모델을 선택하여 사용 시작