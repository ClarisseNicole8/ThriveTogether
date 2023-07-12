from fastapi import APIRouter, Depends, Response
from typing import List


from .. queries.messages import MessageQueries
from .. models import MessageOut, MessageIn

messages_router = APIRouter()

# router is where your api calls gets called from the frontend
# this is where queries exist that interact with the db
@messages_router.get("/api/messages/{user_id}", response_model=List[MessageOut])
def get_messages(
    user_id: int,
    response: Response,
    queries: MessageQueries = Depends(),
):
    print("this is user_id", user_id)
    records = queries.get_messages(user_id)

    print("this is what record looks like", records)
    if records is None:
        response.status_code = 404
        return []

    messages_out = []
    for record in records:
        message_out = MessageOut(
            id=record["id"],
            recipient=record["recipient"],
            sender=record["sender"],
            content=record["content"],
            date=record["date"],
            is_read=record["is_read"],
        )
        messages_out.append(message_out)
    return messages_out

@messages_router.post("/api/messages/create/", response_model=MessageOut)
def create_message(
    message_in: MessageIn,
    response: Response,
    queries: MessageQueries = Depends()
    ):

    record = queries.create_message(message_in)
    if record is None:
        response.status_code = 404
        return []

    message_out = MessageOut(
            id=record["id"],
            recipient=record["recipient"],
            sender=record["sender"],
            content=record["content"],
            date=record["date"],
            is_read=record["is_read"],
    )

    return message_out
