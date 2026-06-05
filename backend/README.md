# Backend FastAPI JWT

Aplicacion Web API con FastAPI que implementa autenticacion con JWT.

## Caracteristicas

- Endpoint de login que valida `admin` / `admin123`.
- Generacion de access token con expiracion de 300 segundos.
- Endpoint para refrescar token usando refresh token.
- Hashing de passwords con `passlib[bcrypt]`.
- Dependencia `bcrypt` fijada a `>=3.2,<4.0` por compatibilidad con passlib 1.7.x.
- Gestion de dependencias con Poetry (`package-mode = false`).
- Dockerfile y docker-compose para despliegue.

## Estructura

```text
backend/
  app/
    main.py
  pyproject.toml
  Dockerfile
  docker-compose.yml
  README.md
```

## Requisitos

- Python 3.11+
- Poetry 1.8+
- Docker (opcional)

## Ejecucion local con Poetry

1. Ir a la carpeta del backend:

```bash
cd backend
```

2. Instalar dependencias:

```bash
poetry install
```

3. Iniciar la API:

```bash
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

4. Probar healthcheck:

```bash
curl http://localhost:8000/health
```

## Endpoints

### 1) Login y obtencion de token

- Metodo: `POST`
- URL: `http://localhost:8000/auth/token`
- Body JSON:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Respuesta esperada:

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300,
  "refresh_token": "<jwt-refresh>"
}
```

### 2) Refresh token

- Metodo: `POST`
- URL: `http://localhost:8000/auth/refresh`
- Body JSON:

```json
{
  "refresh_token": "<jwt-refresh>"
}
```

Respuesta esperada:

```json
{
  "access_token": "<new-jwt>",
  "token_type": "bearer",
  "expires_in": 300,
  "refresh_token": "<new-jwt-refresh>"
}
```

## Ejecutar con Docker Compose

Desde la carpeta `backend`:

```bash
docker compose up --build
```

La API quedara disponible en `http://localhost:8000`.

## Notas de seguridad

- Cambiar `JWT_SECRET_KEY` en produccion.
- El usuario demo (`admin`) esta en memoria para fines de ejemplo.
- No usar este almacenamiento de usuarios en produccion.
