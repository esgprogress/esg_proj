# gunicorn.conf.py

import multiprocessing

# --- Server ---
bind = "127.0.0.1:3001"
backlog = 2048

# --- Workers ---
workers = max(2, multiprocessing.cpu_count() * 2 + 1)
worker_class = "uvicorn.workers.UvicornWorker"
timeout = 120
graceful_timeout = 30
keepalive = 5

# --- Daemon / Background ---
daemon = True
pidfile = "/tmp/gunicorn.pid"

# --- Logging ---
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"
loglevel = "info"

# --- Process naming ---
proc_name = "fastapi-gunicorn"

# --- Security ---
umask = 0o007
