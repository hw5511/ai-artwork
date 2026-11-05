AI 아트웍 6회차 · 레퍼런스 영상을 분석해 공학 쇼츠 따라 만들기
수업: 18:00~20:00 KST, 오프라인.

demo/my-short.mp4는 실제 Codex 리허설에서 만든 완성본입니다. 레퍼런스는 유튜브 「신비한 건축사전」 쇼츠 4편, 예시 주제는 「다리 이음매에는 왜 틈이 있을까」입니다. 영상 파일은 레포에 넣지 않고 수강생이 yt-dlp로 직접 받습니다.
example/은 같은 리허설의 작업 파일입니다. 경로는 리허설 폴더 기준이니 본인 폴더에 맞게 Codex에게 고쳐 달라고 하세요. analysis.md(레퍼런스 4편 분석), recipe.md(따라 만들 레시피), script.md·shots.json·facts.md(대본·샷 목록·사실 확인), style.md(이미지 공통 스타일), timing.json(Typecast 문장별 시간), clips.json(H3 클립 목록), credits.md(고른 소리의 출처와 사용 조건), ref-verification.csv(수집 측정값).
student-prompts/는 슬라이드 복사 버튼의 리허설 원문입니다. UTF-8. 04-typecast-key와 05b-elevenlabs는 리허설하지 않았습니다.
Typecast 무료 플랜 키는 리허설에서 /v1/text-to-speech 호출이 403 UNUSUAL_ACTIVITY_DETECTED로 거절됐습니다. API 키는 .env에만 저장하고 화면과 로그에 출력하지 마세요.
영상·이미지·효과음·음악 파일은 example.zip에 넣지 않았습니다. 효과음과 음악은 credits.md의 주소에서 각자 받습니다.
음악 크레딧: "Floating Cities" by Kevin MacLeod, https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1600018, Licensed under CC BY 4.0: https://creativecommons.org/licenses/by/4.0/
Remotion은 개인, 직원 3명 이하 영리 조직, 비영리는 무료이고 그 이상의 영리 조직은 회사 라이선스가 필요합니다.
