"""Pydantic models for request and response validation.

This module defines all data models used for API request validation
and response serialization.
"""

from pydantic import BaseModel, Field


class PixelToPercentRequest(BaseModel):
    """Request model for pixel to percent conversion.

    Attributes:
        pixel: Pixel value (must be greater than 0).
        font_size: Font size value (must be greater than 0).
    """

    pixel: float = Field(..., gt=0, description="Pixel value must be greater than 0")
    font_size: float = Field(..., gt=0, description="Font size must be greater than 0")


class PercentToPixelRequest(BaseModel):
    """Request model for percent to pixel conversion.

    Attributes:
        percent: Percent value (must be non-negative).
        font_size: Font size value (must be greater than 0).
    """

    percent: float = Field(..., ge=0, description="Percent value must be non-negative")
    font_size: float = Field(..., gt=0, description="Font size must be greater than 0")


class ConversionResponse(BaseModel):
    """Response model for conversion endpoints.

    Attributes:
        result: The calculated conversion result.
        input_params: Dictionary of input parameters used in conversion.
    """

    result: float = Field(..., description="Conversion result")
    input_params: dict = Field(..., description="Input parameters used for conversion")
