import os
from pathlib import Path

import pytest
import requests
from dotenv import load_dotenv

# Contact + root endpoint API regression tests
load_dotenv(Path("/app/frontend/.env"))
BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")

if not BASE_URL:
    raise RuntimeError("REACT_APP_BACKEND_URL is required for public endpoint testing")


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


def test_api_root_returns_hello_world(api_client):
    response = api_client.get(f"{BASE_URL.rstrip('/')}/api/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Hello World"


def test_contact_requires_email_or_phone(api_client):
    payload = {
        "name": "TEST_Missing Contact Method",
        "message": "Need quote",
    }

    response = api_client.post(f"{BASE_URL.rstrip('/')}/api/contact", json=payload)
    assert response.status_code == 422

    detail = response.json().get("detail", [])
    serialized = str(detail)
    assert "email or phone" in serialized.lower()


def test_contact_returns_smtp_config_error_when_credentials_missing(api_client):
    payload = {
        "name": "TEST_SMTP Config Check",
        "phone": "+919876543210",
        "message": "Need site visit",
    }

    response = api_client.post(f"{BASE_URL.rstrip('/')}/api/contact", json=payload)
    assert response.status_code == 500

    data = response.json()
    assert "detail" in data
    assert "SMTP_EMAIL and SMTP_APP_PASSWORD are required" in data["detail"]
