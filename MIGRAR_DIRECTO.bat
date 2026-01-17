@echo off
color 0B
:: ESTA LINEA ES LA MAGICA QUE ARREGLA EL ERROR
cd /d "%~dp0"

echo ===========================================
echo       INTENTO MANUAL - DIRECTO (V2)
echo ===========================================
echo.
echo He corregido el script para que encuentre la carpeta SI o SI.
echo Usando el archivo .env que ya cree.
echo.

if not exist "prisma\schema.prisma" (
    color 0C
    echo ERROR: Sigo sin ver la carpeta 'prisma'.
    echo Verificando donde estoy parado:
    echo %cd%
    pause
    exit /b
)

call npx prisma generate
call npx prisma db push

echo.
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Revisa si la contrasena es correcta.
    pause
    exit /b
)

color 0A
echo ===========================================
echo    EXITO! BASE DE DATOS LISTA 🚀
echo ===========================================
pause
