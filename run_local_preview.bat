@echo off
cd /d "%~dp0"
start "" http://127.0.0.1:4280
python -m http.server 4280
