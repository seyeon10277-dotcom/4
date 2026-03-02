-- ============================================================
-- Klear Brand AI Chatbot - Supabase 초기 설정 SQL
-- Supabase 대시보드 → SQL Editor에서 이 파일 전체를 실행하세요.
-- ============================================================

-- 1. pgvector 확장 활성화 (벡터 검색에 필요)
create extension if not exists vector;

-- ============================================================
-- 2. 문서 벡터 테이블 (RAG용)
-- text-embedding-3-small 모델 → 1536차원
-- ============================================================
create table if not exists klear_documents (
  id        bigserial primary key,
  content   text        not null,
  source    text,
  embedding vector(1536),
  created_at timestamptz default now()
);

-- 벡터 인덱스 (IVFFlat - 빠른 검색)
create index if not exists klear_documents_embedding_idx
  on klear_documents
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- ============================================================
-- 3. 대화 메시지 테이블 (영구 메모리)
-- ============================================================
create table if not exists klear_messages (
  id         bigserial primary key,
  session_id text        not null,
  role       text        not null check (role in ('user', 'assistant')),
  content    text        not null,
  created_at timestamptz default now()
);

-- 세션별 조회 인덱스
create index if not exists klear_messages_session_idx
  on klear_messages (session_id, created_at asc);

-- ============================================================
-- 4. 벡터 유사도 검색 함수
-- ============================================================
create or replace function match_klear_documents(
  query_embedding vector(1536),
  match_threshold float default 0.4,
  match_count     int   default 5
)
returns table (
  id         bigint,
  content    text,
  source     text,
  similarity float
)
language sql
stable
as $$
  select
    id,
    content,
    source,
    1 - (embedding <=> query_embedding) as similarity
  from klear_documents
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- ============================================================
-- 5. RLS (Row Level Security) 설정
-- Anon key로 읽기/쓰기 허용 (로컬 개발용)
-- 프로덕션에서는 더 엄격한 정책을 적용하세요.
-- ============================================================

-- klear_documents
alter table klear_documents enable row level security;

create policy "Allow read klear_documents"
  on klear_documents for select
  using (true);

create policy "Allow insert klear_documents"
  on klear_documents for insert
  with check (true);

create policy "Allow delete klear_documents"
  on klear_documents for delete
  using (true);

-- klear_messages
alter table klear_messages enable row level security;

create policy "Allow read klear_messages"
  on klear_messages for select
  using (true);

create policy "Allow insert klear_messages"
  on klear_messages for insert
  with check (true);

create policy "Allow delete klear_messages"
  on klear_messages for delete
  using (true);

-- ============================================================
-- 완료!
-- 이제 앱 사이드바에서 Supabase URL과 Anon Key를 입력하고
-- "벡터 DB 초기화" 버튼을 클릭하세요.
-- ============================================================
