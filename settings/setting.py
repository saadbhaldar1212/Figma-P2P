"""Application settings and configuration management.

This module contains the Settings class which manages all application
configuration parameters with support for environment variables.
"""

import os


class Settings:
    """Application configuration settings.

    Attributes:
        API_TITLE: Title of the FastAPI application.
        API_VERSION: Version of the API.
        DEBUG: Debug mode flag.
        RATE_LIMIT_ENABLED: Whether rate limiting is enabled.
        RATE_LIMIT_REQUESTS: Number of requests allowed per time period.
        RATE_LIMIT_PERIOD: Time period for rate limiting in seconds.
        LOG_FILE_PATH: Path to the log file.
        LOG_LEVEL: Logging level (INFO, DEBUG, ERROR, WARNING).
        LOG_FORMAT: Format string for log messages.
        HOST: Server host address.
        PORT: Server port number.
    """

    # API Settings
    API_TITLE: str = "Pixel to Percent Converter"
    API_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"

    # Rate Limiting
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_REQUESTS: int = int(os.getenv("RATE_LIMIT_REQUESTS", "15"))
    RATE_LIMIT_PERIOD: int = 60

    # Logging
    LOG_FILE_PATH: str = os.path.join(os.path.dirname(__file__), "local_logs.log")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))


settings = Settings()
