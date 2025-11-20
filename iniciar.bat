@echo off
echo ========================================
echo   Calculadora Django - Inicio con Docker
echo ========================================
echo.

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no está instalado o no está en el PATH
    echo.
    echo Por favor instala Docker Desktop desde:
    echo https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Docker detectado correctamente
echo.

REM Construir y ejecutar los contenedores
echo Construyendo la imagen Docker...
echo.
docker compose up --build -d

if errorlevel 1 (
    echo.
    echo ERROR: Hubo un problema al construir o ejecutar los contenedores
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ¡Aplicación iniciada correctamente!
echo ========================================
echo.
echo La aplicación está ejecutándose en:
echo http://localhost:8000
echo.
echo Para ver los logs: docker compose logs -f
echo Para detener: docker compose down
echo.
pause
