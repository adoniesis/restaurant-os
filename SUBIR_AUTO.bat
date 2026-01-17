@echo off
color 0B
:: FORZAR EJECUCION DESDE LA CARPETA DEL PROYECTO
cd /d "%~dp0"

set GIT_PATH="C:\Program Files\Git\cmd\git.exe"

echo ===================================================
echo   SUBIDA AUTOMATICA A GITHUB (V2 FIXED)
echo ===================================================
echo.

:: Limpiar archivos de bloqueo si existen
if exist ".git\index.lock" del /f /q ".git\index.lock" >nul 2>&1

:: 1. Permisos
echo [1/4] Configurando permisos...
%GIT_PATH% config --global --add safe.directory "*" >nul 2>&1
%GIT_PATH% config --global --add safe.directory "%cd%" >nul 2>&1

:: 2. Configurar
echo [2/4] Preparando Git...
%GIT_PATH% init >nul 2>&1
%GIT_PATH% config --global user.email "adoniesis2010@gmail.com"
%GIT_PATH% config --global user.name "Adoni RestaurantOS"

:: 3. Commit
echo [3/4] Creando paquete de cambios...
%GIT_PATH% add .
%GIT_PATH% commit -m "Registro Funcionando y Seguridad con Bcrypt" >nul 2>&1

:: 4. Push
echo [4/4] Subiendo a la nube (GitHub)...
echo Esto puede tardar unos segundos...
%GIT_PATH% branch -M main >nul 2>&1
%GIT_PATH% remote remove origin >nul 2>&1
%GIT_PATH% remote add origin https://github.com/adoniesis/restaurant-os.git >nul 2>&1
%GIT_PATH% push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    color 0C
    echo ===================================================
    echo   ERROR: No se pudo subir el codigo a GitHub.
    echo.
    echo   CAUSA PROBABLE: Quizas el archivo .git esta bloqueado
    echo   o no tienes conexion a internet.
    echo ===================================================
) else (
    echo.
    color 0A
    echo ===================================================
    echo   EXITO: Codigo enviado correctamente a GitHub!
    echo.
    echo   PROXIMO PASO:
    echo   Ve a Vercel y haz "Redeploy" para ver los cambios.
    echo ===================================================
)

pause
