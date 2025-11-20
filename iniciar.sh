#!/bin/bash

echo "========================================"
echo "  Calculadora Django - Inicio con Docker"
echo "========================================"
echo

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker no está instalado o no está en el PATH"
    echo
    echo "Por favor instala Docker desde:"
    echo "https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo "Docker detectado correctamente"
echo

# Construir y ejecutar los contenedores
echo "Construyendo la imagen Docker..."
echo
docker compose up --build -d

if [ $? -ne 0 ]; then
    echo
    echo "ERROR: Hubo un problema al construir o ejecutar los contenedores"
    exit 1
fi

echo
echo "========================================"
echo "  ¡Aplicación iniciada correctamente!"
echo "========================================"
echo
echo "La aplicación está ejecutándose en:"
echo "http://localhost:8000"
echo
echo "Para ver los logs: docker compose logs -f"
echo "Para detener: docker compose down"
echo
