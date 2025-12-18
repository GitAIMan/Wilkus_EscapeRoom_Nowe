@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   ElevenLabs Escape Room - Start
echo ========================================
echo.

cd /d "%~dp0"

if not exist node_modules (
    echo Instalowanie zależności...
    call npm install
    echo.
)

echo Uruchamiam serwer na porcie 4444...
echo.
start http://localhost:4444
set PORT=4444
npm start
pause
