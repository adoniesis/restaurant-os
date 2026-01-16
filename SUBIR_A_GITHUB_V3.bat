@echo off
color 0B
cls
echo ===================================================
echo    SUBIDA FINAL - FIX PERMISOS (V3)
echo ===================================================
echo.
echo Detectamos un problema de permisos de Windows.
echo Este script arregla el error "dubious ownership"
echo y sube tus archivos.
echo.
pause

:: 1. Arreglar Permisos (La clave del exito)
echo.
echo [1/6] Arreglando permisos de carpeta...
git config --global --add safe.directory "*"
git config --global --add safe.directory "c:/Users/adoni/OneDrive/Desktop/Antigravity/restaurant-saas"

:: 2. Verificar Git
echo.
echo [2/6] Verificando Git...
where git >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo Error: Git no se detecta.
    pause
    exit /b
)

:: 3. Configurar Usuario
echo.
echo [3/6] Configurando usuario...
git init
git config --global user.email "adoniesis2010@gmail.com"
git config --global user.name "Adoni RestaurantOS"

:: 4. Agregar Archivos
echo.
echo [4/6] Agregando archivos (Paciencia)...
git add .
git commit -m "Entrega Final V3" 2>nul
git branch -M main

:: 5. Conectar
echo.
echo [5/6] Conectando a GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/adoniesis/restaurant-os.git

:: 6. Subir
echo.
echo [6/6] ENVIANDO A LA NUBE...
echo.
echo SI SALE UNA VENTANA, DALE "AUTHORIZE" O "SIGN IN".
echo.
git push -u origin main --force

if %errorlevel% neq 0 (
    color 0C
    echo ERROR AL SUBIR.
    echo Revisa tu internet o credenciales.
    pause
    exit /b
)

color 0A
echo.
echo ==============================================
echo    EXITO TOTAL! REVISA GITHUB AHORA
echo ==============================================
pause
