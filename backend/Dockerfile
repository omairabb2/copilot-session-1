FROM python:3.11-slim

ENV POETRY_VERSION=1.8.3 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

WORKDIR /app

COPY pyproject.toml README.md ./
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --no-root

COPY app ./app

EXPOSE 8000

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
