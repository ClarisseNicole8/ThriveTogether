from fastapi.testclient import TestClient
from main import app
from matching.queries.matching import MatchQueries

client = TestClient(app)


class EmptyMatchQueries:
    def get_matches(self):
        return []


# # Currently nonfunctional:
# # endpoint is protected and I'm not sure how to test for that.
# def test_get_matches():
#     app.dependency_overrides[MatchQueries] = EmptyMatchQueries

#     response = client.get("/api/matches")

#     app.dependency_overrides = {}

#     assert response.status_code == 200
#     assert response.json() == {"matches": []}
