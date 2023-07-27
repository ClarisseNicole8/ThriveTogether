06/29/2023
Added and migrated below tables: 004_user_tags table, 005_messages table, 006_peer_connections table.
They all showed up in pgAdmin.

07/10/2023
Added preferences column to users table.

07/14/2023
Created peer table and updated peer_connections table.

07/17/2023
Created get_users backend endpoint (including get_users queries, get_users routers, etc).

07/18/2023
Removed the "NOT NULL" constraints of the peer_connections table columns "sender_name" and "recipient_name".

07/19/2023
Completed PeerButton.js, PeerForm.js, and PeerList.js today. So happy!

07/20/2023
Finalized PeerList.js.
Fixed Flake8 Issues (Ran flake8 command in the terminal to check and got no error remaining).

07/21/2023
Completed the "Create a Tag" backend endpoint (including queries, routers, etc), which enables creating new rows in the tags table in the database using FastAPI (we will be able to see the newly-created tags using "SELECT \* FROM tags;" statement in pgAdmin).

07/23/2023
Added peers unit test to make sure the backend endpoint returns data correctly.
Tested it out in the FastAPI terminal in Docker by running the "python -m pytest test" command and no failure showed up.

07/25/2023
Changed "peer name" to "username" in PeerList.js.
Deleted several other columns.
Finally fixed console error. So happy!

07/26/2023
Added data models (schemas) to ReadMe with Clarisse.
