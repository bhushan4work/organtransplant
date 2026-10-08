def test_login_success(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "admin@organtrust.com", "password": "securepassword"}
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Successfully logged in"
    assert "access_token" in response.cookies
    assert "refresh_token" in response.cookies

def test_login_failure(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "admin@organtrust.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401

def test_protected_route(client):
    # First login
    client.post(
        "/api/v1/auth/login",
        json={"email": "admin@organtrust.com", "password": "securepassword"}
    )
    # Then access protected route
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 200
    assert response.json()["email"] == "admin@organtrust.com"
    assert response.json()["role"] == "ADMIN"

def test_refresh_token(client):
    # First login
    client.post(
        "/api/v1/auth/login",
        json={"email": "admin@organtrust.com", "password": "securepassword"}
    )
    old_access_token = client.cookies.get("access_token")
    
    # Refresh
    response = client.post("/api/v1/auth/refresh")
    assert response.status_code == 200
    
    new_access_token = client.cookies.get("access_token")
    assert new_access_token is not None
    assert old_access_token != new_access_token

def test_logout(client):
    # First login
    client.post(
        "/api/v1/auth/login",
        json={"email": "admin@organtrust.com", "password": "securepassword"}
    )
    # Logout
    response = client.post("/api/v1/auth/logout")
    assert response.status_code == 200
    assert "access_token" not in client.cookies or not client.cookies.get("access_token")
    
    # Access protected route should fail
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401
