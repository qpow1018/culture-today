# culture-today

영화·책·전시·공연·음악을 다루는 문화 매체 **오늘의 문화**의 퍼블리싱 프로젝트입니다.

## 프로젝트 구조

```text
src/
├── content/articles/  # 기사별 Markdown 파일
├── data/              # 사이트·카테고리·메뉴 설정
├── templates/
│   ├── pages/         # 메인·목록·상세 템플릿
│   ├── layouts/       # 공통 HTML 뼈대
│   └── partials/      # 재사용하는 템플릿 조각
└── assets/
    ├── styles/        # 스타일
    ├── scripts/       # 브라우저 JavaScript
    └── images/        # 이미지
scripts/               # Node.js 빌드·샘플 기사 생성 코드
docs/                  # 구현 결정·QA 기록
dist/                  # 빌드 결과 (Git 제외)
```

기사와 설정을 LiquidJS에 전달해 정적 HTML을 생성하는 방식으로 진행합니다.
현재는 테스트 기사 1개로 메인·카테고리 목록·기사 상세 이동을 확인할 수 있습니다.
화면 스타일은 흐름 확인용이며 최종 매체 디자인은 아직 구현하지 않았습니다.

빈 폴더의 `.gitkeep` 파일은 Git에 폴더 구조를 기록하기 위한 자리 표시자입니다.

## 스타일 기반

순수 CSS를 사용합니다. 페이지에서는 `reset.css` 다음에 `base.css`를 연결합니다.
공통 레이아웃에 두 파일을 연결했습니다.

기본 글꼴은 Pretendard Variable v1.3.9입니다. 공식 폰트를
`src/assets/fonts/pretendard/`에 저장해 사용하며 SIL Open Font License 1.1을 함께 보관합니다.
`font-display: swap`으로 다운로드 중에는 시스템 글꼴을 표시합니다.
전체 글꼴 파일로 시작하며, 페이지 구성 후 용량과 로딩을 확인해 서브셋 적용 여부를 검토합니다.

출처: https://github.com/orioncactus/pretendard/tree/v1.3.9

## 실행

메인 `/` → 영화 목록 `/category/movie/` → 상세 `/articles/test-film/` 순서로
이동할 수 있습니다. 나머지 카테고리는 같은 목록 템플릿으로 빈 목록을 표시합니다.

`src/content/articles/test-film.md`의 기본 정보는 `@11ty/gray-matter`로 읽고,
본문은 `markdown-it`으로 HTML로 변환합니다. 두 도구 모두 빌드에서만 실행합니다.
본문의 직접 작성한 HTML은 해석하지 않습니다.
필수 항목·카테고리·발행일·slug 형식과 중복·이미지 항목 오류는 빌드를 중단합니다.
이미지 항목을 생략하면 템플릿에 전달할 때 `null`로 정리합니다.

Node.js v20.14.0과 npm 10.7.0에서 확인했습니다.

```sh
npm ci
npm run dev
```

`http://localhost:3000`에서 확인합니다. `src` 파일을 추가·수정·삭제하면
다시 빌드하고 브라우저를 새로고침합니다. 빌드 코드 변경 시 개발 서버를 재시작합니다.
템플릿 변수·필터 오류는 터미널에 표시하며, 수정 후 저장하면 다시 빌드합니다.

```sh
npm run build
```

빌드할 때 `dist`를 비우고 HTML과 정적 자산을 생성합니다.
LiquidJS는 Node.js에서만 실행하고, Vite는 개발 미리보기·파일 감지·새로고침에만 사용합니다.
운영 빌드는 기존 LiquidJS 스크립트가 담당합니다. 배포 파일에는 Vite 개발 클라이언트가 포함되지 않습니다.

BrowserSync의 간접 의존성에서 보고된 보안 이슈 때문에 미리보기 도구를 Vite로 교체했습니다.
교체 후 npm audit 결과는 0건입니다. 이 결과는 운영 사이트 전체의 취약성 검증을 의미하지 않습니다.

