#!/bin/bash

echo "========================================"
echo "  Calculadora Django - Inicio SIN Docker"
echo "========================================"
echo

# Cambiar al directorio del script
cd "$(dirname "$0")"

# Verificar si existe el entorno virtual
if [ ! -d "venv" ]; then
    echo "Creando entorno virtual..."
    python -m venv venv
    if [ $? -ne 0 ]; then
        echo "ERROR: No se pudo crear el entorno virtual"
        exit 1
    fi
    echo "Entorno virtual creado correctamente"
    echo
fi

# Activar entorno virtual
echo "Activando entorno virtual..."
source venv/bin/activate

# Instalar dependencias
echo "Instalando dependencias..."
pip install --upgrade pip
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "ERROR: No se pudieron instalar las dependencias"
    exit 1
fi

echo
echo "Ejecutando migraciones..."
python manage.py makemigrations
python manage.py migrate

echo
echo "========================================"
echo "  Iniciando servidor de desarrollo..."
echo "========================================"
echo
echo "La aplicación estará disponible en:"
echo "http://localhost:8000"
echo
echo "Presiona Ctrl+C para detener el servidor"
echo

# Iniciar servidor
python manage.py runserver 8000
