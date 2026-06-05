# Frontend — FastAPI JWT Demo

Aplicación React con Vite y Tailwind CSS que consume la API de autenticación JWT del backend.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- React Router 6

## Requisitos

- Node.js 18+
- Backend corriendo en `http://localhost:8000`

## Instalación y ejecución

```bash
cd frontend
npm install
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

## Ejecutar con el backend

### 1) Levantar el backend (desde la carpeta `backend/`)

```bash
cd backend
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

O con Docker Compose:

```bash
cd backend
docker compose up --build
```

### 2) Levantar el frontend (desde la carpeta `frontend/`)

```bash
cd frontend
npm install
npm run dev
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/login` | Formulario de inicio de sesión |
| `/dashboard` | Panel protegido (requiere token válido) |
| `/*` | Redirige a `/login` |

## Flujo de autenticación

1. El usuario ingresa `admin` / `admin123` en el formulario de login.
2. Se llama a `POST /auth/token` y se almacenan `access_token`, `refresh_token` y el tiempo de expiración en `localStorage`.
3. El dashboard muestra una barra regresiva del tiempo restante del access token (300 s).
4. **30 segundos antes de que expire**, se hace un `POST /auth/refresh` automático y transparente.
5. Al cerrar sesión se limpian todos los tokens del `localStorage`.
6. Si el token expira o es inválido, el usuario es redirigido a `/login`.

## Estructura

```
frontend/
  src/
    api/
      auth.ts          # Llamadas al backend (login, refresh, health)
    hooks/
      useAuth.ts       # Context + lógica de tokens y countdown
    components/
      ProtectedRoute.tsx   # Guarda rutas privadas
      TokenStatus.tsx      # Barra visual del countdown
    pages/
      LoginPage.tsx    # Formulario de login
      DashboardPage.tsx    # Panel protegido
    App.tsx            # Router principal
    main.tsx           # Punto de entrada
```

## Notas

- Los tokens se guardan en `localStorage` (válido para demo, no recomendado en producción).
- El backend debe estar en `http://localhost:8000`. Para cambiarlo, editar `src/api/auth.ts`.
