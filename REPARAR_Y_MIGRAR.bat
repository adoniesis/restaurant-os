@echo off
color 0B
cls
echo ===================================================
echo   REPARACION Y MIGRACION
echo ===================================================
echo.
echo Parece que faltan las "herramientas" (Prisma) en tu computador.
echo Este script va a instalarlas primero.
echo.
echo PASO 1: INSTALANDO HERRAMIENTAS (Esto puede tardar unos minutos...)
echo Por favor espera y no cierres la ventana.
echo.

:: 1. Instalar dependencias
call npm install
echo.
echo ---------------------------------------
echo INSTALACION COMPLETA. AHORA SI, A CONECTAR.
echo ---------------------------------------
echo.

:: 2. Generar Cliente Prisma
echo Generando cliente de base de datos...
call npx prisma generate
echo.

:: 3. Pedir Claves (Igual que antes)
echo Ahora pega las claves de Supabase.
echo.
set /p DB_URL="1. Pega aqui DATABASE_URL (Puerto 6543): "
echo.
set /p DIR_URL="2. Pega aqui DIRECT_URL (Puerto 5432): "
echo.

:: 4. Crear archivo temporal
echo DATABASE_URL=%DB_URL% > .env.production.local
echo DIRECT_URL=%DIR_URL% >> .env.production.local

:: 5. Migrar
echo.
echo [CONSTRUYENDO BASE DE DATOS EN LA NUBE]
call npx prisma db push --schema=./prisma/schema.prisma
echo.

if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Sigue fallando. Toma una foto y enviala.
    pause
    exit /b
)

color 0A
echo ==============================================
echo    EXITO TOTAL! BASE DE DATOS CREADA
echo ==============================================
del .env.production.local
pause
