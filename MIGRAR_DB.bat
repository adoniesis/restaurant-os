@echo off
color 0B
cls
echo ===================================================
echo   CONEXION FINAL: COMPUTADOR -> SUPABASE
echo ===================================================
echo.
echo Para que la web funcione, necesitamos "construir" las tablas
echo en tu nueva base de datos de Supabase.
echo.
echo Necesito que pegues las mismas claves que pusiste en Vercel.
echo.

:: 1. Pedir Claves
set /p DB_URL="1. Pega aqui DATABASE_URL (Puerto 6543) y presiona Enter: "
echo.
set /p DIR_URL="2. Pega aqui DIRECT_URL (Puerto 5432) y presiona Enter: "
echo.

:: 2. Crear archivo .env temporal
echo Configurando acceso temporal...
echo DATABASE_URL=%DB_URL% > .env.production.local
echo DIRECT_URL=%DIR_URL% >> .env.production.local

:: 3. Ejecutar Migracion
echo.
echo [CONSTRUYENDO BASE DE DATOS]
echo Esto puede tardar 30 segundos...
echo.
call npx prisma db push --schema=./prisma/schema.prisma
echo.

if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Algo fallo. Revisa las claves o tu conexion.
    pause
    exit /b
)

color 0A
echo ==============================================
echo    EXITO! BASE DE DATOS LISTA
echo ==============================================
echo Ya puedes ir a tu web en Vercel y registrarte.
echo.
echo (El archivo temporal con claves se borrara por seguridad)
del .env.production.local
pause
