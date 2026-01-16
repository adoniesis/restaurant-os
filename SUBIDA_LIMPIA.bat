@echo off
color 0E
cls
echo ===================================================
echo    EXTREMO CUIDADO - LIMPIEZA TOTAL GIT
echo ===================================================
echo.
echo El error que ves sucede porque Git cree que 
echo tu carpeta de proyecto es TODO EL DISCO C:/
echo (Por eso intenta leer System32 y falla).
echo.
echo Vamos a arreglar esto borrando la configuracion corrupta.
echo.
pause

:: 1. Matar el repositorio corrupto (El paso mas importante)
echo.
echo [1/5] Limpiando configuracion erronea...
rmdir /s /q .git

:: 2. Re-iniciar limpio
echo.
echo [2/5] Iniciando desde cero (Limpio)...
git init
git config --global --add safe.directory "*"
git config user.email "adoniesis2010@gmail.com"
git config user.name "Adoni RestaurantOS"

:: 3. Agregar solo lo necesario
echo.
echo [3/5] Escaneando SOLO tu proyecto...
git add .

:: 4. Commit
echo.
echo [4/5] Guardando version...
git commit -m "Entrega Limpia Final" 

:: 5. Subir
echo.
echo [5/5] Subiendo a GitHub...
git branch -M main
git remote add origin https://github.com/adoniesis/restaurant-os.git
git push -u origin main --force

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo FALLO LA SUBIDA.
    echo Pero al menos ya no deberias tener errores de System32.
    pause
    exit /b
)

color 0A
echo.
echo ==============================================
echo    EXITO! REVISA GITHUB AHORA
echo ==============================================
pause
