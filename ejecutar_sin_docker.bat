@echo off
echo ========================================
echo   Calculadora Django - Inicio SIN Docker
echo ========================================
echo.

REM Cambiar al directorio del proyecto
cd /d "%~dp0"

REM Verificar si existe el entorno virtual
if not exist "venv\" (
    echo Creando entorno virtual...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: No se pudo crear el entorno virtual
        pause
        exit /b 1
    )
    echo Entorno virtual creado correctamente
    echo.
)

REM Activar entorno virtual
echo Activando entorno virtual...
call venv\Scripts\activate.bat

REM Instalar dependencias
echo Instalando dependencias...
pip install --upgrade pip
pip install -r requirements.txt

if errorlevel 1 (
    echo ERROR: No se pudieron instalar las dependencias
    pause
    exit /b 1
)

echo.
echo Ejecutando migraciones...
python manage.py makemigrations
python manage.py migrate

echo.
echo ========================================
echo   Iniciando servidor de desarrollo...
echo ========================================
echo.
echo La aplicacion estara disponible en:
echo http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

REM Iniciar servidor
python manage.py runserver 8000

pause
