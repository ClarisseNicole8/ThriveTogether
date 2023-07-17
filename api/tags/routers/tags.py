from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from ..models import TagsOut, HttpError, AllTagsOut
from ..queries.tags import TagQueries
from authenticator import authenticator

router = APIRouter()


@router.get("/api/tags/",
            tags=["Tags"],
            response_model=AllTagsOut | HttpError,
            )
async def get_all_tags(
    response: Response,
    queries: TagQueries = Depends(),
):
    record = queries.get_all_tags()
    if record is None:
        response.status_code = 404
        return {"detail": "Invalid request."}
    else:
        return record


@router.get("/api/tags/{username}",
            tags=["Tags"],
            response_model=TagsOut | HttpError,
            )
async def get_user_tags(
    username: str,
    response: Response,
    queries: TagQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = queries.get_user_tags(username)
    if record is None:
        response.status_code = 404
        return {"detail": "Invalid request."}
    else:
        return record
