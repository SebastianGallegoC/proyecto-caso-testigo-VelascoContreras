# Guía de Instalación y Verificación - Calculadora Django

## ✅ Verificación de Requisitos

### 1. Verificar Docker
Abre una terminal y ejecuta:
```bash
docker --version
```
Deberías ver algo como: `Docker version 24.x.x`

Si no está instalado, descarga Docker Desktop desde:
- Windows/Mac: https://www.docker.com/products/docker-desktop
- Linux: https://docs.docker.com/engine/install/

### 2. Verificar Docker Compose
```bash
docker compose version
```
Deberías ver algo como: `Docker Compose version v2.x.x`

## 🚀 Inicio Rápido

### Método 1: Scripts de Inicio (Recomendado para Windows)

**Windows:**
1. Abre el directorio del proyecto
2. Haz doble clic en `iniciar.bat`
3. Espera a que se construya la imagen (puede tardar unos minutos la primera vez)
4. Abre tu navegador en: http://localhost:8000

**Linux/Mac:**
```bash
chmod +x iniciar.sh
./iniciar.sh
```

### Método 2: Comandos Docker Directos

```bash
# Navega al directorio del proyecto
cd calculadora_django

# Construye y ejecuta
docker compose up --build -d

# Verifica que el contenedor esté corriendo
docker ps

# Deberías ver algo como:
# CONTAINER ID   IMAGE                    STATUS         PORTS
# xxxxx          calculadora_django-web   Up X seconds   0.0.0.0:8000->8000/tcp
```

## 🧪 Verificación de Funcionamiento

### 1. Verificar que el contenedor está corriendo
```bash
docker ps
```
Busca el contenedor `calculadora_django`

### 2. Ver los logs
```bash
docker compose logs -f
```
Deberías ver mensajes de Gunicorn indicando que el servidor está corriendo

### 3. Probar la aplicación
1. Abre tu navegador en: http://localhost:8000
2. Deberías ver la interfaz de la calculadora
3. Prueba una operación:
   - Primer número: 10
   - Segundo número: 5
   - Clic en "Sumar"
   - Resultado esperado: 15

### 4. Verificar el API Backend
Puedes probar el endpoint del API usando curl o Postman:

```bash
curl -X POST http://localhost:8000/calcular/ \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5, "operacion": "sumar"}'
```

Respuesta esperada:
```json
{
  "resultado": 15.0,
  "operacion": "sumar",
  "num1": 10.0,
  "num2": 5.0
}
```

## 🔍 Solución de Problemas

### Problema: El puerto 8000 ya está en uso
**Solución:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

O modifica el puerto en `docker-compose.yml`:
```yaml
ports:
  - "8001:8000"  # Cambia 8000 por 8001
```

### Problema: Error "Cannot connect to Docker daemon"
**Solución:**
- Asegúrate de que Docker Desktop esté ejecutándose
- En Windows, verifica que el servicio de Docker esté iniciado

### Problema: Error al construir la imagen
**Solución:**
```bash
# Limpia los contenedores e imágenes anteriores
docker compose down
docker system prune -a

# Reconstruye
docker compose up --build
```

### Problema: La página no carga
**Solución:**
1. Verifica los logs:
   ```bash
   docker compose logs -f
   ```
2. Verifica que el contenedor esté corriendo:
   ```bash
   docker ps
   ```
3. Intenta reiniciar el contenedor:
   ```bash
   docker compose restart
   ```

## 📊 Comandos Útiles

### Ver todos los contenedores (incluyendo detenidos)
```bash
docker ps -a
```

### Ver los logs en tiempo real
```bash
docker compose logs -f
```

### Acceder a la terminal del contenedor
```bash
docker exec -it calculadora_django bash
```

### Detener la aplicación
```bash
docker compose down
```

### Detener y eliminar todo (incluyendo volúmenes)
```bash
docker compose down -v
```

### Reconstruir sin caché
```bash
docker compose build --no-cache
docker compose up -d
```

## 🧹 Limpieza

Para eliminar todo y empezar de cero:

```bash
# Detener y eliminar contenedores
docker compose down -v

# Eliminar la imagen
docker rmi calculadora_django-web

# Limpiar el sistema (opcional)
docker system prune -a
```

## ✅ Checklist de Verificación

- [ ] Docker está instalado y corriendo
- [ ] El contenedor `calculadora_django` está en estado "Up"
- [ ] http://localhost:8000 carga correctamente
- [ ] Las operaciones matemáticas funcionan
- [ ] El historial guarda las operaciones
- [ ] No hay errores en los logs

## 📝 Notas Importantes

1. La primera construcción puede tardar varios minutos
2. Los cambios en el código se reflejan automáticamente gracias al volumen montado
3. La base de datos SQLite se crea automáticamente en el primer inicio
4. El proyecto está configurado en modo DEBUG, no usar en producción

## 🎯 Próximos Pasos

Una vez verificado que todo funciona:

1. Personaliza el diseño en `calculadora/templates/calculadora/index.html`
2. Agrega más operaciones en `calculadora/views.py`
3. Configura variables de entorno para producción
4. Considera usar PostgreSQL para producción
5. Configura NGINX como reverse proxy

## 🆘 Soporte

Si encuentras algún problema:
1. Revisa los logs: `docker compose logs -f`
2. Verifica la configuración de Docker
3. Asegúrate de que no haya conflictos de puertos
4. Consulta la documentación de Docker

## 🎉 ¡Listo!

Si todo está funcionando correctamente, ahora tienes una calculadora Django completamente dockerizada y lista para usar.
