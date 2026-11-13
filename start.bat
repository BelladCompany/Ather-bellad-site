@echo off
title Roadster 3D Animated Site Server
cd /d "%~dp0"
echo ========================================================
echo   Starting Roadster 3D Web Experience on Port 3001...
echo ========================================================
start "" http://localhost:3001
node server.js
pause

