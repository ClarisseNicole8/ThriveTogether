from pydantic import BaseModel
from datetime import datetime
from typing import List, Union, Optional

class Error(BaseModel):
    message: str

class MessageIn(BaseModel):
    recipient: int
    sender: int
    content: str

class MessageOut(BaseModel):
    id: int
    recipient: int
    sender: int
    content: str
    date: datetime
    is_read: Optional[bool] = False

# class MessagesOut(BaseModel):
#     messages: List[MessageOut]
