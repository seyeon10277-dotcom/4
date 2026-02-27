# 📦 다운로드 체크리스트

다운로드한 프로젝트가 완전한지 확인하세요!

## ✅ 필수 파일 체크리스트

### 루트 파일
- [ ] `index.html` - 메인 HTML 파일
- [ ] `package.json` - 의존성 관리
- [ ] `vite.config.ts` - Vite 설정
- [ ] `postcss.config.mjs` - PostCSS 설정
- [ ] `README.md` - 프로젝트 설명서
- [ ] `VSCODE_GUIDE.md` - VSCode 실행 가이드
- [ ] `DOWNLOAD_CHECKLIST.md` - 이 파일
- [ ] `netlify.toml` - Netlify 배포 설정
- [ ] `.gitignore` - Git 무시 파일

### 소스 파일 (`/src`)

#### 메인
- [ ] `src/main.tsx` - 앱 엔트리 포인트
- [ ] `src/app/App.tsx` - 메인 앱 컴포넌트

#### 컴포넌트 (`/src/app/components`)
- [ ] `src/app/components/Navigation.tsx` - 네비게이션 바
- [ ] `src/app/components/Hero.tsx` - 히어로 섹션
- [ ] `src/app/components/ProductShowcase.tsx` - 제품 소개
- [ ] `src/app/components/TechFeatures.tsx` - 기술 특징
- [ ] `src/app/components/BrandStory.tsx` - 브랜드 스토리
- [ ] `src/app/components/Footer.tsx` - 푸터

#### Figma 컴포넌트
- [ ] `src/app/components/figma/ImageWithFallback.tsx` - 이미지 컴포넌트

#### 컨텍스트
- [ ] `src/app/contexts/LanguageContext.tsx` - 다국어 지원

#### 스타일 (`/src/styles`)
- [ ] `src/styles/index.css` - 글로벌 스타일
- [ ] `src/styles/theme.css` - 테마 설정
- [ ] `src/styles/tailwind.css` - Tailwind 설정
- [ ] `src/styles/fonts.css` - 폰트 설정

### VSCode 설정
- [ ] `.vscode/extensions.json` - 추천 익스텐션

## 📊 파일 통계

- **총 파일 수**: 약 60개
- **주요 컴포넌트**: 7개
- **다국어 지원**: 한국어, English
- **UI 컴포넌트 라이브러리**: 30+ 개 포함

## 🔍 파일 누락 시 확인사항

### 1. 전체 폴더 다운로드 확인
ZIP 파일 압축 해제 시 모든 폴더가 포함되어 있는지 확인하세요.

### 2. 숨김 파일 확인
- `.gitignore`
- `.vscode/` 폴더

Mac/Linux에서 숨김 파일 보기:
```bash
ls -la
```

Windows 탐색기: "보기" → "숨김 파일" 체크

### 3. node_modules 폴더
이 폴더는 포함되지 않습니다. `pnpm install` 실행 시 자동 생성됩니다.

## 🚀 다음 단계

모든 파일이 있다면:

1. **VSCODE_GUIDE.md** 파일을 열어 설치 및 실행 방법을 확인하세요
2. VSCode에서 프로젝트 폴더를 엽니다
3. `pnpm install` 실행
4. `pnpm dev` 실행
5. 브라우저에서 확인!

## 💾 백업 권장사항

프로젝트 수정 전에 백업을 권장합니다:

```bash
# 프로젝트 폴더를 압축
zip -r apr-beauty-backup.zip apr-beauty/
```

## 📋 버전 정보

- **프로젝트 버전**: 0.0.1
- **React 버전**: 18.3.1
- **Vite 버전**: 6.3.5
- **Tailwind CSS 버전**: 4.1.12
- **TypeScript**: 최신 버전

## ⚠️ 중요 참고사항

### 수정하면 안 되는 파일
- `pnpm-lock.yaml` (있다면)
- `node_modules/` 내부 파일
- `.vite/` 캐시 파일

### 자유롭게 수정 가능한 파일
- 모든 컴포넌트 파일 (`.tsx`)
- 스타일 파일 (`.css`)
- 번역 파일 (`LanguageContext.tsx`)
- 설정 파일 (`vite.config.ts`, `netlify.toml`)

## 🎯 빠른 시작 명령어

프로젝트 폴더에서:

```bash
# 1. 의존성 설치
pnpm install

# 2. 개발 서버 실행
pnpm dev

# 3. 프로덕션 빌드
pnpm build

# 4. 빌드 미리보기
pnpm preview
```

## 📞 문제 해결

파일이 누락되었거나 문제가 있다면:

1. 다시 다운로드 시도
2. ZIP 파일 압축 해제 프로그램 확인
3. README.md의 연락처로 문의

---

**모든 파일이 준비되었다면 VSCODE_GUIDE.md를 확인하세요! 🚀**
