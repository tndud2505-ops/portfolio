# portfolio_site 안내

## 이 폴더의 역할

이 폴더는 김수영 포트폴리오의 정적 웹사이트 초안입니다.

포함 파일:

- `index.html`
- `styles.css`
- `assets/`
- `site_preview.png`

## 바로 확인하는 방법

### 방법 1. 실행 스크립트 사용

같은 폴더의 `run_local_preview.bat` 실행

### 방법 2. 직접 실행

PowerShell에서:

```powershell
cd C:\DeVelop\이력관리\final_portfolio_package\portfolio_site
python -m http.server 4280
```

브라우저에서:

```text
http://127.0.0.1:4280
```

## 업로드 용도

이 사이트는 정적 파일 기반이라 아래 서비스에 바로 업로드할 수 있습니다.

- GitHub Pages
- Netlify
- Vercel 정적 배포
- Cloudflare Pages

## 현재 구성 의도

- 히어로에서 직무 정체성을 즉시 이해
- 실무 프로젝트는 설명 도해 + 성과 중심
- 현재/개인 프로젝트는 실제 캡처 중심
- 채널별 전략과 DOCX 원본으로 연결

## 추후 확장 방향

- 프로젝트 상세 페이지 분리
- 영문 페이지 추가
- 블로그 글과 상호 링크
- 연락처/링크드인/깃허브 연결
