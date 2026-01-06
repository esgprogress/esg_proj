import time
import logging
from uuid import uuid4
from typing import Callable

from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


class RouterLoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI, *, logger: logging.Logger) -> None:
        super().__init__(app)
        self._logger = logger

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        request_id = str(uuid4())
        start_time = time.perf_counter()

        try:
            response = await call_next(request)
        except Exception as exc:
            duration = time.perf_counter() - start_time
            self._logger.exception(
                {
                    "request_id": request_id,
                    "method": request.method,
                    "path": request.url.path,
                    "status": "failed",
                    "time_taken": f"{duration:.4f}s",
                    "error": str(exc),
                }
            )
            raise

        duration = time.perf_counter() - start_time

        response.headers["X-API-Request-ID"] = request_id

        self._logger.info(
            {
                "request_id": request_id,
                "method": request.method,
                "path": self._path_with_query(request),
                "client_ip": request.client.host if request.client else None,
                "status_code": response.status_code,
                "time_taken": f"{duration:.4f}s",
                "content_type": request.headers.get("content-type"),
                "content_length": request.headers.get("content-length"),
            }
        )

        return response

    @staticmethod
    def _path_with_query(request: Request) -> str:
        if request.url.query:
            return f"{request.url.path}?{request.url.query}"
        return request.url.path
