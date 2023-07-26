from fastapi.testclient import TestClient
from main import app
from peers.routers.peers import PeerConnectionQueries
client = TestClient(app)


class EmptyPeerQueries:
    def get_peer_connection(self, user_id: int):
        return [
                    {
                        "sender": 0,
                        "recipient": 0,
                        "status": "string",
                        "has_messaged": "string",
                        "sender_name": "string",
                        "recipient_name": "string"
                    }
                ]


def test_get_peer_connection():
    app.dependency_overrides[PeerConnectionQueries] = EmptyPeerQueries
    response = client.get("/api/peer_connections/1/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
                "peerConnections": [
                    {
                        "sender": 0,
                        "recipient": 0,
                        "status": "string",
                        "has_messaged": "string",
                        "sender_name": "string",
                        "recipient_name": "string"
                    }
                ]
    }
