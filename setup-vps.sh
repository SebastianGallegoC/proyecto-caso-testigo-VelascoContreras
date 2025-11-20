#!/bin/bash

# Script de preparación del VPS Ubuntu para deployment
# Ejecuta este script EN TU VPS antes del primer deployment

set -e

echo "🚀 Preparando VPS Ubuntu para deployment de Calculadora Django + Vue.js"
echo "======================================================================="

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables (edita según tu configuración)
DEPLOY_PATH="/var/www/calculadora"
APP_USER=$(whoami)

echo -e "${YELLOW}📋 Información del sistema:${NC}"
echo "Usuario actual: $APP_USER"
echo "Ruta de deployment: $DEPLOY_PATH"
echo "Sistema operativo: $(lsb_release -d | cut -f2)"
echo ""

# 1. Actualizar sistema
echo -e "${GREEN}📦 Paso 1: Actualizando sistema...${NC}"
sudo apt-get update
sudo apt-get upgrade -y

# 2. Instalar dependencias básicas
echo -e "${GREEN}📦 Paso 2: Instalando dependencias básicas...${NC}"
sudo apt-get install -y \
    curl \
    wget \
    git \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# 3. Instalar Docker
echo -e "${GREEN}🐳 Paso 3: Instalando Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $APP_USER
    echo "✅ Docker instalado"
    
    # Iniciar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
else
    echo "✅ Docker ya está instalado"
fi

# 4. Instalar Docker Compose
echo -e "${GREEN}🐳 Paso 4: Instalando Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose instalado"
else
    echo "✅ Docker Compose ya está instalado"
fi

# 5. Crear directorio de deployment
echo -e "${GREEN}📁 Paso 5: Creando directorio de deployment...${NC}"
sudo mkdir -p $DEPLOY_PATH
sudo chown -R $APP_USER:$APP_USER $DEPLOY_PATH
echo "✅ Directorio creado: $DEPLOY_PATH"

# 6. Configurar firewall (UFW)
echo -e "${GREEN}🔥 Paso 6: Configurando firewall...${NC}"
if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp      # SSH
    sudo ufw allow 80/tcp      # HTTP
    sudo ufw allow 443/tcp     # HTTPS
    sudo ufw allow 8000/tcp    # Django backend
    sudo ufw allow 5173/tcp    # Vue.js frontend
    echo "✅ Reglas de firewall configuradas"
else
    echo "⚠️ UFW no está instalado, saltando configuración de firewall"
fi

# 7. Configurar permisos SSH
echo -e "${GREEN}🔐 Paso 7: Verificando configuración SSH...${NC}"
mkdir -p ~/.ssh
chmod 700 ~/.ssh
if [ -f ~/.ssh/authorized_keys ]; then
    chmod 600 ~/.ssh/authorized_keys
    echo "✅ Permisos SSH configurados"
else
    echo "⚠️ Archivo authorized_keys no encontrado"
    echo "Debes agregar tu llave pública SSH:"
    echo "echo 'tu-llave-publica' >> ~/.ssh/authorized_keys"
    echo "chmod 600 ~/.ssh/authorized_keys"
fi

# 8. Instalar herramientas útiles
echo -e "${GREEN}🛠️ Paso 8: Instalando herramientas útiles...${NC}"
sudo apt-get install -y \
    htop \
    vim \
    nano \
    net-tools \
    rsync

# 9. Verificar versiones instaladas
echo ""
echo -e "${GREEN}✅ Instalación completada!${NC}"
echo "======================================================================="
echo "📋 Versiones instaladas:"
echo "Docker: $(docker --version)"
echo "Docker Compose: $(docker-compose --version)"
echo "Git: $(git --version)"
echo "Sistema: $(lsb_release -d | cut -f2)"
echo ""

# 10. Información importante
echo -e "${YELLOW}📝 Información importante:${NC}"
echo "======================================================================="
echo "🔹 Directorio de deployment: $DEPLOY_PATH"
echo "🔹 Usuario: $APP_USER"
echo "🔹 IP del servidor: $(curl -s ifconfig.me 2>/dev/null || echo 'No disponible')"
echo ""
echo -e "${YELLOW}📋 Próximos pasos:${NC}"
echo "1. Agregar tu llave SSH pública a ~/.ssh/authorized_keys"
echo "2. Configurar los secrets en GitHub Actions"
echo "3. Hacer push a la rama main para iniciar deployment"
echo ""
echo -e "${GREEN}🎉 VPS preparado para deployment!${NC}"
echo "======================================================================="

# 11. Mostrar puertos abiertos
echo ""
echo "🌐 Puertos en escucha:"
sudo netstat -tulpn | grep LISTEN || echo "netstat no disponible"

# 12. IMPORTANTE: Reiniciar para aplicar cambios de grupo Docker
echo ""
echo -e "${YELLOW}⚠️ IMPORTANTE:${NC}"
echo "Para que los cambios de grupo Docker surtan efecto, debes:"
echo "1. Cerrar sesión SSH: 'exit'"
echo "2. Volver a conectarte: 'ssh usuario@ip-servidor'"
echo "O reiniciar el servidor: 'sudo reboot'"
