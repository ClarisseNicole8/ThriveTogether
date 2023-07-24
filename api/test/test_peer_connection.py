from fastapi.testclient import TestClient
from main import app
from peers.queries.peers import PeerQueries

client = TestClient(app)


class EmptyPeerConnectionsQueries:
    def get_peerConnection(self, user_id: int):
        return {
            "peerConnections": [
                {
                    "sender": 2,
                    "recipient": 1,
                    "status": "Reject",
                    "has_messaged": "this is message",
                    "sender_name": "jack",
                    "recipient_name": "tom"
                }
            ]
        }


def test_get_peerConnection():
    app.dependency_overrides[PeerQueries] = EmptyPeerConnectionsQueries
    response = client.get("/api/peer_connections/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "peerConnections": [
            {
                "sender": 2,
                "recipient": 1,
                "status": "Reject",
                "has_messaged": "this is message",
                "sender_name": "jack",
                "recipient_name": "tom"
            }
        ]
    }
