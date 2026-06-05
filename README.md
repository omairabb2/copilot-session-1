# FlowOps — Surgical Precision

Aplicación web full-stack con autenticación JWT. El backend está construido con **FastAPI** y el frontend con **React + Vite + Tailwind CSS**, siguiendo el sistema de diseño definido en [`DESIGN.md`](./DESIGN.md).

---

## Estructura del proyecto

```
.
├── DESIGN.md          # Sistema de diseño (FlowOps - Surgical Precision)
├── README.md          # Este archivo
├── backend/           # API REST con FastAPI y JWT
│   ├── app/
│   │   └── main.py
│   ├── pyproject.toml
│   ├── Dockerfile
│   └── docker-compose.yml
└── frontend/          # Aplicación React (login + bienvenida)
    ├── src/
    │   ├── api/           # Llamadas al backend
    │   ├── hooks/         # Contexto de autenticación
    │   ├── components/    # ProtectedRoute, TokenStatus
    │   └── pages/         # LoginPage, DashboardPage (bienvenida)
    ├── index.html
    └── package.json
```

---

## Requisitos

| Herramienta | Versión mínima |
|-------------|---------------|
| Python      | 3.11+         |
| Poetry      | 1.8+          |
| Node.js     | 18+           |
| Docker      | 20+ (opcional)|

---

## Ejecución local

### 1. Backend (FastAPI)

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

El API queda disponible en `http://localhost:8000`.

**Verificar que está corriendo:**

```bash
curl http://localhost:8000/health
# → {"status":"ok"}
```

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

---

## Ejecución con Docker Compose

El backend incluye un `docker-compose.yml`. Desde la carpeta `backend`:

```bash
cd backend
docker compose up --build
```

El API quedará disponible en `http://localhost:8000`. Luego inicia el frontend por separado:

```bash
cd frontend
npm install
npm run dev
```

---

## Flujo de la aplicación

### Página de login (`/login`)

- Formulario con campos **usuario** y **contraseña**.
- Llama a `POST http://localhost:8000/auth/token` con las credenciales.
- Si el login es exitoso, almacena `access_token`, `refresh_token` y el tiempo de expiración en `localStorage`.
- Redirige automáticamente a la página de bienvenida (`/welcome`).
- Si ya hay sesión activa, la página de bienvenida es accesible directamente.

**Credenciales de demo:**

| Campo | Valor |
|-------|-------|
| Usuario | `admin` |
| Contraseña | `admin123` |

### Página de bienvenida (`/welcome`)

- **Protegida**: solo accesible con sesión activa. Sin token válido, se redirige a `/login`.
- Muestra el nombre del usuario autenticado y el estado de la sesión.
- Incluye una barra de progreso con el tiempo restante del access token (300 s).
- **Auto-refresh**: 30 segundos antes de que expire el access token, se llama automáticamente a `POST /auth/refresh` para renovarlo de forma transparente.
- Muestra el estado del backend (`/health`).
- Botón de **cerrar sesión** que limpia el `localStorage` y redirige a `/login`.

---

## Endpoints del backend

| Método | URL | Descripción |
|--------|-----|-------------|
| `GET`  | `/health` | Verificación de salud |
| `POST` | `/auth/token` | Login → devuelve `access_token` + `refresh_token` |
| `POST` | `/auth/refresh` | Renueva los tokens usando el `refresh_token` |

### Ejemplo de login

```bash
curl -X POST http://localhost:8000/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

Respuesta:

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300,
  "refresh_token": "<jwt-refresh>"
}
```

---

## Sistema de diseño

El frontend implementa el sistema de diseño **FlowOps - Surgical Precision** definido en [`DESIGN.md`](./DESIGN.md):

- **Fuente:** Inter (300, 400, 500, 600, 700)
- **Colores principales:** `#111827` (acento), `#FFFFFF` (fondo), `#6B7280` (texto secundario)
- **Radios:** `32px` (cards), `9999px` (botones primarios), `4px` (inputs)
- **Botón primario:** fondo `#111827`, texto `#FFFFFF`, borde redondeado completo
- **Superficies:** estilo Glass con sombras multi-capa y blur
- **Layout:** Grid full-bleed con ritmo base de 4px

---

## Notas de seguridad

- Los tokens se almacenan en `localStorage` (adecuado para demo, no recomendado en producción).
- La clave `JWT_SECRET_KEY` debe cambiarse en producción mediante la variable de entorno del mismo nombre.
- El usuario demo (`admin`) está en memoria; en producción usar una base de datos.
