# Plan: Frontend React + Vite + Tailwind — JWT Demo

## Stack
- React + Vite (TypeScript)
- Tailwind CSS v3
- React Router v6
- fetch nativo (sin axios)

## Backend endpoints consumidos
| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /health | Health check |
| POST | /auth/token | Login → access_token + refresh_token |
| POST | /auth/refresh | Renovar tokens |

## Estructura de carpetas

```
frontend/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  tsconfig.node.json
  tailwind.config.js
  postcss.config.js
  README.md
  src/
    main.tsx
    App.tsx
    index.css
    api/
      auth.ts
    hooks/
      useAuth.ts
    pages/
      LoginPage.tsx
      DashboardPage.tsx
    components/
      ProtectedRoute.tsx
      TokenStatus.tsx
```

## Fases de implementación

### Fase 0 — Plan en el proyecto
- [x] Crear `PLAN.md` en la raíz del workspace

### Fase 1 — Scaffolding
- [ ] `frontend/package.json` — deps: react, react-dom, react-router-dom, tailwindcss, postcss, autoprefixer, vite, @vitejs/plugin-react, typescript, @types/react, @types/react-dom
- [ ] `frontend/vite.config.ts`
- [ ] `frontend/tsconfig.json`
- [ ] `frontend/tsconfig.node.json`
- [ ] `frontend/tailwind.config.js`
- [ ] `frontend/postcss.config.js`
- [ ] `frontend/index.html`
- [ ] `frontend/src/index.css`

### Fase 2 — Capa API y lógica de auth
- [ ] `frontend/src/api/auth.ts` — funciones login(), refreshToken(), healthCheck()
- [ ] `frontend/src/hooks/useAuth.ts` — localStorage, countdown, auto-refresh 30s antes de expirar, logout

### Fase 3 — Componentes y páginas
- [ ] `frontend/src/components/ProtectedRoute.tsx` — redirige a /login si no hay token
- [ ] `frontend/src/components/TokenStatus.tsx` — barra visual + segundos restantes
- [ ] `frontend/src/pages/LoginPage.tsx` — formulario + manejo de errores
- [ ] `frontend/src/pages/DashboardPage.tsx` — usuario, TokenStatus, /health status, logout

### Fase 4 — Entrypoints
- [ ] `frontend/src/App.tsx` — React Router con rutas /login y /dashboard
- [ ] `frontend/src/main.tsx` — monta App en #root

### Fase 5 — Documentación
- [ ] `frontend/README.md` — instrucciones de instalación y ejecución con el backend

## Verificación esperada
1. `npm install` sin errores
2. `npm run dev` levanta en http://localhost:5173
3. Login con `admin` / `admin123` redirige al dashboard
4. Dashboard muestra countdown regresivo desde 300s
5. A los ~270s el token se auto-refresca silenciosamente
6. Logout limpia localStorage y redirige a /login
7. Navegar a /dashboard sin token redirige a /login

## Decisiones técnicas
- Tokens en `localStorage` (válido para demo, no producción)
- Sin Redux ni Zustand — Context + hook es suficiente
- CORS: FastAPI en dev permite `*` por defecto, no requiere cambio en backend
- Backend corre en `http://localhost:8000`, frontend en `http://localhost:5173`
