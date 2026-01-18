"""Helper functions for pixel and percent conversions.

This module provides utility functions to convert between pixel
and percent values based on font size.
"""


def pixel_to_percent(pixel: float, font_size: float) -> float:
    """Convert pixel value to percentage.

    Formula: Percent = (Pixel / font_size) * 100

    Args:
        pixel: Pixel value to convert (must be positive).
        font_size: Font size reference value (must be positive).

    Returns:
        The calculated percentage value.
    """
    return (pixel / font_size) * 100


def percent_to_pixel(percent: float, font_size: float) -> float:
    """Convert percentage value to pixels.

    Formula: Pixel = (Percent / 100) * font_size

    Args:
        percent: Percentage value to convert (must be non-negative).
        font_size: Font size reference value (must be positive).

    Returns:
        The calculated pixel value.
    """
    return (percent / 100) * font_size
