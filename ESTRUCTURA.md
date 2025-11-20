# Estructura del Proyecto - Calculadora Django

```
calculadora_django/
│
├── 📁 calculadora/                    # Aplicación Django de la calculadora
│   ├── 📁 templates/
│   │   └── 📁 calculadora/
│   │       └── 📄 index.html          # Frontend (HTML/CSS/JS)
│   ├── 📄 __init__.py
│   ├── 📄 admin.py                    # Configuración del admin de Django
│   ├── 📄 apps.py                     # Configuración de la app
│   ├── 📄 models.py                   # Modelos (vacío por ahora)
│   ├── 📄 tests.py                    # Tests unitarios
│   ├── 📄 urls.py 
    |                    # URLs de la app
│   └── 📄 views.py                    # Vistas (lógica del backend)
│
├── 📁 calculadora_project/            # Configuración del proyecto Django
│   ├── 📄 __init__.py
│   ├── 📄 asgi.py                     # Configuración ASGI
│   ├── 📄 settings.py                 # Configuración principal
│   ├── 📄 urls.py                     # URLs principales
│   └── 📄 wsgi.py                     # Configuración WSGI
│
├── 📄 .dockerignore                   # Archivos ignorados por Docker
├── 📄 Dockerfile                      # Configuración de la imagen Docker
├── 📄 docker-compose.yml              # Orquestación de contenedores
├── 📄 manage.py                       # Script de gestión de Django
├── 📄 requirements.txt                # Dependencias de Python
│
├── 📄 iniciar.bat                     # Script de inicio para Windows
├── 📄 iniciar.sh                      # Script de inicio para Linux/Mac
├── 📄 detener.bat                     # Script para detener contenedores
│
├── 📄 README.md                       # Documentación principal
├── 📄 INSTALACION.md                  # Guía de instalación y verificación
└── 📄 test_calculadora.py             # Script de pruebas básicas
```

## 📋 Descripción de Archivos Clave

### Backend (Django)

#### `calculadora/views.py`
- Contiene la lógica del backend
- Funciones principales:
  - `index()`: Renderiza la página principal
  - `calcular()`: Procesa operaciones matemáticas (POST JSON)

#### `calculadora/urls.py`
- Define las rutas de la aplicación:
  - `/` → Vista principal
  - `/calcular/` → API endpoint para operaciones

#### `calculadora_project/settings.py`
- Configuración del proyecto Django
- Apps instaladas, middleware, base de datos, etc.

### Frontend

#### `calculadora/templates/calculadora/index.html`
- Interfaz completa de usuario (HTML + CSS + JavaScript)
- Características:
  - Diseño responsive con gradientes
  - 4 operaciones básicas (suma, resta, multiplicación, división)
  - Historial de operaciones (últimas 10)
  - Validación de errores
  - Comunicación con backend vía Fetch API

### Docker

#### `Dockerfile`
- Imagen base: Python 3.11-slim
- Instala dependencias del sistema y Python
- Configura Gunicorn como servidor
- Expone puerto 8000

#### `docker-compose.yml`
- Servicio web en puerto 8000
- Monta volumen para desarrollo
- Variables de entorno
- Configuración de reinicio automático

#### `.dockerignore`
- Excluye archivos innecesarios de la imagen Docker
- Reduce tamaño de la imagen

### Dependencias

#### `requirements.txt`
```
Django==4.2.9      # Framework web
gunicorn==21.2.0   # Servidor WSGI para producción
```

### Scripts de Ayuda

#### `iniciar.bat` / `iniciar.sh`
- Verifica instalación de Docker
- Construye la imagen
- Ejecuta el contenedor
- Muestra instrucciones

#### `detener.bat`
- Detiene los contenedores de forma segura

### Documentación

#### `README.md`
- Descripción general del proyecto
- Características principales
- Instrucciones de instalación
- Comandos útiles
- Estructura del proyecto
- Tecnologías utilizadas

#### `INSTALACION.md`
- Guía detallada de instalación
- Verificación de requisitos
- Solución de problemas
- Checklist de verificación

## 🔄 Flujo de la Aplicación

### 1. Usuario accede a http://localhost:8000
```
Navegador → Docker Container → Gunicorn → Django → views.index() → index.html
```

### 2. Usuario realiza una operación
```
Frontend (JavaScript) 
    ↓ [POST /calcular/]
Backend (views.calcular())
    ↓ [Procesa operación]
Response (JSON)
    ↓
Frontend (Actualiza UI + Historial)
```

## 🎨 Componentes del Frontend

### HTML
- Formulario con dos inputs numéricos
- 4 botones de operación
- Área de resultado
- Sección de historial

### CSS
- Diseño con gradientes modernos
- Responsive design
- Animaciones suaves
- Colores diferenciados por operación

### JavaScript
- Función `calcular(operacion)`: Envía petición al backend
- Función `mostrarResultado()`: Muestra el resultado
- Función `mostrarError()`: Maneja errores
- Función `agregarAlHistorial()`: Agrega operación al historial
- Función `limpiarHistorial()`: Limpia el historial

## 🔐 Seguridad

- CSRF token en formularios (Django)
- Validación de entrada en backend
- Manejo de errores (división por cero)
- Variables de entorno para configuración

## 📊 Base de Datos

- SQLite por defecto (db.sqlite3)
- No se requieren modelos para esta aplicación
- Las operaciones no se persisten (solo en memoria del navegador)

## 🚀 Despliegue

### Desarrollo (actual)
- Docker Compose
- Debug mode activado
- Servidor de desarrollo de Django/Gunicorn

### Producción (recomendado)
- Cambiar `DEBUG = False`
- Usar base de datos robusta (PostgreSQL)
- Configurar NGINX como reverse proxy
- Usar variables de entorno para secretos
- Implementar HTTPS
- Configurar ALLOWED_HOSTS

## 🧪 Testing

### Manual
- Acceder a http://localhost:8000
- Probar cada operación
- Verificar historial
- Verificar manejo de errores

### Automatizado
- `test_calculadora.py`: Pruebas unitarias básicas
- Ejecutar con: `python test_calculadora.py`

### API Testing
```bash
curl -X POST http://localhost:8000/calcular/ \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5, "operacion": "sumar"}'
```

## 📈 Posibles Mejoras

1. **Operaciones adicionales**: potencia, raíz cuadrada, porcentaje
2. **Persistencia**: Guardar historial en base de datos
3. **Autenticación**: Login de usuarios
4. **Tests**: Ampliar cobertura de tests
5. **CI/CD**: Configurar pipeline de despliegue
6. **API REST**: Usar Django REST Framework
7. **Frontend**: Migrar a React/Vue.js
8. **Temas**: Modo oscuro/claro
9. **Internacionalización**: Múltiples idiomas
10. **PWA**: Convertir en Progressive Web App

## 🎯 Tecnologías y Versiones

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Python | 3.11 | Lenguaje base |
| Django | 4.2.9 | Framework web |
| Gunicorn | 21.2.0 | Servidor WSGI |
| Docker | Latest | Containerización |
| HTML5 | - | Estructura |
| CSS3 | - | Estilos |
| JavaScript | ES6+ | Interactividad |
| SQLite | 3 | Base de datos |

## 📞 Contacto y Soporte

Para problemas o preguntas:
1. Revisa los logs: `docker compose logs -f`
2. Consulta INSTALACION.md
3. Verifica la documentación de Django
4. Revisa la documentación de Docker
