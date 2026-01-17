@echo off
set GIT_PATH="C:\Program Files\Git\cmd\git.exe"

echo [AUTO] Iniciando subida automatica con ruta absoluta...

:: 1. Permisos
%GIT_PATH% config --global --add safe.directory "*"
%GIT_PATH% config --global --add safe.directory "c:/Users/adoni/OneDrive/Desktop/Antigravity/restaurant-saas"

:: 2. Configurar
%GIT_PATH% init
%GIT_PATH% config --global user.email "adoniesis2010@gmail.com"
%GIT_PATH% config --global user.name "Adoni RestaurantOS"

:: 3. Commit
%GIT_PATH% add .
%GIT_PATH% commit -m "Auto-update: Supabase config" 

:: 4. Push
%GIT_PATH% branch -M main
%GIT_PATH% remote remove origin 
%GIT_PATH% remote add origin https://github.com/adoniesis/restaurant-os.git
%GIT_PATH% push -u origin main --force

echo [AUTO] Finalizado.
