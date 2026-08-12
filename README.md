# Portfolio site

김수영의 공개 포트폴리오 정적 웹사이트입니다. index.html, styles.css, script.js, assets/, experience/, projects/만으로 동작하며 React나 번들러를 사용하지 않습니다.

## Local preview

    cd C:\DeVelop\Career_Management\_deploy_portfolio
    python -m http.server 4280

브라우저에서 http://127.0.0.1:4280 을 엽니다.

## Structure

- index.html: Profile(캐릭터 초상과 소개), Experience, Projects(선형 기록 목록), Profile 내 GitHub·email
- styles.css: light editorial design tokens, responsive layout, accessibility states, divider-led record lists
- script.js: mobile menu and current section highlighting
- experience/: 회사별 실무 경험 상세 페이지와 공개용 시스템 개념도
- projects/: MOBASE AUTOSAR 코드 생성 툴, MOBASE SiL 검증 환경, MOBASE CI 리포트 대시보드, K Stock, USED PICK, Virtual MCU, Jira Opsidian, Train Gallery, Questora, Codex Team, Auto Trading
- 각 프로젝트 상세 페이지는 프로젝트별 제목을 유지하면서 `Overview` → `Problem` → `Approach` → `Screen evidence` 순서로 구성합니다.
- assets/: 실제 프로젝트 화면 캡처

외부 원본 프로젝트 사이트는 이 저장소에서 수정하지 않습니다.

- Virtual MCU: https://virtual-mcu-training-env.pages.dev/
- K Stock: https://kstockclock.com/
- USED PICK: https://www.used-pick.com/
- GitHub: https://github.com/tndud2505-ops
