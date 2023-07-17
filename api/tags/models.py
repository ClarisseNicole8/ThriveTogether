from pydantic import BaseModel


class HttpError(BaseModel):
    detail: str


class TagsOut(BaseModel):
    tags: list[str]


class AllTagsOut(BaseModel):
    tags: list[dict]
