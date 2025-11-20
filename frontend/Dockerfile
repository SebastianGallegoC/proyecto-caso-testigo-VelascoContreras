# Usar imagen base de Node.js 20
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el proyecto
COPY . .

# Exponer puerto 5173
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev", "--", "--host"]
