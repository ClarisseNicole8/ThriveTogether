from fastapi.testclient import TestClient
from main import app
client = TestClient(app)


def test_get_peerConnection():
    response = client.get("/api/peer_connections/100/")
    assert response.status_code == 200
    assert response.json() == {"peerConnections": []}
