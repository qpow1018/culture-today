# 오늘의 문화

영화·책·전시·공연·음악을 다루는 온라인 문화 매체 퍼블리싱 프로젝트입니다.
HTML·CSS·순수 JavaScript로 화면과 동작을 구현하고, Liquid 템플릿으로 기사 데이터와 공통 영역을 출력합니다.

[사이트 보기](https://culture-today.vercel.app/)

## 주요 구현

- 메인: 주요 기사 슬라이드, 카테고리별 추천 기사 탭, 최신 기사
- 카테고리 목록: 최신순 기사 목록과 페이지네이션
- 기사 상세: 본문, 관련 기사, 샘플 조회수 기반 인기 기사
- 공통 영역: PC·모바일 헤더, 모바일 메뉴, 푸터
- 기술 SEO: 페이지별 제목·설명, Open Graph, canonical, Article JSON-LD, robots.txt, sitemap.xml

PC·모바일 HTML을 별도로 생성하고, 요청의 User-Agent에 따라 같은 URL에서 해당 화면을 제공합니다.
화면 너비 변경만으로 PC·모바일 화면이 전환되지는 않습니다.

순수 CSS를 사용하며, `reset.css`와 `base.css`에는 공통 기본값을 둡니다.
페이지·영역 스타일은 해당 Liquid 템플릿의 `<style>`에 작성하고 영역 클래스로 적용 범위를 나눕니다.

## 기술과 데이터

- LiquidJS: 기사·설정 데이터를 이용한 정적 HTML 생성
- Markdown: 기사 기본 정보와 본문 관리 (`@11ty/gray-matter`, `markdown-it`)
- Vite: 로컬 개발 미리보기와 파일 변경 감지
- Vercel: 정적 파일 배포와 기기별 URL rewrite

카테고리별 15개씩 총 75개의 창작 샘플 기사를 사용합니다.
실제 취재·행사 정보가 아니며, 이미지도 AI로 생성했습니다. 인기 기사 조회수는 준비된 샘플 데이터입니다.
별도 CMS·관리자 화면과 GA4·GTM·광고 연동은 포함하지 않았습니다.

## 실행과 배포

Node.js 20.14.0, npm 10.7.0에서 확인했습니다.

```sh
npm ci
npm run dev
```

`http://localhost:3000`에서 확인합니다. 모바일 화면은 개발자 도구에서 모바일 기기 에뮬레이션을 선택한 뒤 새로고침합니다.
빌드 코드나 `vercel.json` 변경 시에는 개발 서버를 재시작합니다.

```sh
npm run build
```

빌드 결과는 `dist/`에 생성됩니다. Vercel의 빌드 명령과 출력 폴더는 `vercel.json`에 설정되어 있습니다.
운영 주소·사이트 설명·기본 공유 이미지는 `src/data/site.json`에서 관리합니다.
Preview 빌드에는 `noindex`를 적용하며, 검색봇이 이를 읽을 수 있도록 크롤링을 허용합니다.

## 프로젝트 구조

```text
src/
├── content/articles/  # 기사별 Markdown
├── data/              # 사이트·카테고리·기사 노출 설정
├── templates/
│   ├── pc/            # PC 레이아웃·메인·목록·상세
│   ├── mobile/        # 모바일 레이아웃·메인·목록·상세
│   └── partials/      # 헤더·푸터·메인 기사 영역·SEO
└── assets/            # CSS·JavaScript·이미지·폰트
scripts/               # 빌드·개발 서버
docs/                  # 이미지 원본
dist/                  # 빌드 결과 (Git 제외)
```

글꼴은 [Pretendard](https://github.com/orioncactus/pretendard/tree/v1.3.9)를 사용하며, SIL Open Font License 1.1을 폰트 파일과 함께 보관합니다.
