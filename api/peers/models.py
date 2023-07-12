from pydantic import BaseModel


class Peer(BaseModel):
    id: int
    username: str
    name: str
    age: int
    gender: str
    pronouns: str
    email: str
