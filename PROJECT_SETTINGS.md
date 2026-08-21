# Project settings

이 저장소는 다른 PC에서 그대로 clone해 작업할 수 있는 정적 웹사이트입니다.

## Runtime

| 항목 | 값 |
|---|---|
| 프로젝트 유형 | Static HTML/CSS/JavaScript |
| 필수 런타임 | Python 3.x |
| 패키지 설치 | 없음 |
| 환경변수 | 없음 |
| 기본 로컬 포트 | `5180` |
| 바인딩 주소 | `127.0.0.1` |
| 배포 방식 | GitHub Actions → GitHub Pages |

## 작업 시작

```bash
git clone https://github.com/tndud2505-ops/Career_Profile.git
cd Career_Profile
python -m http.server 5180 --bind 127.0.0.1
```

그 다음 <http://127.0.0.1:5180>을 엽니다.

- Windows: `run_local_preview.bat`
- macOS/Linux: `chmod +x run_local_preview.sh && ./run_local_preview.sh`

## 수정 위치

- 프로필·경력·프로젝트 공개 데이터: `data/career-public.json`
- 메인 화면 구조: `index.html`
- 공통 디자인: `styles.css`
- 메뉴·현재 섹션 표시: `script.js`
- 회사별 실무 페이지: `experience/`
- 개인 프로젝트 페이지: `projects/`
- 이미지·도식·화면 캡처: `assets/`

페이지를 추가할 때는 HTML 파일을 `experience/` 또는 `projects/`에 넣고, 필요한 이미지는 `assets/` 아래에 둔 뒤 링크 경로를 확인합니다.

## 공개·보안 규칙

- 이 저장소는 GitHub 공개 저장소입니다.
- 비밀번호, API 키, 주민등록번호, 계좌번호, `.env`, 회사 내부 원문 문서는 커밋하지 않습니다.
- `data/career-public.json`에는 공개 가능한 프로필·경력·프로젝트 설명만 둡니다.
- 회사 프로젝트는 공개 가능한 범위에서 익명화한 설명과 도식만 사용합니다.

## GitHub Pages 배포

`main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`이 실행됩니다. 배포가 실패하면 GitHub 저장소의 Actions 탭에서 `Deploy Portfolio to GitHub Pages` 실행 로그를 확인합니다.

## 용량 점검

현재 저장소는 정적 HTML/CSS/JavaScript와 이미지 중심이며 1GB 미만입니다. 큰 동영상·빌드 캐시·가상환경은 저장소에 넣지 않습니다.
