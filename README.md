# Calculadora Django + Vue.js - Aplicación Full Stack

Aplicación de calculadora básica con arquitectura moderna: **Django REST API** + **Vue.js Frontend**, completamente dockerizada y con cobertura de tests del 100%.

## 🚀 Características

- **Backend Django REST API**: Endpoints RESTful para operaciones matemáticas (suma, resta, multiplicación, división)
- **Frontend Vue.js**: SPA moderna con componentes reutilizables y comunicación asíncrona
- **Arquitectura Desacoplada**: Frontend y backend separados comunicándose vía API
- **Tests Completos**: 33 tests unitarios (10 backend + 23 frontend) - **100% pasados**
- **Dockerizada**: Ambos servicios configurados con Docker Compose
- **Historial de Operaciones**: Mantiene registro de las últimas 10 operaciones
- **Validación de Errores**: Manejo robusto (división por cero, valores inválidos)
- **Responsive**: Diseño adaptable a diferentes dispositivos

## 📐 Arquitectura

```
calculadora_django/
├── calculadora/              # Backend Django
│   ├── views.py             # API REST endpoints
│   ├── tests.py             # 10 tests unitarios backend
│   └── urls.py              # Rutas API
├── frontend/                 # Frontend Vue.js
│   ├── src/
│   │   ├── components/      # Componentes Vue
│   │   ├── services/        # API client (Axios)
│   │   └── tests/           # 23 tests unitarios frontend
│   ├── Dockerfile           # Imagen Docker frontend
│   └── vite.config.js       # Configuración Vite
├── docker-compose.yml        # Orquestación de servicios
├── Dockerfile               # Imagen Docker backend
└── requirements.txt         # Dependencias Python
```

### Flujo de Comunicación

```
Usuario → Vue.js (localhost:5173) → API REST → Django (localhost:8000) → Respuesta JSON
```

## 📋 Requisitos Previos

### Con Docker (Recomendado)
- Docker
- Docker Compose

### Sin Docker
- Python 3.8+
- Node.js 18+
- npm o yarn

## 🛠️ Instalación y Ejecución

### 🐳 Opción 1: Con Docker Compose (Recomendado)

**Windows:**
```bash
ejecutar_docker.bat
```

**Linux/Mac:**
```bash
chmod +x ejecutar_docker.sh
./ejecutar_docker.sh
```

**Manual:**
```bash
docker-compose up --build -d
```

**URLs:**
- Frontend Vue.js: http://localhost:5173
- Backend API: http://localhost:8000
- Endpoint API: http://localhost:8000/api/calcular/

**Detener:**
```bash
docker-compose down
```

### 💻 Opción 2: Sin Docker (Desarrollo Local)

#### Backend Django

1. **Crear entorno virtual:**
   ```bash
   cd calculadora_django
   python -m venv venv
   source venv/Scripts/activate  # Windows
   source venv/bin/activate      # Linux/Mac
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Ejecutar servidor:**
   ```bash
   python manage.py runserver
   ```
   
   API disponible en: http://localhost:8000

#### Frontend Vue.js

1. **Instalar dependencias:**
   ```bash
   cd frontend
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   
   Aplicación disponible en: http://localhost:5173

**Ejecutar Ambos (Script Automático):**
```bash
# Windows
ejecutar_sin_docker.bat

# Linux/Mac
chmod +x ejecutar_sin_docker.sh
./ejecutar_sin_docker.sh
```

## 🎯 Uso

1. Ingresa el primer número en el campo "Primer número"
1. Ingresa el primer número en el campo "Primer número"
2. Ingresa el segundo número en el campo "Segundo número"
3. Haz clic en uno de los botones de operación:
   - ➕ Sumar
   - ➖ Restar
   - ✖️ Multiplicar
   - ➗ Dividir
4. El resultado se mostrará inmediatamente
5. Todas las operaciones se guardan en el historial (últimas 10)
6. Puedes limpiar el historial con el botón "Limpiar Historial"

## 🧪 Testing

### Ejecutar Todos los Tests

**Backend (10 tests):**
```bash
cd calculadora_django
source venv/Scripts/activate
python manage.py test calculadora
```

**Frontend (23 tests):**
```bash
cd frontend
npm test -- --run
```

### Resultados

✅ **33 Tests Totales - 100% Pasados**
- 10 tests backend (Django + DRF)
- 23 tests frontend (Vue.js + Vitest)

Ver detalles completos en: `TESTS_RESUMEN.md`

### Cobertura de Tests

**Backend:**
- Operaciones matemáticas (suma, resta, multiplicación, división)
- Manejo de errores (división por cero, operación inválida)
- Validación de datos (números negativos, decimales, datos faltantes)
- Estructura de respuesta API

**Frontend:**
- Componentes (Display, Input, Botones, Historial)
- Props y eventos
- Renderizado condicional
- Interacciones de usuario

## 📡 API Reference

### Endpoint: Calcular

**URL:** `POST /api/calcular/`

**Request Body:**
```json
{
  "num1": 10,
  "num2": 5,
  "operacion": "sumar"
}
```

**Operaciones válidas:**
- `sumar`
- `restar`
- `multiplicar`
- `dividir`

**Response Success (200):**
```json
{
  "resultado": 15.0
}
```

**Response Error (400):**
```json
{
  "error": "No se puede dividir entre cero"
}
```

## 📁 Estructura del Proyecto

