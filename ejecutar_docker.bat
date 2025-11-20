@echo off
REM Script para ejecutar la aplicación con Docker Compose

echo 🚀 Iniciando aplicación calculadora con Docker...
echo.

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Docker no está instalado
    echo Por favor instala Docker desde: https://www.docker.com/get-started
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Docker Compose no está instalado
    echo Por favor instala Docker Compose
    pause
    exit /b 1
)

echo ✅ Docker y Docker Compose detectados
echo.

REM Detener contenedores previos si existen
echo 🛑 Deteniendo contenedores previos...
docker-compose down

REM Construir y levantar los servicios
echo.
echo 🔨 Construyendo y levantando servicios...
docker-compose up --build -d

REM Esperar a que los servicios estén listos
echo.
echo ⏳ Esperando a que los servicios estén listos...
timeout /t 5 /nobreak >nul

REM Mostrar logs
echo.
echo 📋 Estado de los contenedores:
docker-compose ps

echo.
echo ✅ ¡Aplicación iniciada!
echo.
echo 📍 URLs:
echo    - Backend (Django API): http://localhost:8000
echo    - Frontend (Vue.js): http://localhost:5173
echo.
echo 📖 Para ver logs en tiempo real:
echo    docker-compose logs -f
echo.
echo 🛑 Para detener la aplicación:
echo    docker-compose down
echo.

pause
