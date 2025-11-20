# Configuración CI/CD con GitHub Actions

Este proyecto incluye un pipeline completo de CI/CD configurado con GitHub Actions.

## 🔄 Pipeline Overview

El pipeline se ejecuta automáticamente en:
- **Push** a las ramas `main` y `develop`
- **Pull Requests** hacia `main` y `develop`

## 📋 Jobs del Pipeline

### 1. Backend Tests (Django)
- ✅ Ejecuta tests del backend Django
- ✅ Genera reporte de cobertura
- ✅ Sube cobertura a Codecov
- **Duración estimada:** ~2 minutos

### 2. Frontend Tests (Vue.js)
- ✅ Ejecuta tests del frontend Vue.js
- ✅ Genera reporte de cobertura con Vitest
- ✅ Sube cobertura a Codecov
- **Duración estimada:** ~2 minutos

### 3. Code Quality & Linting
- ✅ Flake8 para Python
- ✅ Black para formateo Python
- ✅ isort para imports Python
- ✅ ESLint para Vue.js (si está configurado)
- **Duración estimada:** ~1 minuto

### 4. Docker Build
- ✅ Construye imagen Docker del backend
- ✅ Construye imagen Docker del frontend
- ✅ Valida docker-compose.yml
- ✅ (Opcional) Push a Docker Hub
- **Duración estimada:** ~3-5 minutos

### 5. Security Scan
- ✅ Escaneo de vulnerabilidades con Trivy
- ✅ Safety check para dependencias Python
- ✅ npm audit para dependencias JavaScript
- **Duración estimada:** ~2 minutos

### 6. Deploy (solo en main)
- ✅ Se ejecuta solo en push a `main`
- ✅ Requiere que todos los tests pasen
- ✅ Placeholder para deployment real
- **Duración estimada:** ~1 minuto

### 7. Status Summary
- ✅ Resume el estado de todos los jobs
- ✅ Notifica si algo falló
- **Duración estimada:** <1 minuto

## ⚙️ Configuración de Secrets

Para habilitar todas las funcionalidades, configura estos secrets en GitHub:

```
Settings → Secrets and variables → Actions → New repository secret
```

### Secrets Opcionales:

1. **DOCKER_USERNAME** - Usuario de Docker Hub
2. **DOCKER_PASSWORD** - Token de Docker Hub
3. **HEROKU_API_KEY** - API key de Heroku (si usas Heroku)
4. **AWS_ACCESS_KEY_ID** - Para deployment en AWS
5. **AWS_SECRET_ACCESS_KEY** - Para deployment en AWS

### Codecov (opcional):
- El workflow subirá automáticamente reportes de cobertura a Codecov
- No requiere configuración adicional si tu repo es público

## 🚀 Cómo usar el Pipeline

### Ejecución Automática:
```bash
# Hacer cambios
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

El pipeline se ejecutará automáticamente.

### Ver Resultados:
1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **Actions**
3. Selecciona el workflow run más reciente
4. Verás todos los jobs y sus estados

## 📊 Badges de Estado

Puedes agregar estos badges al README.md:

```markdown
![CI/CD Pipeline](https://github.com/SebastianGallegoC/proyecto-caso-testigo-VelascoContreras/workflows/CI%2FCD%20Pipeline%20-%20Calculadora%20Django%20%2B%20Vue.js/badge.svg)

![Backend Tests](https://github.com/SebastianGallegoC/proyecto-caso-testigo-VelascoContreras/workflows/Backend%20Tests/badge.svg)

![Frontend Tests](https://github.com/SebastianGallegoC/proyecto-caso-testigo-VelascoContreras/workflows/Frontend%20Tests/badge.svg)
```

## 🔧 Personalización

### Modificar el pipeline:

Edita el archivo `.github/workflows/ci-cd.yml` para:

- Agregar más tests
- Cambiar versiones de Python/Node
- Habilitar deployment real
- Agregar notificaciones (Slack, Discord, email)

### Ejemplo: Agregar Slack Notifications

```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

## 📈 Mejoras Futuras

- [ ] Deployment automático a Heroku/AWS/Azure
- [ ] Notificaciones por Slack/Discord
- [ ] Análisis de código con SonarQube
- [ ] Tests E2E con Playwright/Cypress
- [ ] Performance testing
- [ ] Automatic versioning y releases
- [ ] Multi-environment deployments (dev, staging, prod)

## 🐛 Troubleshooting

### Tests fallan en CI pero pasan localmente:
- Verifica que todas las dependencias estén en `requirements.txt` y `package.json`
- Revisa las versiones de Python y Node.js
- Comprueba variables de entorno

### Docker build falla:
- Verifica que los Dockerfiles estén correctos
- Comprueba que docker-compose.yml esté válido
- Revisa los logs del job en GitHub Actions

### Security scan reporta vulnerabilidades:
- Actualiza dependencias con `pip install --upgrade` y `npm update`
- Revisa el reporte de Trivy para detalles
- Considera usar `dependabot` para actualizaciones automáticas

## 📚 Recursos

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub](https://hub.docker.com/)
- [Codecov](https://codecov.io/)
- [Trivy Security Scanner](https://github.com/aquasecurity/trivy)

## ✅ Checklist Pre-Deployment

Antes de hacer push a `main`:

- [ ] Todos los tests pasan localmente
- [ ] Código formateado correctamente
- [ ] Sin vulnerabilidades críticas
- [ ] Documentación actualizada
- [ ] Variables de entorno configuradas
- [ ] Secrets configurados en GitHub (si es necesario)

---

**Última actualización:** 19 de noviembre de 2025
