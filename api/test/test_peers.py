from fastapi.testclient import TestClient
from main import app
from peers.queries.peers import PeerQueries

client = TestClient(app)


class EmptyPeerQueries:
    def get_peers(self, user_id: int):
        return [
            {
                "user_id": 1,
                "peer_id": 2,
                "peer_name": "Barbie",
                "profile_link": "string",
                "tags_id": 1,
                "profile_image": "string",
                "status": 0,
            }
        ]


def test_get_peers():
    app.dependency_overrides[PeerQueries] = EmptyPeerQueries
    response = client.get("/api/peers/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == [
        {
            "user_id": 1,
            "peer_id": 2,
            "peer_name": "Barbie",
            "profile_link": "string",
            "tags_id": 1,
            "profile_image": "string",
            "status": 0,
        }
    ]
