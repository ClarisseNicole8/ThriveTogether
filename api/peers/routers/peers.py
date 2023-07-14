from typing import List
from fastapi import APIRouter, Depends, Response

from ..models import Peer

from ..queries.peers import PeerQueries

router = APIRouter()


@router.get("/api/peers", response_model=List[Peer])
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
        peers.append(peer)
    return peers


@router.get("/api/peers/{user_id}", response_model=List[Peer])
def get_peers_pending(
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
        peers.append(peer)
    return peers
