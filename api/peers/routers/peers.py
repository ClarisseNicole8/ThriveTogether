from fastapi import APIRouter, Depends, Response
from typing import List

from ..models import PeerConnection, Peer, User, PeerConnections

from ..queries.peers import PeerConnectionQueries, PeerQueries, UserQueries

router = APIRouter()


@router.post(
    "/api/connections/create/",
    tags=["Peers"],
    response_model=PeerConnection,
)
def create_connection(
    peer_connection: PeerConnection,
    response: Response,
    queries: PeerConnectionQueries = Depends(),
):
    record = queries.create_connection(peer_connection)
    if record is None:
        response.status_code = 404
        return []

    peer_connection = PeerConnection(
        sender=record["sender"],
        recipient=record["recipient"],
        status=record["status"],
        has_messaged=record["has_messaged"],
        sender_name=record["sender_name"],
        recipient_name=record["recipient_name"],
    )

    return peer_connection


@router.get("/api/peers/", tags=["Peers"], response_model=List[Peer])
def get_peers(
    response: Response,
    queries: PeerQueries = Depends(),
):
    records = queries.get_peers()

    if records is None:
        response.status_code = 404
        return []

    peers = []
    for record in records:
        peer = Peer(
            id=record["id"],
            user_id=record["user_id"],
            peer_id=record["peer_id"],
            peer_name=record["peer_name"],
            profile_link=record["profile_link"],
            tags_id=record["tags_id"],
            profile_image=record["profile_image"],
            status=record["status"],
        )
        peers.append(peer)
    return peers


@router.get("/api/users/", tags=["Peers"], response_model=List[User])
def get_users(
    response: Response,
    queries: UserQueries = Depends(),
):
    records = queries.get_users()

    if records is None:
        response.status_code = 404
        return []

    users = []
    for record in records:
        user = User(
            id=record["id"],
            username=record["username"],
            name=record["name"],
            age=record["age"],
            gender=record["gender"],
            pronouns=record["pronouns"],
            profile_link=record["profile_link"],
            profile_image=record["profile_image"],
            banner_image=record["banner_image"],
            email=record["email"],
            about_me=record["about_me"],
            my_story=record["my_story"],
            preferences=record["preferences"],
        )
        users.append(user)
    return users


@router.get("/api/peer_connections/", tags=["Peers"], response_model=PeerConnections)
async def get_peerConnection(
    user_id: int,
    response: Response,
    queries: PeerConnectionQueries = Depends(),
):
    result = {}
    records = queries.get_peer_connection(user_id)
    if records is None:
        response.status_code = 404
        return []
    result['peerConnections'] = records
    return result
