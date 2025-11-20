#!/bin/bash

# Script para ejecutar la aplicación con Docker Compose

echo "🚀 Iniciando aplicación calculadora con Docker..."
echo ""

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker no está instalado"
    echo "Por favor instala Docker desde: https://www.docker.com/get-started"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: Docker Compose no está instalado"
    echo "Por favor instala Docker Compose"
    exit 1
fi

echo "✅ Docker y Docker Compose detectados"
echo ""

# Detener contenedores previos si existen
echo "🛑 Deteniendo contenedores previos..."
docker-compose down

# Construir y levantar los servicios
echo ""
echo "🔨 Construyendo y levantando servicios..."
docker-compose up --build -d

# Esperar a que los servicios estén listos
echo ""
echo "⏳ Esperando a que los servicios estén listos..."
sleep 5

# Mostrar logs
echo ""
echo "📋 Estado de los contenedores:"
docker-compose ps

echo ""
echo "✅ ¡Aplicación iniciada!"
echo ""
echo "📍 URLs:"
echo "   - Backend (Django API): http://localhost:8000"
echo "   - Frontend (Vue.js): http://localhost:5173"
echo ""
echo "📖 Para ver logs en tiempo real:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para detener la aplicación:"
echo "   docker-compose down"
echo ""
