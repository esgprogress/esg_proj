# backend/migrations.Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY . .

# Env
ENV PYTHONUNBUFFERED=1

# Command: run migrations
CMD ["python", "-m", "migrations.insert_types_and_questions.py"]
