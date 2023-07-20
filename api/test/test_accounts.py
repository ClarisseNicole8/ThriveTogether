from fastapi.testclient import TestClient
from main import app
from accounts.queries.accounts import AccountQueries


client = TestClient(app)


class EmptyAccountQueries:
    def get_account_info(self, id: int):
        return {
            "id": 1,
            "username": "testy",
            "name": "Testy Test",
            "age": 18,
            "gender": "test",
            "pronouns": "testing",
            "email": "test@test.com",
            "profile_image": "test@test.com",
            'banner_image': "test@test.com",
            "about_me": "test@test.com",
            "my_story": "test@test.com",
            "preferences": "test"

        }


def test_get_account_info():
    app.dependency_overrides[AccountQueries] = EmptyAccountQueries
    response = client.get("/api/accounts/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
            "id": 1,
            "username": "testy",
            "name": "Testy Test",
            "age": 18,
            "gender": "test",
            "pronouns": "testing",
            "email": "test@test.com",
            "profile_image": "test@test.com",
            'banner_image': "test@test.com",
            "about_me": "test@test.com",
            "my_story": "test@test.com",
            "preferences": "test"

        }
