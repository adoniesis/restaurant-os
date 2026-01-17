@echo off
color 0B
echo ===========================================
echo   INSTALANDO SEGURIDAD (BCRYPT)
echo ===========================================
echo.
echo Vamos a descargar la herramienta para proteger las contrasenas.
echo.

call npm install bcryptjs @types/bcryptjs

echo.
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: No se pudo instalar.
    pause
    exit /b
)

color 0A
echo ===========================================
echo    INSTALACION CORRECTA
echo ===========================================
pause
