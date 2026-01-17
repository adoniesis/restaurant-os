@echo off
color 0B
cls
:: Asegurar que estamos en la carpeta correcta
cd /d "%~dp0"

echo ===================================================
echo   INTENTO FINAL: MIGRACION ROBUSTA
echo ===================================================
echo.
echo Detecte que quizas el script no encontraba los archivos.
echo He corregido la ruta. Vamos de nuevo.
echo.

:: 1. Verificacion rapida
if not exist "prisma\schema.prisma" (
    color 0C
    echo ERROR CRITICO: No encuentro la carpeta 'prisma'.
    echo Asegurate de que este archivo este dentro de 'restaurant-saas'.
    pause
    exit /b
)

:: 2. Pedir Claves (POCO A POCO)
echo ---------------------------------------------------------
echo CLAVE 1: DATABASE_URL (Transaction - Puerto 6543)
echo ---------------------------------------------------------
echo Ejemplo: postgres://postgres:[CLAVE]@...:6543/postgres?pgbouncer=true
echo.
set /p DB_URL=">>> Pega la clave 1 aqui y presiona ENTER: "
echo.

echo ---------------------------------------------------------
echo CLAVE 2: DIRECT_URL (Session - Puerto 5432)
echo ---------------------------------------------------------
echo Ejemplo: postgres://postgres:[CLAVE]@...:5432/postgres
echo.
set /p DIR_URL=">>> Pega la clave 2 aqui y presiona ENTER: "
echo.

:: 3. Crear archivo temporal
echo Configurando...
echo DATABASE_URL=%DB_URL% > .env.production.local
echo DIRECT_URL=%DIR_URL% >> .env.production.local

:: 4. Forzar instalacion de Prisma (por si acaso)
echo Verificando motor de Prisma...
call npx prisma generate
echo.

:: 5. Migrar
echo [CONSTRUYENDO TABLAS EN SUPABASE]
echo Cruzando los dedos...
call npx prisma db push --schema=prisma/schema.prisma
echo.

if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Sigue fallando. 
    echo Posibles causas:
    echo 1. La contrasena [YOUR-PASSWORD] no la cambiaste por la real.
    echo 2. Copiaste mal el link.
    pause
    exit /b
)

color 0A
echo ==============================================
echo    EXITO TOTAL! BASE DE DATOS LISTA 🚀
echo ==============================================
del .env.production.local
pause
