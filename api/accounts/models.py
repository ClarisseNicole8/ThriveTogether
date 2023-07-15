from pydantic import BaseModel


class AccountIn(BaseModel):
    username: str
    password: str
    name: str
    age: int
    gender: str
    pronouns: str
    email: str


class AccountOut(BaseModel):
    id: int
    username: str
    name: str
    age: int
    gender: str
    pronouns: str
    email: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountUpdate(AccountOut):
    profile_image: str
    banner_image: str
    about_me: str
    my_story: str
    preferences: str
