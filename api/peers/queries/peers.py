import os
from ..models import PeerConnection, Peer, User
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class PeerConnectionQueries:
    def create_connection(self, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.sender,
                    data.recipient,
                    data.status,
                    data.has_messaged,
                    data.sender_name,
                    data.recipient_name,
                ]
                cur.execute(
                    """
                    INSERT INTO peer_connections (sender, recipient, status, has_messaged, sender_name, recipient_name)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id, sender, recipient, status, has_messaged, sender_name, recipient_name
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record


    def get_peer_connection(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT sender, recipient, has_messaged,sender_name, recipient_name, status
                    FROM peer_connections as p
                    WHERE (p.recipient = %s)
                    """,
                    [user_id]
                )
                peer_connections = []
                rows = cur.fetchall()
                for row in rows:
                    peer_connection = {
                        "sender": row[0],
                        "recipient": row[1],
                        "has_messaged": row[2],
                        "sender_name": row[3],
                        "recipient_name": row[4],
                        "status": row[5]
                    }
                    peer_connections.append(peer_connection)
                return peer_connections


class PeerQueries:
    def get_peers(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM peer
                    """
                )

                peers = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    peers.append(record)
                return peers


class UserQueries:
    def get_users(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM users
                    """
                )

                users = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    users.append(record)
                return users
