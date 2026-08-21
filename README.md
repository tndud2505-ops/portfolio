# Portfolio site

김수영의 공개 포트폴리오 정적 웹사이트입니다. 별도 빌드 도구나 비밀 환경변수 없이 `index.html`, `styles.css`, `script.js`, `data/`, `assets/`, `experience/`, `projects/`만으로 동작합니다.

## 다른 PC에서 바로 시작하기

사전 조건은 Python 3.x 하나입니다. Node.js, npm, React 설치는 필요하지 않습니다.

```bash
git clone https://github.com/tndud2505-ops/Career_Profile.git
cd Career_Profile
python -m http.server 5180 --bind 127.0.0.1
```

브라우저에서 <http://127.0.0.1:5180>을 엽니다.

Windows에서는 `run_local_preview.bat`를 더블클릭해도 됩니다. macOS/Linux에서는 `./run_local_preview.sh`를 실행하세요.

새 PC용 파일 구조와 설정값은 [PROJECT_SETTINGS.md](PROJECT_SETTINGS.md)에 정리했습니다.

## GitHub Pages

`main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`이 정적 파일을 GitHub Pages로 배포합니다.

- 공개 사이트: <https://tndud2505-ops.github.io/Career_Profile/>
- 저장소: <https://github.com/tndud2505-ops/Career_Profile>
- Pages 설정: Repository Settings → Pages → Source를 `GitHub Actions`로 선택

이 저장소에는 개인 비밀번호, API 키, 계좌 정보, `.env` 파일을 넣지 않습니다. 공개 데이터는 `data/career-public.json`에서 관리합니다.

## Local preview

```powershell
python -m http.server 5180 --bind 127.0.0.1
```

서버를 종료하려면 실행 중인 터미널에서 `Ctrl+C`를 누릅니다.

## Structure

- index.html: Profile(캐릭터 초상과 소개), Experience, Projects(선형 기록 목록), Profile 내 GitHub·email
- styles.css: light editorial design tokens, responsive layout, accessibility states, divider-led record lists
- script.js: mobile menu and current section highlighting
- data/career-public.json: 사이트에 노출하는 공개 프로필·경력·프로젝트 데이터
- experience/: 회사별 실무 경험 상세 페이지와 공개용 시스템 개념도
- projects/: MOBASE AUTOSAR 코드 생성 툴, MOBASE SiL 검증 환경, MOBASE CI 리포트 대시보드, K Stock, USED PICK, Virtual MCU, Jira Opsidian, Train Gallery, Questora, Codex Team, Auto Trading
- 각 프로젝트 상세 페이지는 프로젝트별 제목을 유지하면서 `Overview` → `Problem` → `Approach` → `Screen evidence` 순서로 구성합니다.
- assets/: 실제 프로젝트 화면 캡처