```
calculadora_django/
├── calculadora/                # Backend Django App
│   ├── views.py               # API REST endpoints
│   ├── urls.py                # Rutas API
│   ├── tests.py               # 10 tests unitarios backend
│   └── ...
├── calculadora_project/        # Configuración Django
│   ├── settings.py            # REST Framework, CORS
│   ├── urls.py                # URLs principales
│   └── ...
├── frontend/                   # Frontend Vue.js
│   ├── src/
│   │   ├── components/        # Componentes Vue
│   │   │   ├── Calculadora.vue
│   │   │   ├── Display.vue
│   │   │   ├── Input.vue
│   │   │   ├── Botones.vue
│   │   │   └── Historial.vue
│   │   ├── services/          # API client
│   │   │   └── api.js
│   │   ├── tests/             # 23 tests unitarios
│   │   │   ├── Display.test.js
│   │   │   ├── Input.test.js
│   │   │   ├── Botones.test.js
│   │   │   └── Historial.test.js
│   │   ├── App.vue            # App principal
│   │   └── main.js            # Entry point
│   ├── Dockerfile             # Imagen Docker frontend
│   ├── vite.config.js         # Config Vite + tests
│   ├── package.json           # Dependencias npm
│   └── index.html
├── docker-compose.yml          # Orquestación servicios
├── Dockerfile                  # Imagen Docker backend
├── requirements.txt            # Dependencias Python
├── ejecutar_docker.bat         # Script Docker Windows
├── ejecutar_docker.sh          # Script Docker Linux/Mac
├── ejecutar_sin_docker.bat     # Script sin Docker Windows
├── ejecutar_sin_docker.sh      # Script sin Docker Linux/Mac
├── TESTS_RESUMEN.md           # Detalle completo de tests
├── INSTALACION.md             # Guía de instalación
├── manage.py                   # Django management
└── README.md                   # Este archivo
```

## 🔧 Comandos Útiles

### Docker

**Detener servicios:**
```bash
docker-compose down
```

**Ver logs:**
```bash
docker-compose logs -f
docker-compose logs -f backend   # Solo backend
docker-compose logs -f frontend  # Solo frontend
```

**Reconstruir:**
```bash
docker-compose up --build --force-recreate
```

**Acceder al contenedor:**
```bash
docker exec -it calculadora_django_backend bash
docker exec -it calculadora_vue_frontend sh
```

### Django (Backend)

**Ejecutar migraciones:**
```bash
python manage.py migrate
```

**Crear superusuario:**
```bash
python manage.py createsuperuser
```

**Shell interactivo:**
```bash
python manage.py shell
```

### Vue.js (Frontend)

**Modo desarrollo con watch:**
```bash
npm run dev
```

**Build para producción:**
```bash
npm run build
```

**Preview build producción:**
```bash
npm run preview
```

**Tests en modo watch:**
```bash
npm test
```

## 🌟 Tecnologías Utilizadas

### Backend
- Django 4.2.9
- Django REST Framework 3.14.0
- django-cors-headers 4.3.1
- Gunicorn 21.2.0
- Python 3.13.3

### Frontend
- Vue.js 3.5.24
- Vite 7.2.2
- Axios 1.6.2
- Vitest 1.1.0
- @vue/test-utils 2.4.3

### DevOps
- Docker
- Docker Compose

### Database
- SQLite 3 (development)

## � Despliegue en Producción

### Consideraciones

1. **Cambiar SECRET_KEY** en `settings.py`
2. **Configurar DEBUG=False** en producción
3. **Usar base de datos robusta** (PostgreSQL, MySQL)
4. **Configurar ALLOWED_HOSTS** correctamente
5. **Usar servidor web** (Nginx) para servir frontend
6. **Configurar HTTPS**
7. **Variables de entorno** para configuración sensible

### Variables de Entorno Recomendadas

```bash
# Backend
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgres://user:password@host:5432/dbname

# Frontend
VITE_API_URL=https://api.yourdomain.com
```

## 📝 Notas

- SQLite usado en desarrollo por simplicidad
- CORS configurado para `localhost:5173` (cambiar en producción)
- Frontend usa proxy en desarrollo para evitar CORS
- Historial se mantiene solo en frontend (no persiste)
- Tests configurados con happy-dom para simular DOM

## 🐛 Resolución de Problemas

### Docker no disponible
Usa los scripts `ejecutar_sin_docker.bat/sh` para ejecutar sin Docker.

### Puerto ya en uso
Cambia los puertos en `docker-compose.yml`:
```yaml
ports:
  - "8001:8000"  # Backend en 8001
  - "5174:5173"  # Frontend en 5174
```

### Tests fallan
Verifica que las dependencias estén instaladas:
```bash
# Backend
pip install -r requirements.txt

# Frontend
cd frontend && npm install
```

### CORS errors
Asegúrate de que `CORS_ALLOWED_ORIGINS` en `settings.py` incluya la URL del frontend.

### Ver logs en tiempo real
```bash
docker-compose logs -f
```

## 📚 Documentación Adicional

- **Tests Detallados**: Ver `TESTS_RESUMEN.md`
- **Instalación Paso a Paso**: Ver `INSTALACION.md`
- **Django REST Framework**: https://www.django-rest-framework.org/
- **Vue.js**: https://vuejs.org/
- **Vite**: https://vitejs.dev/
- **Vitest**: https://vitest.dev/

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

Desarrollado como proyecto de demostración de arquitectura full stack moderna.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

