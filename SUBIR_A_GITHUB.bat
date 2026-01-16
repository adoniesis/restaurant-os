@echo off
color 0A
cls
echo ===================================================
echo    SUBIDA DE EMERGENCIA A GITHUB - RESTAURANT-OS
echo ===================================================
echo.
echo Hola! Voy a intentar subir tus archivos de nuevo.
echo Si ves letras rojas, lee el mensaje con atencion.
echo.
pause

:: 1. Verificar Git
echo.
echo [1/5] Verificando instalacion de Git...
where git >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Git no esta instalado correctamente.
    echo Por favor reinicia tu computadora e intenta de nuevo.
    pause
    exit /b
)
echo Git encontrado!

:: 2. Inicializar y Configurar
echo.
echo [2/5] Preparando carpeta...
git init
git config --global user.email "adoniesis2010@gmail.com"
git config --global user.name "Adoni RestaurantOS"
git remote remove origin 2>nul

:: 3. Agregar Archivos
echo.
echo [3/5] Escaneando archivos (esto puede tardar un poco)...
git add .
git commit -m "Commit forzado: Restauracion completa" 2>nul

:: 4. Conectar
echo.
echo [4/5] Conectando con GitHub...
git remote add origin https://github.com/adoniesis/restaurant-os.git

:: 5. Subir
echo.
echo [5/5] Subiendo a la nube...
echo.
echo IMPORTANTE:
echo - Si sale una ventana pidiendo usuario/clave, introducelos.
echo - Si sale una ventana de navegador, dale a "Authorize".
echo.
git push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo Fallo al subir a 'main', intentando con 'master'...
    git push -u origin master --force
)

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ==============================================
    echo    ALGO SALIO MAL
    echo ==============================================
    echo Por favor toma una foto de esta pantalla y enviasela al soporte.
    echo Posibles causas:
    echo 1. Contrasena incorrecta.
    echo 2. Internet inestable.
    pause
    exit /b
)

color 0A
echo.
echo ==============================================
echo    EXITO! TODO SUBIDO CORRECTAMENTE
echo ==============================================
echo Ya puedes cerrar esta ventana.
pause
