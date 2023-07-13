from fastapi import APIRouter, Depends, Response
from typing import List


from .. queries.messages import MessageQueries
from .. models import MessageOut, MessageIn, MessageGroup

messages_router = APIRouter()

# router is where your api calls gets called from the frontend
# this is where queries exist that interact with the db
@messages_router.get("/api/messages/{user_id}", tags=["Messages"], response_model=List[MessageGroup])
def get_messages(
    user_id: int,
    response: Response,
    queries: MessageQueries = Depends(),
):

    records = queries.get_messages(user_id)

    if records is None:
        response.status_code = 404
        return []

    messages = []
    current_message_group = None
    for record_list in records:
        for record in record_list:
            message_out = MessageOut(
                id=record["id"],
                recipient=record["recipient"],
                sender=record["sender"],
                content=record["content"],
                date=record["date"],
                is_read=record["is_read"],
            )

            if current_message_group is None:
                current_message_group = MessageGroup(messages=[message_out])
            elif (
                current_message_group.messages[-1].recipient == message_out.recipient
                and current_message_group.messages[-1].sender == message_out.sender
            ):
                current_message_group.messages.append(message_out)
            else:
                messages.append(current_message_group)
                current_message_group = MessageGroup(messages=[message_out])

    if current_message_group:
        messages.append(current_message_group)

    return messages

@messages_router.post("/api/messages/create/", tags=["Messages"], response_model=MessageOut)
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
