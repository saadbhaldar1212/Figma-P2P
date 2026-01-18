"""FastAPI application for pixel-percent conversion service.

This module implements a production-grade FastAPI application with
rate limiting, file-based logging, and comprehensive error handling.
"""

import uvicorn

from fastapi import FastAPI, HTTPException, Request
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from helpers.helper_functions import percent_to_pixel, pixel_to_percent
from models.model import (
    ConversionResponse,
    PercentToPixelRequest,
    PixelToPercentRequest,
)
from settings.logger_setup import setup_logger
from settings.setting import settings

# Configure Logging
logger = setup_logger()

# Initialize FastAPI App
app = FastAPI(
    title=settings.API_TITLE, version=settings.API_VERSION, debug=settings.DEBUG
)

# Rate Limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

# Add Rate Limiting Middleware
app.add_middleware(SlowAPIMiddleware)

# Exception Handler for Rate Limiting
app.add_exception_handler(
    RateLimitExceeded,
    lambda request, exc: HTTPException(status_code=429, detail="Rate limit exceeded"),
)


@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint.

    Returns:
        Dictionary with health status.
    """
    return {"status": "healthy"}


@app.post("/pixel_to_percent", response_model=ConversionResponse)
@limiter.limit(f"{settings.RATE_LIMIT_REQUESTS}/minute")
async def convert_pixel_to_percent(
    request: Request,
    request_data: PixelToPercentRequest,
) -> ConversionResponse:
    """Convert pixel value to percentage.

    Args:
        request: Request containing pixel and font_size values.

    Returns:
        ConversionResponse with calculated percentage and input parameters.

    Raises:
        HTTPException: If conversion fails.
    """
    try:
        result = pixel_to_percent(request_data.pixel, request_data.font_size)
        logger.info(
            "Pixel to Percent conversion: pixel=%s, font_size=%s, result=%s",
            request_data.pixel,
            request_data.font_size,
            result,
        )

        return ConversionResponse(
            result=result,
            input_params={
                "pixel": request_data.pixel,
                "font_size": request_data.font_size,
            },
        )
    except Exception as e:
        logger.error("Error in pixel_to_percent conversion: %s", str(e))
        raise HTTPException(status_code=500, detail="Conversion failed") from e


@app.post("/percent_to_pixel", response_model=ConversionResponse)
@limiter.limit(f"{settings.RATE_LIMIT_REQUESTS}/minute")
async def convert_percent_to_pixel(
    request: Request,
    request_data: PercentToPixelRequest,
) -> ConversionResponse:
    """Convert percentage value to pixels.

    Args:
        request: Request containing percent and font_size values.

    Returns:
        ConversionResponse with calculated pixel and input parameters.

    Raises:
        HTTPException: If conversion fails.
    """
    try:
        result = percent_to_pixel(request_data.percent, request_data.font_size)
        logger.info(
            "Percent to Pixel conversion: percent=%s, font_size=%s, result=%s",
            request_data.percent,
            request_data.font_size,
            result,
        )

        return ConversionResponse(
            result=result,
            input_params={
                "percent": request_data.percent,
                "font_size": request_data.font_size,
            },
        )
    except Exception as e:
        logger.error("Error in percent_to_pixel conversion: %s", str(e))
        raise HTTPException(status_code=500, detail="Conversion failed") from e


if __name__ == "__main__":
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
