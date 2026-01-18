# Figma P2P - Pixel to Percent Converter

## Overview

Figma P2P is a **FastAPI-based web service** that provides high-performance pixel-to-percent (and percent-to-pixel) conversion functionality. It's designed for design tools and applications that need to convert between pixel values and percentage values based on font size references.

This application includes **rate limiting**, **comprehensive logging**, and **production-grade error handling** to ensure reliability and security.

---

## Features

- **Pixel to Percent Conversion**: Convert pixel values to percentages based on font size
- **Percent to Pixel Conversion**: Convert percentage values to pixels based on font size
- **Rate Limiting**: Built-in rate limiting to prevent abuse (15 requests per minute by default)
- **Logging**: File-based logging for monitoring and debugging
- **Health Check**: Endpoint to verify the API is running
- **Production-Ready**: FastAPI + Uvicorn with proper error handling

---

## Project Structure

```
Figma-P2P/
├── main.py                    # Main FastAPI application entry point
├── requirements.txt           # Python dependencies
├── README.md                  # This file
├── helpers/
│   ├── __init__.py
│   └── helper_functions.py   # Core conversion functions
├── models/
│   ├── __init__.py
│   └── model.py              # Pydantic request/response models
└── settings/
    ├── __init__.py
    ├── setting.py            # Configuration management
    ├── logger_setup.py        # Logging configuration
    └── local_logs.log         # Application log file (generated)
```

### Directory Breakdown

| Directory | Purpose |
|-----------|---------|
| `helpers/` | Contains utility functions for pixel-percent conversions |
| `models/` | Defines Pydantic models for API request/response validation |
| `settings/` | Stores configuration, settings, and logging setup |
| `main.py` | FastAPI application with all API endpoints |

---

## Installation & Setup

### Prerequisites

- Python 3.8 or higher
- Git
- pip (Python package manager)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Figma-P2P.git
cd Figma-P2P
```

### Step 2: Create a Virtual Environment (Optional but Recommended)

**On Windows (PowerShell/CMD):**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- **fastapi**: Modern web framework for building APIs
- **uvicorn**: ASGI server to run the FastAPI application
- **slowapi**: Rate limiting library
- **python-multipart**: Multipart form data support

### Step 4: Run the Application

```bash
python main.py
```

The server will start on `http://localhost:8000`

**Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

---

## Using the API

### Health Check Endpoint
Check if the API is running:

```bash
curl http://localhost:8000/health
```

**Response:**
```json
{"status": "healthy"}
```

### Pixel to Percent Conversion

Convert a pixel value to percentage:

```bash
curl -X POST "http://localhost:8000/pixel-to-percent" \
  -H "Content-Type: application/json" \
  -d '{"pixel": 24, "font_size": 16}'
```

**Response:**
```json
{
  "result": 150.0,
  "input_params": {
    "pixel": 24,
    "font_size": 16
  }
}
```

### Percent to Pixel Conversion

Convert a percentage value to pixels:

```bash
curl -X POST "http://localhost:8000/percent-to-pixel" \
  -H "Content-Type: application/json" \
  -d '{"percent": 150, "font_size": 16}'
```

**Response:**
```json
{
  "result": 24.0,
  "input_params": {
    "percent": 150,
    "font_size": 16
  }
}
```

---

## Configuration

Configuration is managed in `settings/setting.py`. You can customize the application by setting environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `DEBUG` | `False` | Enable debug mode |
| `LOG_LEVEL` | `INFO` | Logging level (INFO, DEBUG, ERROR, WARNING) |
| `RATE_LIMIT_REQUESTS` | `15` | Requests allowed per minute |
| `HOST` | `0.0.0.0` | Server host address |
| `PORT` | `8000` | Server port |

**Example: Run with custom port**
```bash
set PORT=8080 && python main.py
```

---

## Logging

All API requests and errors are logged to `settings/local_logs.log`. The log file includes:
- Timestamp
- Logger name
- Log level (INFO, ERROR, WARNING, DEBUG)
- Message content

Example log entry:
```
2026-01-19 14:30:45,123 - uvicorn.access - INFO - "POST /pixel-to-percent HTTP/1.1" 200
```

---

## Rate Limiting

The API enforces rate limiting to prevent abuse:
- **Default**: 15 requests per 60 seconds per IP address
- **Response when exceeded**: HTTP 429 (Too Many Requests)

---

## API Documentation

Once the application is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## Conversion Formulas

The application uses these formulas for conversions:

**Pixel to Percent:**
```
Percent = (Pixel / Font Size) × 100
```

**Percent to Pixel:**
```
Pixel = (Percent / 100) × Font Size
```

---

## Troubleshooting

### Port Already in Use
If port 8000 is already in use:
```bash
set PORT=8080 && python main.py
```

### Module Not Found Error
Ensure all dependencies are installed:
```bash
pip install -r requirements.txt
```

### Virtual Environment Issues
Recreate the virtual environment:
```bash
rm -r venv
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

---

## Development

### Running Tests
Tests can be added to the project. To run them:
```bash
pip install pytest
pytest
```

### Code Structure

- **main.py**: Contains FastAPI app instance, routes, and rate limiting setup
- **helpers/helper_functions.py**: Core conversion logic
- **models/model.py**: Request/Response Pydantic models for validation
- **settings/**: Configuration and logging setup

---

## License

This project is open source and available under the MIT License.

---

## Support

For issues, questions, or contributions, please open an issue or pull request on the GitHub repository.

Happy converting! 🎨
