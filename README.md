# Klear — 프리미엄 K-뷰티 스킨케어 이커머스 플랫폼

> React 18 + TypeScript + Tailwind CSS v4 + Supabase 기반의 한국 뷰티 쇼핑몰 풀스택 웹 애플리케이션

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [전체 디렉토리 구조](#3-전체-디렉토리-구조)
4. [아키텍처 설계](#4-아키텍처-설계)
5. [핵심 컴포넌트 상세 설명](#5-핵심-컴포넌트-상세-설명)
6. [전역 상태 관리 (Context API)](#6-전역-상태-관리-context-api)
7. [백엔드 연동 (Supabase)](#7-백엔드-연동-supabase)
8. [국제화 (i18n)](#8-국제화-i18n)
9. [스타일링 시스템](#9-스타일링-시스템)
10. [애니메이션 시스템](#10-애니메이션-시스템)
11. [데이터 흐름 & 사용자 시나리오](#11-데이터-흐름--사용자-시나리오)
12. [환경 변수 & 배포](#12-환경-변수--배포)
13. [보안 분석](#13-보안-분석)
14. [개발 환경 설정](#14-개발-환경-설정)
15. [한계점 & 향후 확장 방향](#15-한계점--향후-확장-방향)

---

## 1. 프로젝트 개요

**Klear**는 한국 프리미엄 스킨케어 브랜드 "APR Beauty"의 이커머스 웹사이트입니다.
쇼핑몰 기능(상품 탐색, 장바구니, 결제)과 브랜드 마케팅 기능(히어로 슬라이더, 성분 소개, 브랜드 스토리)을 하나의 SPA(Single Page Application)로 통합한 구조입니다.
Figma 디자인 시스템(`@figma/my-make-file`)을 기반으로 내보낸 프로젝트입니다.

### 주요 기능

| 기능 | 설명 |
|------|------|
| **히어로 슬라이더** | 6초 자동 전환 캐러셀 (BLACKPINK 스페셜 에디션 / Bemot 선세럼) |
| **상품 쇼케이스** | 3종 상품 그리드 (SPF 50 선세럼) + 별점 리뷰 |
| **장바구니** | 우측 슬라이드 사이드바 + localStorage 영속 저장 |
| **결제 페이지** | 신용카드 / PayPal / Apple Pay 선택 (시뮬레이션) |
| **회원 인증** | 회원가입 / 로그인 / 아이디 찾기 / 임시 비밀번호 발급 |
| **마이페이지** | 프로필 / 주문 내역 / 쿠폰 관리 |
| **AI 챗봇** | FAQ 기반 고객 지원 채팅 + 대화 초기화 |
| **검색** | 상품·성분·섹션 통합 클라이언트 사이드 검색 |
| **다국어 지원** | 한국어 / 영어 실시간 전환 (DeepL API 선택적 연동) |
| **쿠폰 팝업** | 신규 회원 20% 할인 쿠폰 (세션당 1회 노출) |

---

## 2. 기술 스택

### 코어

| 분류 | 기술 | 버전 |
|------|------|------|
| UI 프레임워크 | React | 18.3.1 |
| 언어 | TypeScript | - |
| 빌드 도구 | Vite | 6.3.5 |
| 라우팅 | 상태 기반 페이지 전환 (react-router 보조) | 7.13.0 |

### 스타일링

| 분류 | 기술 | 버전 |
|------|------|------|
| CSS 프레임워크 | Tailwind CSS v4 | 4.1.12 |
| Tailwind Vite 플러그인 | @tailwindcss/vite | 4.1.12 |
| UI 컴포넌트 기반 | Radix UI + shadcn/ui | - |
| 아이콘 | Lucide React | - |
| 애니메이션 | Motion (Framer Motion 대체) | - |

### 상태 관리 & 데이터

| 분류 | 기술 | 버전 |
|------|------|------|
| 전역 상태 | React Context API (커스텀 훅) | - |
| 폼 관리 | React Hook Form | 7.55.0 |
| 데이터 영속 | localStorage / sessionStorage | - |
| 백엔드 / 인증 | Supabase (PostgreSQL + Auth) | 2.97.0 |
| 번역 API | DeepL API (선택적) | - |

### UI 추가 라이브러리

| 라이브러리 | 버전 | 용도 |
|-----------|------|------|
| recharts | 2.15.2 | 차트 컴포넌트 |
| react-slick | 0.31.0 | 캐러셀 |
| embla-carousel-react | 8.6.0 | 캐러셀 |
| sonner | 2.0.3 | 토스트 알림 |
| date-fns | 3.6.0 | 날짜 유틸리티 |
| clsx | 2.1.1 | 조건부 className |
| class-variance-authority | 0.7.1 | 컴포넌트 스타일 변형 |
| @mui/material | 7.3.5 | Material UI (부분 사용) |
| react-responsive-masonry | 2.7.1 | 메이슨리 레이아웃 |
| react-dnd | - | 드래그 앤 드롭 |

---

## 3. 전체 디렉토리 구조

```
Desktop/4/
│
├── .env                          # 환경 변수 (Supabase URL/Key, DeepL API Key)
├── .env.example                  # 환경 변수 템플릿
├── .gitignore                    # Git 무시 파일 목록
├── package.json                  # 의존성 & 스크립트 정의
├── vite.config.ts                # Vite 빌드 설정
├── postcss.config.mjs            # PostCSS 설정 (최소 설정)
├── index.html                    # HTML 진입점 (SPA 루트)
├── netlify.toml                  # Netlify 배포 설정 (SPA 리디렉션 포함)
├── ATTRIBUTIONS.md               # 크레딧/출처 명시
├── DOWNLOAD_CHECKLIST.md         # 설치 체크리스트
├── VSCODE_GUIDE.md               # VSCode 설정 가이드
│
├── public/
│   ├── klear-logo.png            # 브랜드 로고 (6.4KB)
│   └── blackpink-special-edition.png  # BLACKPINK 협업 이미지 (302KB)
│
├── src/
│   ├── main.tsx                  # React DOM 렌더 진입점
│   │
│   ├── app/
│   │   ├── App.tsx               # 루트 컴포넌트 — 페이지 라우팅 & Context Provider
│   │   │
│   │   ├── components/           # 기능 컴포넌트
│   │   │   ├── Navigation.tsx    # 상단 고정 헤더 (메뉴, 검색, 장바구니, 로그인)
│   │   │   ├── Hero.tsx          # 자동 전환 히어로 슬라이더 (6초 간격)
│   │   │   ├── ProductShowcase.tsx  # 상품 그리드 + 별점 + 장바구니 버튼
│   │   │   ├── TechFeatures.tsx  # 성분 기술 소개 카드 6개
│   │   │   ├── BrandStory.tsx    # 브랜드 연혁 타임라인 + 핵심 가치
│   │   │   ├── Footer.tsx        # 푸터 (뉴스레터, 링크, SNS, 연락처)
│   │   │   ├── Cart.tsx          # 장바구니 슬라이드 사이드바
│   │   │   ├── SearchDialog.tsx  # 통합 검색 모달
│   │   │   ├── AuthModal.tsx     # 로그인/회원가입/찾기 모달 (5가지 뷰)
│   │   │   ├── CheckoutPage.tsx  # 결제 페이지 (전체 화면)
│   │   │   ├── AccountPage.tsx   # 마이페이지 (프로필/주문/쿠폰 탭)
│   │   │   ├── ProductDetail.tsx # 상품 상세 페이지
│   │   │   ├── Chatbot.tsx       # 우하단 고정 AI 챗봇
│   │   │   ├── CouponPopup.tsx   # 신규 회원 쿠폰 팝업 (세션당 1회)
│   │   │   ├── StarRating.tsx    # 별점 리뷰 컴포넌트
│   │   │   │
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx  # 이미지 로드 실패 시 fallback 처리
│   │   │   │
│   │   │   └── ui/               # shadcn/ui 기반 재사용 UI 컴포넌트 (40개+)
│   │   │       ├── accordion.tsx      # 아코디언
│   │   │       ├── alert-dialog.tsx   # 경고 다이얼로그
│   │   │       ├── avatar.tsx         # 아바타
│   │   │       ├── badge.tsx          # 배지
│   │   │       ├── breadcrumb.tsx     # 경로 표시
│   │   │       ├── button.tsx         # 버튼
│   │   │       ├── calendar.tsx       # 달력
│   │   │       ├── card.tsx           # 카드
│   │   │       ├── carousel.tsx       # 캐러셀
│   │   │       ├── chart.tsx          # 차트 (recharts 래퍼)
│   │   │       ├── checkbox.tsx       # 체크박스
│   │   │       ├── dialog.tsx         # 다이얼로그
│   │   │       ├── drawer.tsx         # 드로어
│   │   │       ├── dropdown-menu.tsx  # 드롭다운 메뉴
│   │   │       ├── form.tsx           # 폼
│   │   │       ├── input.tsx          # 인풋
│   │   │       ├── label.tsx          # 레이블
│   │   │       ├── pagination.tsx     # 페이지네이션
│   │   │       ├── progress.tsx       # 진행 바
│   │   │       ├── radio-group.tsx    # 라디오 그룹
│   │   │       ├── scroll-area.tsx    # 스크롤 영역
│   │   │       ├── select.tsx         # 셀렉트
│   │   │       ├── separator.tsx      # 구분선
│   │   │       ├── sheet.tsx          # 시트
│   │   │       ├── skeleton.tsx       # 스켈레톤 로딩
│   │   │       ├── slider.tsx         # 슬라이더
│   │   │       ├── sonner.tsx         # 토스트 알림
│   │   │       ├── switch.tsx         # 스위치
│   │   │       ├── table.tsx          # 테이블
│   │   │       ├── tabs.tsx           # 탭
│   │   │       ├── textarea.tsx       # 텍스트에어리어
│   │   │       ├── tooltip.tsx        # 툴팁
│   │   │       ├── use-mobile.ts      # 모바일 감지 커스텀 훅
│   │   │       └── utils.ts           # cn() 유틸 함수 (clsx + tailwind-merge)
│   │   │
│   │   └── contexts/             # 전역 상태 Context
│   │       ├── LanguageContext.tsx   # 언어 상태 (ko/en) + t() 번역 함수
│   │       ├── CartContext.tsx       # 장바구니 전역 상태
│   │       └── AuthContext.tsx       # 사용자 인증 전역 상태
│   │
│   ├── lib/
│   │   ├── supabase.ts           # Supabase 클라이언트 초기화
│   │   └── deepl.ts              # DeepL 번역 API 래퍼 함수
│   │
│   └── styles/
│       ├── index.css             # 전역 스타일 (모든 CSS import 집결점)
│       ├── fonts.css             # 폰트 import
│       ├── theme.css             # CSS 변수 & 테마 정의
│       └── tailwind.css          # Tailwind 지시자 (@tailwind base/components/utilities)
│
└── guidelines/
    └── Guidelines.md             # 개발 가이드라인 문서
```

---

## 4. 아키텍처 설계

### 4-1. SPA 페이지 라우팅 방식

React Router의 URL 기반 라우팅 대신, **`App.tsx`의 `useState`로 현재 페이지를 관리**합니다.

```typescript
type PageView = 'home' | 'checkout' | 'account' | 'productDetail'
```

| 뷰 이름 | 전환 트리거 | 렌더링 컴포넌트 |
|---------|-----------|----------------|
| `home` | 초기 진입 / 로고 클릭 | Hero, ProductShowcase, TechFeatures, BrandStory, Footer |
| `checkout` | "결제하기" 클릭 | CheckoutPage |
| `account` | "마이페이지" 클릭 (로그인 필요) | AccountPage |
| `productDetail` | 상품 카드 클릭 | ProductDetail |

모달/오버레이 컴포넌트(Cart, SearchDialog, AuthModal, Chatbot, CouponPopup)는 **어느 뷰에서든 항상 렌더링**됩니다.

### 4-2. 전체 컴포넌트 계층 구조

```
App.tsx
│
├── [Context Providers — 최상위 래핑]
│   ├── LanguageProvider  ──► 전 컴포넌트에서 t() 번역 함수 접근 가능
│   ├── AuthProvider      ──► 전 컴포넌트에서 user 로그인 상태 접근 가능
│   └── CartProvider      ──► 전 컴포넌트에서 cart 장바구니 상태 접근 가능
│
├── [항상 렌더링 — 모든 페이지에서 표시]
│   ├── Navigation         (상단 헤더)
│   ├── Cart               (장바구니 슬라이드 사이드바)
│   ├── SearchDialog       (검색 모달)
│   ├── AuthModal          (로그인/회원가입 모달)
│   ├── Chatbot            (우하단 고정 챗봇)
│   └── CouponPopup        (세션당 1회 팝업)
│
└── [PageView 상태에 따라 조건부 렌더링]
    ├── 'home'          → Hero + ProductShowcase + TechFeatures + BrandStory + Footer
    ├── 'checkout'      → CheckoutPage
    ├── 'account'       → AccountPage
    └── 'productDetail' → ProductDetail
```

### 4-3. 파일 간 의존성 (Import 관계)

```
App.tsx
├── 모든 주요 컴포넌트 import
├── 3개 Context Provider 조합

Navigation.tsx      → useLanguage(), useCart(), useAuth()
Hero.tsx            → useLanguage()
ProductShowcase.tsx → useLanguage(), useCart(), ImageWithFallback
TechFeatures.tsx    → useLanguage()
BrandStory.tsx      → useLanguage(), ImageWithFallback
Footer.tsx          → useLanguage()
Cart.tsx            → useCart(), useLanguage()
SearchDialog.tsx    → useLanguage()
AuthModal.tsx       → useAuth(), useLanguage()
Chatbot.tsx         → useLanguage()
CouponPopup.tsx     → useLanguage()
CheckoutPage.tsx    → useCart(), useLanguage()
AccountPage.tsx     → useAuth(), useLanguage()

Contexts:
├── LanguageContext → deepl.ts (번역 API)
├── CartContext     → localStorage
└── AuthContext     → supabase.ts

Library:
├── supabase.ts → Supabase SDK
└── deepl.ts    → DeepL HTTP API
```

### 4-4. 데이터 저장 전략

| 데이터 종류 | 저장 위치 | localStorage 키 | 특성 |
|------------|----------|----------------|------|
| 장바구니 아이템 | localStorage | `klear_cart` | 브라우저 닫아도 유지 |
| 로그인 사용자 정보 | localStorage | `klear_user` | 자동 로그인 시 사용 |
| 자동 로그인 여부 | localStorage | `klear_auto_login` | "기억하기" 체크박스 상태 |
| 상품별 별점 | localStorage | `klear_reviews` | 사용자 리뷰 영속 저장 |
| 쿠폰 팝업 닫기 여부 | sessionStorage | `klear_coupon_dismissed` | 탭/창 닫으면 초기화 |
| 회원 정보 (DB) | Supabase PostgreSQL | `users` 테이블 | 서버 영속 저장 |

---

## 5. 핵심 컴포넌트 상세 설명

### 5-1. `Navigation.tsx` — 상단 헤더

- 화면 최상단 고정 (sticky + `position: fixed`)
- 스크롤 감지: `scrollY > 50`이면 배경에 blur 효과 추가
- **데스크탑:** 로고 + 메뉴(Home, Products) + 우측 아이콘 그룹
- **모바일:** 로고 + 햄버거 버튼 (토글 드롭다운 메뉴)
- 언어 전환 버튼 (지구본 아이콘) → `ko` ↔ `en`
- 검색 아이콘 → `SearchDialog` 열기
- 장바구니 아이콘 + 빨간 배지(아이템 수) → `Cart` 사이드바 열기
- 로그인 버튼 → `AuthModal` 열기
- 로그인 상태 시: 사용자 이름 표시 + 드롭다운 (마이페이지, 로그아웃)

사용 Context: `useLanguage()`, `useCart()`, `useAuth()`

---

### 5-2. `Hero.tsx` — 히어로 슬라이더

- `setInterval` 6초마다 슬라이드 자동 전환
- 이전/다음 화살표 버튼으로 수동 제어
- **슬라이드 1:** BLACKPINK 스페셜 에디션 한정 컬렉션
- **슬라이드 2:** Bemot 모이스처라이징 선세럼 SPF 50
- Motion 라이브러리로 슬라이드 진입·퇴장 방향 애니메이션
- 배경에 CSS 장식 오브(orb) 요소

---

### 5-3. `ProductShowcase.tsx` — 상품 그리드

표시 상품: Bemot 선세럼 3가지 변형 (컴포넌트 내 하드코딩 배열)

각 상품 카드 구성:

```
┌─────────────────────────────────┐
│          상품 이미지              │
├─────────────────────────────────┤
│ 카테고리 태그 / 상품명             │
│ 별점 ★★★★★ 4.8 (리뷰 2,847개)   │
│ 특징 태그: SPF 50 / No White Cast │
│ 혜택 아이콘: ☀️ 💧 🛡️ ❤️        │
│ 가격: ₩45,000                   │
├─────────────────────────────────┤
│   [장바구니 추가]   [지금 구매]    │
└─────────────────────────────────┘
```

사용 훅: `useCart().addToCart()`, `useLanguage().t()`
별점은 localStorage `klear_reviews` 키에 저장

---

### 5-4. `AuthModal.tsx` — 인증 모달

5가지 내부 뷰 전환으로 구성:

```typescript
type ModalView = 'login' | 'signup' | 'findId' | 'findPassword' | 'signupSuccess'
```

| 뷰 이름 | 입력 필드 | 동작 |
|---------|---------|------|
| `login` | 아이디, 비밀번호, 기억하기 체크박스 | Supabase 조회 → 로그인 처리 |
| `signup` | 아이디, 비밀번호, 이메일 | Supabase INSERT → 성공 화면 이동 |
| `findId` | 이메일 | Supabase 조회 → 아이디 마스킹 표시 |
| `findPassword` | 아이디, 이메일 | 임시 비밀번호 생성 → Supabase UPDATE |
| `signupSuccess` | (없음) | `WELCOME20` 쿠폰 코드 표시 |

---

### 5-5. `Cart.tsx` — 장바구니 사이드바

- 화면 우측에서 슬라이드인 (Motion `x` 트랜지션)
- 장바구니 아이템 목록: 이미지, 이름, 가격, 수량 조절(+/-), 삭제 버튼
- 하단에 총 금액 합계 표시
- "결제하기" 버튼 → `pageView = 'checkout'` 전환

---

### 5-6. `CheckoutPage.tsx` — 결제 페이지

2열 레이아웃으로 구성:
- **좌측:** 결제 수단 탭 선택 (신용카드 / PayPal / Apple Pay) + 카드 입력 폼
- **우측:** 주문 요약 패널 (상품 목록, 소계, 배송비, 최종 금액)

결제 처리 흐름:
1. 결제 수단 선택
2. 카드번호 / 유효기간(MM/YY) / CVV / 카드명 입력
3. "결제 완료" 클릭 → 2초 딜레이 로딩 (시뮬레이션)
4. 성공 화면 표시 → 주문 번호 생성 + `clearCart()` 호출

> **주의:** 실제 PG(결제대행) 연동 없음 — 완전 시뮬레이션

---

### 5-7. `AccountPage.tsx` — 마이페이지

로그인 상태에서만 접근 가능. 3개 탭으로 구성:

| 탭 | 표시 내용 |
|----|---------|
| 프로필 | 아바타, 로그인 아이디, 이메일, 가입일, 연락처 정보 |
| 주문 내역 | 샘플 주문 데이터 (하드코딩, 실제 DB 미연동) |
| 쿠폰 | 사용 가능한 할인 코드 목록 + 클립보드 복사 버튼 |

---

### 5-8. `ProductDetail.tsx` — 상품 상세 페이지

상품 카드에서 진입하는 전체 화면 상세 뷰:
- 고화질 상품 이미지
- 상품명, 가격, 설명
- 수량 선택 + 장바구니 추가 / 바로 구매 버튼
- 성분 및 사용법 탭

---

### 5-9. `Chatbot.tsx` — AI 챗봇

- 화면 우하단 고정 채팅 버튼
- **동작 방식:** 실제 AI 없음 — FAQ 키워드 매칭 기반 자동 응답

| 입력 키워드 | 제공 응답 내용 |
|-----------|-------------|
| 가격 / price | 제품별 가격 안내 |
| 배송 / shipping | 배송 소요일 안내 |
| 기술 / technology | 핵심 성분 기술 설명 |
| 연락 / contact | 고객센터 연락처 |

- 빠른 답장 버튼 5개 (공통 질문 바로가기)
- 대화 초기화 버튼 (🔄) 클릭 시 채팅 내역 전체 삭제
- 현재 언어(`useLanguage()`)에 따라 기본 인사말 변경

---

### 5-10. `SearchDialog.tsx` — 통합 검색 모달

검색 가능 항목 (모두 하드코딩된 정적 배열):
- **상품:** Bemot 선세럼 변형 제품
- **성분:** 나이아신아마이드, 히알루론산, 센텔라아시아티카
- **섹션:** 브랜드 스토리, 고객센터

동작 흐름:
1. 사용자 입력 → `searchableContent` 배열 클라이언트 필터링
2. 결과 목록 표시
3. 클릭 시 `document.getElementById(sectionId).scrollIntoView()` 호출
4. 모달 닫힘 + 해당 섹션으로 스크롤 이동

---

### 5-11. `TechFeatures.tsx` — 성분 기술 소개

6개 성분 카드로 구성:

| 성분 | 역할 |
|------|------|
| 나이아신아마이드 5% | 미백, 모공 개선 |
| 히알루론산 | 수분 보습 |
| 센텔라아시아티카 | 진정, 피부 재생 |
| 비타민 E | 항산화 |
| 징크옥사이드 + 이산화티타늄 | 자외선 물리적 차단 |
| 녹차 추출물 | 피부 보호막 강화 |

하단 통계 배너: 98% 만족도 / 2-4주 결과 확인 / 5만+ 고객 / 15개+ 수상

---

### 5-12. `BrandStory.tsx` — 브랜드 스토리

- **좌측:** 브랜드 이미지 + "11+ Years of Innovation" 오버레이 뱃지
- **우측:** 4단계 마일스톤 타임라인 (2015 → 2018 → 2022 → 2026)
- **하단:** 4개 핵심 가치 그리드 (글로벌 혁신 / 정밀 제형 / 검증된 결과 / 고객 최우선)

---

### 5-13. `Footer.tsx` — 푸터

- 뉴스레터 구독 섹션 (이메일 입력)
- 4열 링크 컬럼: Products / Company / Support / Legal
- SNS 링크 아이콘: Facebook, Instagram, YouTube, Twitter
- 서울 오피스 주소 + 전화번호 + 이메일
- 저작권 표시

---

### 5-14. `CouponPopup.tsx` — 신규 회원 쿠폰 팝업

- 페이지 로드 후 **1초 딜레이**로 자동 표시
- sessionStorage `klear_coupon_dismissed` 플래그로 **세션당 1회만** 노출
- 신규 회원 20% 할인 코드 `WELCOME20` 제공
- "회원가입" 버튼 클릭 → AuthModal의 signup 뷰로 바로 이동
- Motion 라이브러리로 장식 파티클 애니메이션

---

### 5-15. `ImageWithFallback.tsx` — 이미지 fallback 컴포넌트

```typescript
interface Props {
  src: string           // 우선 시도할 이미지 URL
  alt: string           // 접근성용 대체 텍스트
  fallbackSrc: string   // 로드 실패 시 대체 이미지
  className: string
}
```

외부 이미지(Unsplash 등) 로드 실패 시 `onError` 핸들러로 fallback 이미지 자동 교체.

---

### 5-16. `StarRating.tsx` — 별점 컴포넌트

- 0~5점 인터랙티브 별점 입력
- 마우스 호버 시 별 하이라이트 효과
- 입력 별점은 localStorage `klear_reviews`에 상품 ID 단위로 저장
- 평균 평점 + 총 리뷰 수 텍스트 표시

---

## 6. 전역 상태 관리 (Context API)

### 6-1. LanguageContext

**파일:** [src/app/contexts/LanguageContext.tsx](src/app/contexts/LanguageContext.tsx)

```typescript
type Language = 'ko' | 'en'

interface LanguageContextType {
  language: Language                                            // 현재 선택 언어
  setLanguage: (lang: Language) => void                        // 언어 변경 함수
  t: (key: string) => string                                   // 번역 키 → 번역 텍스트
  translateWithDeepL: (text, targetLang) => Promise<string>    // DeepL API 번역
  isDeepLReady: boolean                                        // DeepL 사용 가능 여부
}
```

내장 번역 객체 구조 (250개 이상 키):

```typescript
const translations = {
  ko: {
    'nav.home': '홈',
    'nav.products': '제품',
    'hero.cta': '지금 쇼핑하기',
    'cart.title': '장바구니',
    'tech.ai.title': '나이아신아마이드 5%',
    // 250개 이상...
  },
  en: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'hero.cta': 'Shop Now',
    'cart.title': 'Shopping Cart',
    'tech.ai.title': 'Niacinamide 5%',
    // 250개 이상...
  }
}
```

---

### 6-2. CartContext

**파일:** [src/app/contexts/CartContext.tsx](src/app/contexts/CartContext.tsx)

```typescript
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number    // 전체 수량 합산
  totalPrice: number    // 전체 금액 합산
}
```

상태 변경마다 localStorage `klear_cart`에 자동 직렬화(JSON.stringify) 저장.
초기 마운트 시 localStorage에서 역직렬화(JSON.parse) 복원.

---

### 6-3. AuthContext

**파일:** [src/app/contexts/AuthContext.tsx](src/app/contexts/AuthContext.tsx)

```typescript
interface User {
  id: number
  login_id: string
  email?: string
}

interface AuthContextType {
  user: User | null                                               // 현재 로그인 사용자
  loading: boolean                                               // 인증 처리 중 여부
  autoLogin: boolean                                             // 자동 로그인 상태
  signUp: (loginId, password, email?) => Promise<Result>         // 회원가입
  signIn: (loginId, password, rememberMe?) => Promise<Result>    // 로그인
  signOut: () => void                                            // 로그아웃
  findId: (email) => Promise<Result>                             // 아이디 찾기
  findPassword: (loginId, email) => Promise<Result>              // 비밀번호 재설정
}
```

---

## 7. 백엔드 연동 (Supabase)

**파일:** [src/lib/supabase.ts](src/lib/supabase.ts)

### 데이터베이스 스키마

```sql
CREATE TABLE IF NOT EXISTS users (
  id         BIGSERIAL PRIMARY KEY,
  login_id   TEXT UNIQUE NOT NULL,   -- 사용자 설정 아이디
  password   TEXT NOT NULL,          -- ⚠️ 현재 평문 저장 (보안 섹션 참고)
  email      TEXT,                   -- 선택 입력
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 인증 기능별 Supabase 쿼리

| 기능 | 실행 쿼리 |
|------|---------|
| 회원가입 | `INSERT INTO users (login_id, password, email) VALUES (...)` |
| 로그인 | `SELECT * FROM users WHERE login_id = ? AND password = ?` |
| 아이디 찾기 | `SELECT login_id FROM users WHERE email = ?` |
| 비밀번호 재설정 | `UPDATE users SET password = ? WHERE login_id = ? AND email = ?` |

---

## 8. 국제화 (i18n)

### 번역 시스템 구조

```
LanguageContext
│
├── 1순위: 내장 번역 객체 (250개+ 키)
│         t('nav.home') → '홈' 또는 'Home'
│
└── 2순위: DeepL API (VITE_DEEPL_API_KEY 설정 시)
          translateText(text, 'KO' | 'EN-US') → 실시간 번역
```

**DeepL API 래퍼 함수 (src/lib/deepl.ts):**

| 함수 | 역할 |
|------|------|
| `translateText(text, targetLang)` | 단일 텍스트 번역 |
| `translateBatch(texts, targetLang)` | 복수 텍스트 일괄 번역 |
| `isDeepLAvailable()` | API 키 유효성 확인 |

DeepL API 키 미설정 시 내장 번역으로 graceful fallback.

---

## 9. 스타일링 시스템

### 9-1. 브랜드 컬러 팔레트

| 역할 | 색상 코드 | 용도 |
|------|----------|------|
| Primary | `#6F832E` | 올리브 그린 — 메인 CTA 버튼 |
| Accent | `#A9C356` | 라임 그린 — 포인트 강조 |
| Secondary | `#BBD07B` | 페일 그린 — 서브 강조 |
| Background | `#FAFAF8` | 오프화이트 — 전체 페이지 배경 |
| Text Main | `#2C2C2C` | 다크 그레이 — 본문 텍스트 |
| Text Black | `#111111` | 거의 블랙 — 제목 텍스트 |
| Border | `#E6E6E0` | 연한 그레이 — 구분선, 테두리 |
| Light BG | `#EEF2E0` | 민트 크림 — 카드 배경 |

### 9-2. CSS 변수 (theme.css)

```css
:root {
  --background: #0a0620;
  --foreground: #ffffff;
  --primary: #030213;
  --accent: #e9ebef;
  --chart-1: ...; --chart-2: ...; /* recharts 전용 색상 5개 */
}
```

다크 모드: `.dark` 클래스로 전환 지원.

### 9-3. 반응형 전략 (Mobile-First)

| Tailwind 브레이크포인트 | 화면 폭 | 레이아웃 변화 |
|----------------------|--------|------------|
| (기본 mobile) | < 640px | 1열 그리드, 햄버거 메뉴, 단일 컬럼 |
| `sm:` | ≥ 640px | 여백 확장 |
| `md:` | ≥ 768px | 2열 그리드, 데스크탑 헤더 메뉴 표시 |
| `lg:` | ≥ 1024px | 3열 그리드, 대형 타이포그래피 |

```jsx
// 실제 사용 예시
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
<h1 className="text-2xl md:text-4xl lg:text-6xl">
<div className="hidden md:flex">    {/* 데스크탑 전용 메뉴 */}
<div className="md:hidden">         {/* 모바일 전용 햄버거 */}
```

### 9-4. shadcn/ui 컴포넌트 시스템

Radix UI 기반의 headless 컴포넌트 로직 위에 Tailwind 클래스로 스타일 적용.
`src/app/components/ui/utils.ts`의 `cn()` 함수로 조건부 className 병합:

```typescript
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

---

## 10. 애니메이션 시스템

**라이브러리:** Motion (Framer Motion 호환 대체재)

### 주요 애니메이션 패턴

**스크롤 트리거 입장 애니메이션:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}         // 한 번만 실행
  transition={{ duration: 0.6 }}
>
```

**버튼 호버 스케일:**
```jsx
<motion.button whileHover={{ scale: 1.05 }}>
```

**스태거(순차 등장) 리스트:**
```jsx
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ delay: i * 0.1 }}   // 0.1초 간격으로 순차 등장
  />
))}
```

**히어로 슬라이더 (방향 감지 페이지 전환):**
```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentSlide}
    custom={direction}        // -1 (이전) or 1 (다음)
    variants={slideVariants}  // enter / center / exit 상태 정의
    initial="enter"
    animate="center"
    exit="exit"
  />
</AnimatePresence>
```

---

## 11. 데이터 흐름 & 사용자 시나리오

### 시나리오 1: 회원가입 → 쿠폰 수령

```
사용자 → Navigation "로그인" 버튼 클릭
       → AuthModal 열림 (login 뷰)
       → "회원가입" 링크 클릭 (signup 뷰로 전환)
       → 아이디 / 비밀번호 / 이메일 입력 후 제출
       → useAuth().signUp() 호출
       → Supabase: INSERT INTO users
       → 성공 → signupSuccess 뷰 전환
       → "WELCOME20" 쿠폰 코드 화면에 표시
```

### 시나리오 2: 상품 탐색 → 장바구니 → 결제

```
사용자 → ProductShowcase 상품 카드 확인
       → "장바구니 추가" 클릭
       → useCart().addToCart(product) 호출
       → localStorage klear_cart 자동 업데이트
       → Navigation 장바구니 배지 카운트 +1
       → 장바구니 아이콘 클릭 → Cart 사이드바 슬라이드인
       → 수량 +/- 조절 또는 삭제 버튼
       → "결제하기" 클릭 → pageView = 'checkout'
       → CheckoutPage 렌더링
       → 결제 수단 선택 + 카드 정보 입력
       → "결제 완료" 클릭 → 2초 로딩 시뮬레이션
       → 성공 화면 + 주문번호 + clearCart() 호출
```

### 시나리오 3: 언어 전환

```
사용자 → Navigation 지구본 아이콘 클릭
       → setLanguage('en') 또는 setLanguage('ko') 호출
       → LanguageContext language 상태 업데이트
       → 모든 구독 컴포넌트 즉시 re-render
       → t('nav.home') → 'Home' 또는 '홈'으로 전환
       (페이지 새로고침 없음)
```

### 시나리오 4: 검색

```
사용자 → 검색 아이콘 클릭 → SearchDialog 열림
       → 검색어 입력 (예: "나이아신아마이드")
       → searchableContent 정적 배열 실시간 필터링
       → 매칭 결과 목록 표시
       → 결과 항목 클릭 → scrollIntoView() 호출
       → 다이얼로그 닫힘 + 해당 섹션으로 부드러운 스크롤
```

### 시나리오 5: 챗봇 사용

```
사용자 → 우하단 채팅 버튼 클릭 → 챗봇 패널 열림
       → 빠른 답장 버튼 클릭 또는 직접 질문 입력
       → 입력 텍스트 키워드 매칭
       → 매칭된 FAQ 응답 자동 표시
       → 더 이상 필요 없으면 🔄 버튼 → 대화 초기화
```

---

## 12. 환경 변수 & 배포

### 환경 변수 설정 (.env)

```env
# Supabase 연결 (필수)
VITE_SUPABASE_URL=https://yxmabhogqpxndrfpnofg.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_NPmRDVDgv2Ct4i9TnYbRmA_sSVoMPDI

# DeepL 번역 API (선택 — 없으면 내장 번역 사용)
VITE_DEEPL_API_KEY=your-deepl-api-key-here
```

> `VITE_` 접두사 필수 — Vite가 클라이언트 번들에 포함시키는 조건

### Netlify 배포 설정 (netlify.toml)

```toml
[build]
  command = "pnpm build"       # 빌드 명령어
  publish = "dist"             # 배포할 폴더
  environment = { NODE_VERSION = "18" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200                 # SPA 라우팅: 새로고침 404 방지

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"  # 정적 자산 1년 캐시
```

### 배포 흐름

```
git push → Netlify 변경 감지 → pnpm build 실행
        → dist/ 폴더 생성 → CDN 배포
        → 모든 경로 → index.html (SPA 라우팅 보장)
```

---

## 13. 보안 분석

### 현재 확인된 보안 취약점

| 취약점 | 위험도 | 상세 설명 |
|--------|--------|---------|
| **평문 비밀번호 저장** | 위험 | `users.password` 컬럼에 해시 없이 저장 |
| **이메일 미인증** | 중간 | 회원가입 시 이메일 소유권 확인 없음 |
| **Rate Limiting 없음** | 중간 | 인증 엔드포인트 브루트포스 공격 취약 |
| **localStorage 민감 정보** | 중간 | XSS 발생 시 사용자 정보 노출 가능 |
| **CSRF 보호 없음** | 중간 | 결제 페이지에 CSRF 토큰 없음 |
| **Supabase RLS 비활성화** | 중간 | 행 수준 보안 정책 미설정 |

### 보안 개선 권장 사항

```
1. 비밀번호 해싱
   → Supabase Edge Function에서 bcrypt/argon2로 해싱 후 저장

2. 이메일 인증
   → Supabase Auth 내장 signUp() 사용 (자동 인증 이메일 발송)

3. Rate Limiting
   → Supabase 대시보드 Auth Rate Limits 설정

4. 인증 토큰 보안
   → localStorage 대신 HTTP-only 쿠키 사용

5. Row Level Security 활성화
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "users_own_data" ON users
     USING (auth.uid()::text = id::text);
```

---

## 14. 개발 환경 설정

### 필수 조건

- Node.js 18.0 이상
- pnpm 8.0 이상 (권장) 또는 npm

### 빠른 시작 (3단계)

```bash
# 1. 의존성 설치
pnpm install

# 2. 환경 변수 설정
cp .env.example .env
# .env 파일 열어서 Supabase URL과 Key 입력

# 3. 개발 서버 실행
pnpm dev
# → http://localhost:5173 으로 접속
```

### 전체 명령어

```bash
pnpm dev        # 개발 서버 (HMR 포함, localhost:5173)
pnpm build      # 프로덕션 빌드 → dist/ 폴더 생성
pnpm preview    # 빌드 결과 로컬 미리보기
```

### Supabase 초기 테이블 생성 SQL

```sql
CREATE TABLE IF NOT EXISTS users (
  id         BIGSERIAL PRIMARY KEY,
  login_id   TEXT UNIQUE NOT NULL,
  password   TEXT NOT NULL,
  email      TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 포트 변경 (선택)

[vite.config.ts](vite.config.ts) 수정:

```typescript
export default defineConfig({
  server: {
    port: 3000   // 원하는 포트 번호
  }
})
```

### 문제 해결

```bash
# pnpm 명령어 없음
npm install -g pnpm

# 의존성 충돌 또는 이상 동작
rm -rf node_modules
pnpm install

# Supabase 연결 오류 확인 순서
# 1. .env 파일 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 값 확인
# 2. Supabase 대시보드에서 프로젝트 활성 상태 확인
# 3. users 테이블 생성 여부 확인
```

---

## 15. 한계점 & 향후 확장 방향

### 현재 한계 (데모·포트폴리오 수준)

| 기능 | 현재 상태 | 실서비스를 위한 개선 방향 |
|------|---------|----------------------|
| 상품 데이터 | 컴포넌트 내 하드코딩 3개 | Supabase 상품 테이블 연동 + 관리자 등록 |
| 주문 내역 | 샘플 더미 데이터 | 주문 DB 테이블 생성 + 실시간 조회 |
| 결제 처리 | 2초 딜레이 시뮬레이션 | Stripe / 토스페이먼츠 실제 PG 연동 |
| 검색 | 정적 키워드 필터 | Supabase Full-Text Search 또는 Algolia |
| 챗봇 | FAQ 키워드 매칭 | OpenAI API / Claude API 연동 |
| 이미지 최적화 | Unsplash 외부 URL 의존 | Cloudinary 또는 Supabase Storage |
| 테스트 | 없음 | Vitest + React Testing Library + Playwright |
| 분석/추적 | 없음 | Google Analytics 4 / Mixpanel |
| SEO | 기본 meta 태그만 | JSON-LD 구조화 데이터 + OG 태그 |
| 비밀번호 보안 | 평문 저장 | bcrypt 해싱 + Supabase Auth 전환 |

### 스케일업 권장 아키텍처

```
현재 스택:
  React SPA + Vite + Supabase

확장 시 추천:
  Next.js 15 (App Router)
  ├── SSR/SSG로 SEO 최적화
  ├── 서버 컴포넌트로 초기 로딩 성능 향상
  ├── Supabase (계속 사용 가능)
  ├── Stripe 실제 결제 처리
  └── Vercel Edge Functions으로 배포 최적화
```

### 추가 기능 로드맵

```
Phase 1 (필수 실서비스 기능):
├── 비밀번호 bcrypt 해싱
├── 이메일 인증 플로우
├── Stripe 결제 연동
└── 주문 DB 연동

Phase 2 (사용자 경험 향상):
├── 상품 필터링 & 정렬
├── 찜하기(위시리스트)
├── 상품 리뷰 서버 저장
└── 추천 상품 알고리즘

Phase 3 (운영 인프라):
├── 관리자 대시보드
├── 재고 관리 시스템
├── 이메일 주문 확인 (Resend API)
└── 실시간 분석 (Google Analytics 4)
```

---

## 개발 팁

- 컴포넌트 수정 시 Vite HMR(Hot Module Replacement)로 즉시 반영됨
- Tailwind IntelliSense VSCode 확장 설치 권장
- 번역 텍스트 추가: [src/app/contexts/LanguageContext.tsx](src/app/contexts/LanguageContext.tsx)의 `translations` 객체 수정
- 장바구니 상태: `useCart()` 훅으로 접근
- 인증 상태: `useAuth()` 훅으로 접근
- 언어/번역: `useLanguage()` 훅의 `t()` 함수로 접근

---

## 크레딧

- **디자인 출처:** Figma 디자인 시스템 기반 (`@figma/my-make-file`)
- **외부 이미지:** Unsplash (무료 라이선스)
- **브랜드 자산:** `/public/klear-logo.png`, `/public/blackpink-special-edition.png`
- **외부 서비스:** Supabase, DeepL API, Netlify

---

## 라이선스

© 2026 APR Beauty / Klear. All rights reserved.

---

*작성일: 2026-02-27 | 프로젝트 버전: 0.0.1*
