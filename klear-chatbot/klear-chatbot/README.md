# 🌿 Klear Brand AI Chatbot v2

Klear 브랜드 AI 챗봇 — **Supabase pgvector + 영구 대화 메모리** 버전.

---

## 📁 프로젝트 구조

```
klear-chatbot/
├── app/
│   ├── api/
│   │   ├── chat/route.ts       # OpenAI 호출 + 벡터 RAG + 메시지 저장
│   │   ├── setup/route.ts      # 벡터 DB 초기화 (최초 1회)
│   │   └── history/route.ts    # 대화 기록 불러오기/삭제
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # 메인 채팅 UI
├── data/
│   ├── Klear_brand_guide.txt   # 브랜드·제품 가이드 (KR/EN)
│   └── klear_chatbot_db.csv    # 제품 DB
├── lib/
│   ├── supabase.ts             # Supabase 클라이언트 팩토리
│   ├── embeddings.ts           # OpenAI 임베딩 + pgvector 검색
│   ├── memory.ts               # 대화 저장·불러오기·삭제
│   └── rag.ts                  # 키워드 RAG (Supabase 미연결 시 폴백)
├── supabase_setup.sql          # Supabase SQL 초기 설정
├── package.json
└── ...
```

---

## 실행 방법

### 1. 설치 및 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 접속

### 2. OpenAI API Key 입력

사이드바에 `sk-`로 시작하는 키 입력 → 바로 사용 가능 (기본 모드)

---

## Supabase 연동 (영구 메모리 + 벡터 검색)

### 1단계 — Supabase 프로젝트 생성

[supabase.com](https://supabase.com) → New project 생성

### 2단계 — SQL 스크립트 실행

Supabase 대시보드 → SQL Editor → `supabase_setup.sql` 전체 붙여넣기 → Run

이 SQL이 생성하는 것:
- pgvector 확장 활성화
- klear_documents 테이블 (벡터 저장, 1536차원)
- klear_messages 테이블 (대화 영구 저장)
- match_klear_documents 검색 함수
- RLS 정책 (anon key 허용)

### 3단계 — API 키 확인

Supabase 대시보드 → Settings → API

- Project URL: `https://xxxx.supabase.co`
- anon public key: `eyJ...`

### 4단계 — 앱에서 연결

1. 사이드바 → Supabase 섹션 펼치기
2. URL과 Anon Key 입력
3. "벡터 DB 초기화" 버튼 클릭 (최초 1회만)
4. "✅ N개의 문서를 벡터 DB에 인덱싱했습니다." 확인

---

## 모드 비교

| 기능 | 기본 모드 | Supabase 연동 |
|---|---|---|
| 검색 방식 | 키워드 기반 | 벡터 의미 검색 |
| 대화 기억 | 새로고침 시 초기화 | 영구 저장 |
| 재방문 시 | 처음부터 시작 | 이전 대화 이어서 |
| 세션 관리 | X | UUID 기반 멀티 세션 |

---

## 문제 해결

| 증상 | 해결 방법 |
|---|---|
| npm install 실패 | Node.js 18 이상 확인 |
| 벡터 DB 초기화 오류 | supabase_setup.sql 실행 여부 확인 |
| match_klear_documents 없음 | SQL 스크립트 다시 실행 |
| Supabase URL 오류 | https://xxxx.supabase.co 형식 확인 |
| 포트 충돌 | npm run dev -- -p 3001 |
