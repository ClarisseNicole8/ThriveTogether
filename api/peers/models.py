from pydantic import BaseModel


class PeerConnection(BaseModel):
    sender: int
    recipient: int
    status: str
    has_messaged: str
    sender_name: str
    recipient_name: str


class Peer(BaseModel):
    user_id: int
    peer_id: int
    peer_name: str
    profile_link: str
    tags_id: int
    profile_image: str
    status: int


class User(BaseModel):
    id: int
    username: str
    name: str
    age: int
    gender: str
    pronouns: str
    email: str


class PeerConnections(BaseModel):
    peerConnections: list[PeerConnection]
