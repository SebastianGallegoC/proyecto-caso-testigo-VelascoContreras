# 🔐 GitHub Secrets - Configuración para Deployment VPS Ubuntu

## Variables que debes configurar en GitHub

Ve a tu repositorio en GitHub:
```
Settings → Secrets and variables → Actions → New repository secret
```

---

## 📋 Secrets Requeridos

### 1. VPS_HOST
**Nombre:** `VPS_HOST`  
**Descripción:** Dirección IP o dominio de tu servidor VPS Ubuntu  
**Ejemplo de valor:**
```
192.168.1.100
```
O si tienes un dominio:
```
tudominio.com
```

---

### 2. VPS_USERNAME
**Nombre:** `VPS_USERNAME`  
**Descripción:** Usuario SSH para conectarse al VPS (normalmente 'root' o tu usuario con sudo)  
**Ejemplo de valor:**
```
root
```
O tu usuario personalizado:
```
ubuntu
```
O:
```
admin
```

---

### 3. VPS_SSH_KEY
**Nombre:** `VPS_SSH_KEY`  
**Descripción:** Clave privada SSH para autenticación (la que YA tienes)  
**Cómo obtener el valor:**

Si tu llave SSH está en `~/.ssh/id_rsa` o similar:
```bash
cat ~/.ssh/id_rsa
```

**El valor debe verse así:**
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
NhAAAAAwEAAQAAAYEA1234567890abcdefghijklmnopqrstuvwxyz...
... (muchas más líneas) ...
-----END OPENSSH PRIVATE KEY-----
```

**⚠️ IMPORTANTE:** Copia TODA la llave incluyendo las líneas `-----BEGIN...` y `-----END...`

---

### 4. VPS_DEPLOY_PATH
**Nombre:** `VPS_DEPLOY_PATH`  
**Descripción:** Ruta en el servidor donde se desplegará la aplicación  
**Ejemplo de valor:**
```
/var/www/calculadora
```
O:
```
/home/ubuntu/apps/calculadora
```
O:
```
/opt/calculadora
```

**Recomendado:**
```
/var/www/calculadora-django
```

---

### 5. VPS_DOMAIN (Opcional)
**Nombre:** `VPS_DOMAIN`  
**Descripción:** Nombre de dominio si tienes uno configurado (opcional, puede ser igual a VPS_HOST)  
**Ejemplo de valor:**
```
calculadora.tudominio.com
```
O si no tienes dominio, usa la IP:
```
192.168.1.100
```

---

### 6. DJANGO_SECRET_KEY
**Nombre:** `DJANGO_SECRET_KEY`  
**Descripción:** Secret key de Django para producción (DEBE ser diferente al de desarrollo)  
**Cómo generar un valor seguro:**

Opción 1 - Usando Python:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Opción 2 - Generar manualmente:
```
django-insecure-prod-a9s8d7f6g5h4j3k2l1m0n9b8v7c6x5z4a3s2d1f0g9h8j7k6
```

**Ejemplo de valor:**
```
prod-8x!k2p9#mq7@vn4$wz5&rt6^uy7*io8(pl9)aq0-ws1=xe2+dc3<fr4>gt5
```

---

### 7. DATABASE_URL (Opcional)
**Nombre:** `DATABASE_URL`  
**Descripción:** URL de conexión a la base de datos (opcional, por defecto usa SQLite)  

**Para SQLite (por defecto):**
```
sqlite:///db.sqlite3
```

**Para PostgreSQL:**
```
postgres://usuario:contraseña@localhost:5432/nombre_db
```

**Para MySQL:**
```
mysql://usuario:contraseña@localhost:3306/nombre_db
```

**Recomendado para empezar:**
```
sqlite:///db.sqlite3
```

---

## 📝 Resumen de Configuración

Aquí está un resumen de TODAS las variables que necesitas:

| Secret Name | Ejemplo de Valor | Requerido |
|-------------|------------------|-----------|
| `VPS_HOST` | `192.168.1.100` | ✅ SÍ |
| `VPS_USERNAME` | `root` o `ubuntu` | ✅ SÍ |
| `VPS_SSH_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----...` | ✅ SÍ |
| `VPS_DEPLOY_PATH` | `/var/www/calculadora` | ✅ SÍ |
| `VPS_DOMAIN` | `calculadora.tudominio.com` | ⚠️ Opcional |
| `DJANGO_SECRET_KEY` | `prod-8x!k2p9#mq7@vn4$...` | ✅ SÍ |
| `DATABASE_URL` | `sqlite:///db.sqlite3` | ⚠️ Opcional |

---

## 🔧 Pasos para Configurar cada Secret

### Para CADA secret:

1. Ve a tu repo en GitHub: https://github.com/SebastianGallegoC/proyecto-caso-testigo-VelascoContreras
2. Click en **Settings** (arriba derecha)
3. En el menú izquierdo: **Secrets and variables** → **Actions**
4. Click en **New repository secret**
5. En **Name**: escribe el nombre exacto (ej: `VPS_HOST`)
6. En **Secret**: pega el valor correspondiente
7. Click en **Add secret**
8. Repite para TODOS los secrets

---

## ✅ Verificación Pre-Deployment

Antes de hacer push, verifica:

### En tu VPS Ubuntu:

1. **SSH está funcionando:**
```bash
ssh usuario@ip-del-vps
```

2. **Tu llave SSH está agregada:**
```bash
# En tu VPS, verifica que la llave pública esté en:
cat ~/.ssh/authorized_keys
```

3. **Permisos correctos:**
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

4. **Usuario tiene permisos sudo (si no es root):**
```bash
sudo usermod -aG sudo tu-usuario
```

### Comandos útiles en el VPS:

```bash
# Ver IP pública
curl ifconfig.me

# Verificar Docker (si ya está instalado)
docker --version

# Ver espacio en disco
df -h

# Ver puertos abiertos
sudo netstat -tulpn | grep LISTEN
```

---

## 🚀 Después de Configurar los Secrets

Una vez configurados TODOS los secrets:

1. Haz cualquier commit y push a `main`:
```bash
git add .
git commit -m "test: trigger deployment"
git push origin main
```

2. Ve a GitHub Actions:
```
https://github.com/SebastianGallegoC/proyecto-caso-testigo-VelascoContreras/actions
```

3. El pipeline se ejecutará automáticamente y desplegará en tu VPS

4. Verifica que los contenedores estén corriendo:
```bash
ssh usuario@ip-vps
cd /var/www/calculadora  # o la ruta que configuraste
docker-compose ps
```

5. Accede a tu aplicación:
- Backend: `http://TU-IP:8000`
- Frontend: `http://TU-IP:5173`

---

## 🔥 Troubleshooting

### Error: "Permission denied (publickey)"
```bash
# En tu VPS, agrega la llave pública:
echo "tu-llave-publica-ssh" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Error: "Docker command not found"
El pipeline lo instalará automáticamente en el primer deployment.

### Error: "Directory not found"
El pipeline creará el directorio automáticamente.

### Verificar logs en el VPS:
```bash
ssh usuario@ip-vps
cd /var/www/calculadora
docker-compose logs -f
```

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que TODOS los secrets estén configurados
2. Revisa los logs del workflow en GitHub Actions
3. Conecta por SSH al VPS y verifica los logs de Docker

---

**Última actualización:** 19 de noviembre de 2025
