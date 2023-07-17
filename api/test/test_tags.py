from fastapi.testclient import TestClient
from main import app
from tags.queries.tags import TagQueries
from tags.models import TagsOut

client = TestClient(app)


class EmptyTagQueries:
    def get_user_tags(self):
        return TagsOut

    def get_all_tags(self):
        return {"tags": []}


def test_get_all_tags():
    app.dependency_overrides[TagQueries] = EmptyTagQueries

    response = client.get("/api/tags")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"tags": []}
