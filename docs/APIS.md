# APIs

Send and view data for API endpoints at: http://localhost:8000/

# Messages

| Action | Method | Path |
| --------- | --------- | --------- |
| Get messages | GET | /messages/{user_id} |
| Create a message | POST | /messages/create |
| Get messages from one user | GET | /messages/{user_id}/message/{user2_id} |
---

- Get messages (output)
```
[
  [
    {
      "id": 0,
      "recipient": 0,
      "sender": 0,
      "content": "string",
      "date": "2023-07-25T19:40:56.658Z",
      "is_read": false,
      "username": "string",
      "profile_image": "string",
      "profile_link": "string",
      "user_id": 0
    }
  ]
]
```

- Create a message (input)
```
{
  "recipient": 0,
  "sender": 0,
  "content": "string"
}
```

- Create a message (output)
```
[
  {
    "id": 2,
    "recipient": 2,
    "sender": 1,
    "content": "string",
    "date": "2023-07-25T19:44:09.442707",
    "is_read": false,
    "username": "bob",
    "profile_image": null,
    "profile_link": null,
    "user_id": 2
  }
]
```

- Get messages from one user (output)
```
[
  {
    "id": 2,
    "recipient": 2,
    "sender": 1,
    "content": "string",
    "date": "2023-07-25T19:44:09.442707",
    "is_read": false,
    "username": "bob",
    "profile_image": null,
    "profile_link": null,
    "user_id": 2
  }
]
```

# Accounts

| Action | Method | Path |
| --------- | --------- | --------- |
| Create Account | POST | /accounts |
| Get Account Info | GET | /accounts/{account_id} |
| Update Account Info | PUT | /accounts/{account_id} |

- Create Account (input)
```
{
  "username": "string2",
  "password": "string2",
  "name": "string",
  "age": 0,
  "gender": "string",
  "pronouns": "string",
  "email": "string"
}
```

- Create Account (output)
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YTM5OWU5Zi04ZGJjLTQzMzAtYTE1YS02NTEwMTc4NWNhNzkiLCJleHAiOjE2OTAzMTgyNTksInN1YiI6InN0cmluZzIiLCJhY2NvdW50Ijp7ImlkIjo0LCJ1c2VybmFtZSI6InN0cmluZzIiLCJuYW1lIjoic3RyaW5nIiwiYWdlIjowLCJnZW5kZXIiOiJzdHJpbmciLCJwcm9ub3VucyI6InN0cmluZyIsImVtYWlsIjoic3RyaW5nIiwicHJvZmlsZV9pbWFnZSI6bnVsbCwiYmFubmVyX2ltYWdlIjpudWxsLCJhYm91dF9tZSI6bnVsbCwibXlfc3RvcnkiOm51bGwsInByZWZlcmVuY2VzIjpudWxsfX0.VYugjeUmuD95vpH07LS056LLqJq1y1dlE4n3Sxrsd1Q",
  "token_type": "Bearer",
  "account": {
    "id": 4,
    "username": "string2",
    "name": "string",
    "age": 0,
    "gender": "string",
    "pronouns": "string",
    "email": "string",
    "profile_image": null,
    "banner_image": null,
    "about_me": null,
    "my_story": null,
    "preferences": null
  }
}
```

- Get Account Info (input)
```
{
    "account_id" : int
}
```

- Get Account Info (output)
```
{
  "id": 1,
  "username": "string1",
  "name": "string1",
  "age": 0,
  "gender": "string1",
  "pronouns": "string1",
  "email": "string1",
  "profile_image": null,
  "banner_image": null,
  "about_me": null,
  "my_story": null,
  "preferences": null
}
```

- Update Account Info (input)
```
{
    "account_id" : int
}
```

- Update Account Info (output)
```
{
  "id": 1,
  "username": "string",
  "name": "string",
  "age": 0,
  "gender": "string",
  "pronouns": "string",
  "email": "string",
  "profile_image": "string",
  "banner_image": "string",
  "about_me": "string",
  "my_story": "string",
  "preferences": "string"
}
```

# Peers

| Action | Method | Path |
| --------- | --------- | --------- |
| Create Connection | POST | /connections/create |
| Get Peers | GET | /peers/{user_id} |
| Get Users | GET | /users/{user_id} |
|Get Peerconnection | GET | /peer_connections/{user_id} |
| Update Peerconnection | POST | /peerRequest/operate/{user_id}/{sendRequest_id}/{status} |
| Insert Peer | POST | /peerAdd |

-  Create Connection (input)
```
{
  "sender": 1,
  "recipient": 2,
  "status": "string",
  "has_messaged": "string",
  "sender_name": "string",
  "recipient_name": "string"
}
```

- Create Connection (output)
```
{
  "sender": 1,
  "recipient": 2,
  "status": "string",
  "has_messaged": "string",
  "sender_name": "string",
  "recipient_name": "string"
}
```

- Get Peers (input)
```
{
    "user_id" : int
}
```

- Get Peers (output)
```
[
  {
    "user_id": 0,
    "peer_id": 0,
    "peer_name": "string",
    "profile_link": "string",
    "tags_id": 0,
    "profile_image": "string",
    "status": 0
  }
]
```

- Get Users (input)
```
{
    "user_id" : int
}
```

- Get Users (output)
```
[
  {
    "id": 0,
    "username": "string",
    "name": "string",
    "age": 0,
    "gender": "string",
    "pronouns": "string",
    "email": "string"
  }
]
```

- Get Peerconnection (input)
```
{
    "user_id" : int
}
```

- Get Peerconnection (output)
```
{
  "peerConnections": [
    {
      "sender": 0,
      "recipient": 0,
      "status": "string",
      "has_messaged": "string",
      "sender_name": "string",
      "recipient_name": "string"
    }
  ]
}
```

- Update Peerconnection (output)
```
{
  "sender": 0,
  "recipient": 0,
  "status": "string",
  "has_messaged": "string",
  "sender_name": "string",
  "recipient_name": "string"
}
```

- Insert Peer (input)
```
{
  "user_id": 0,
  "peer_id": 0,
  "peer_name": "string",
  "profile_link": "string",
  "tags_id": 0,
  "profile_image": "string",
  "status": 0
}
```

- Insert Peer (output)
```
{
  "user_id": 0,
  "peer_id": 0,
  "peer_name": "string",
  "profile_link": "string",
  "tags_id": 0,
  "profile_image": "string",
  "status": 0
}
```

# Matches

| Action | Method | Path |
| --------- | --------- | --------- |
| Get Matches | GET | /matches/{tag} |

- Get Matches (output)
```
{
  "matches": [
    {
      "username": "string",
      "id": 0,
      "tags": [
        "string"
      ],
      "about_me": "string",
      "profile_link": "string",
      "profile_image": "string",
      "gender": "string",
      "pronouns": "string"
    }
  ]
}
```

# Tags

| Action | Method | Path |
| --------- | --------- | --------- |
| Get All Tags | GET | /tags |
| Get User Tags | /tags/{username} |
| Add User Tag | POST | /tags/{username} |
| Delete User Tag | /tags/{tag_id} |
| Create Tag | POST | /tags/create |

-  Get All Tags (output)
```
{
  "tags": [
    {}
  ]
}
```

- Get User Tags(output)
```
{
  "tags": [
    {}
  ]
}
```

- Add User Tag (output)
```
{
  "detail": "string"
}
```

- Delete User Tag
```
{
  "detail": "string"
}
```

- Create Tag (input)
```
{
  "tag": "string"
}
```

- Create Tag (output)
```
{
  "tag": "string"
}
```
