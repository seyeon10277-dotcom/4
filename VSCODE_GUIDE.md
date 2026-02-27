# VSCode에서 프로젝트 실행하기 🚀

이 가이드는 VSCode에서 APR Beauty 프로젝트를 다운로드하고 실행하는 방법을 설명합니다.

## 📥 다운로드 방법

### 방법 1: ZIP 파일로 다운로드

1. Figma Make에서 **"Download"** 버튼을 클릭합니다
2. 다운로드된 ZIP 파일의 압축을 풉니다
3. 압축 해제된 폴더를 원하는 위치로 이동합니다

### 방법 2: Git Clone (추천)

Git이 설치되어 있다면:

```bash
git clone [저장소 URL]
cd apr-beauty
```

## 🛠️ 설치 및 실행

### 1. VSCode에서 프로젝트 열기

```bash
# 터미널에서
cd [프로젝트 폴더 경로]
code .
```

또는 VSCode에서 **File → Open Folder**를 선택하여 프로젝트 폴더를 엽니다.

### 2. 필수 소프트웨어 설치 확인

#### Node.js 설치 확인
```bash
node --version
# v18.0.0 이상이어야 합니다
```

Node.js가 없다면 [nodejs.org](https://nodejs.org/)에서 다운로드하세요.

#### pnpm 설치 (권장)
```bash
npm install -g pnpm
```

### 3. 의존성 패키지 설치

VSCode 터미널에서 실행:

```bash
# pnpm 사용 (권장)
pnpm install

# 또는 npm 사용
npm install
```

설치 시간: 약 2-3분

### 4. 개발 서버 실행

```bash
# pnpm 사용
pnpm dev

# 또는 npm 사용
npm run dev
```

성공하면 다음과 같은 메시지가 나타납니다:
```
  VITE v6.3.5  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 5. 브라우저에서 확인

브라우저에서 `http://localhost:5173` 으로 접속하세요!

## 🎨 개발 팁

### 핫 리로드 (Hot Reload)

파일을 저장하면 자동으로 브라우저에 반영됩니다. 새로고침 필요 없음!

### 언어 전환 테스트

우측 상단의 🌐 아이콘을 클릭하여 한국어/English 전환을 테스트하세요.

### 반응형 테스트

브라우저의 개발자 도구 (F12)에서 Device Toolbar를 사용하여 모바일/태블릿 뷰를 확인하세요.

## 📦 프로덕션 빌드

배포를 위한 최적화된 빌드:

```bash
# 빌드 실행
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 🐛 문제 해결

### "pnpm: command not found"

```bash
npm install -g pnpm
```

### 포트 5173이 이미 사용 중

`vite.config.ts` 파일에서 포트 변경:

```typescript
export default defineConfig({
  server: {
    port: 3000 // 원하는 포트 번호
  },
  // ... 나머지 설정
})
```

### 패키지 설치 오류

```bash
# node_modules와 lock 파일 삭제
rm -rf node_modules pnpm-lock.yaml

# 재설치
pnpm install
```

### TypeScript 오류

VSCode에서 TypeScript 버전 확인:
1. Cmd/Ctrl + Shift + P
2. "TypeScript: Select TypeScript Version" 검색
3. "Use Workspace Version" 선택

### Tailwind CSS IntelliSense가 작동하지 않음

VSCode 익스텐션 설치:
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

## 📁 프로젝트 구조

```
apr-beauty/
├── index.html                 # 메인 HTML 파일
├── package.json               # 의존성 관리
├── vite.config.ts            # Vite 설정
├── README.md                 # 프로젝트 설명
├── VSCODE_GUIDE.md           # 이 파일
├── .gitignore                # Git 무시 파일
├── .vscode/
│   └── extensions.json       # 추천 VSCode 익스텐션
└── src/
    ├── main.tsx              # 앱 엔트리 포인트
    ├── app/
    │   ├── App.tsx           # 메인 컴포넌트
    │   ├── components/       # React 컴포넌트
    │   │   ├── Navigation.tsx
    │   │   ├── Hero.tsx
    │   │   ├── ProductShowcase.tsx
    │   │   ├── TechFeatures.tsx
    │   │   ├── BrandStory.tsx
    │   │   └── Footer.tsx
    │   └── contexts/
    │       └── LanguageContext.tsx  # 다국어 지원
    └── styles/
        ├── index.css         # 글로벌 스타일
        ├── theme.css         # 테마 설정
        └── tailwind.css      # Tailwind 설정
```

## 🎯 다음 단계

### 1. 컴포넌트 수정

`src/app/components/` 폴더의 컴포넌트들을 수정하여 사이트를 커스터마이징하세요.

### 2. 번역 추가/수정

`src/app/contexts/LanguageContext.tsx`에서 번역을 수정하세요.

### 3. 스타일 조정

`src/styles/theme.css`에서 색상과 테마를 조정하세요.

### 4. 배포

`README.md`의 배포 섹션을 참고하여 Netlify에 배포하세요.

## 💡 VSCode 추천 익스텐션

프로젝트를 열면 자동으로 추천 익스텐션 설치를 제안합니다:

- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅
- **Tailwind CSS IntelliSense**: Tailwind 자동완성
- **ES7+ React/Redux/React-Native snippets**: React 코드 스니펫
- **Path Intellisense**: 파일 경로 자동완성

## 🔧 유용한 VSCode 단축키

- **Ctrl/Cmd + P**: 파일 빠르게 열기
- **Ctrl/Cmd + Shift + P**: 명령 팔레트
- **Ctrl/Cmd + `**: 터미널 열기/닫기
- **Alt + 위/아래 화살표**: 줄 이동
- **Ctrl/Cmd + D**: 같은 단어 선택
- **Ctrl/Cmd + /**: 주석 토글

## 📞 도움이 필요하신가요?

문제가 해결되지 않으면:

1. `node_modules` 삭제 후 재설치
2. VSCode 재시작
3. 컴퓨터 재부팅

그래도 안 되면 README.md의 연락처로 문의하세요!

---

**Happy Coding! 🎉**
