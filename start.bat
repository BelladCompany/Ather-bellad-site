@echo off
title Roadster 3D Animated Site Server
cd /d "%~dp0"
echo ========================================================
echo   Starting Roadster 3D Web Experience on Port 3000...
echo ========================================================
start "" http://localhost:3000
python -m http.server 3000
pause

