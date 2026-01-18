"""Logger configuration and initialization.

This module sets up file-based logging with rotation support
for the FastAPI application.
"""

import logging
import logging.handlers

from settings.setting import settings


def setup_logger() -> logging.Logger:
    """Initialize and configure application logger.

    Returns:
        Configured logger instance with file rotation handler.
    """
    logger = logging.getLogger(__name__)
    logger.setLevel(getattr(logging, settings.LOG_LEVEL))

    file_handler = logging.handlers.RotatingFileHandler(
        settings.LOG_FILE_PATH, maxBytes=10485760, backupCount=5
    )
    formatter = logging.Formatter(settings.LOG_FORMAT)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger
