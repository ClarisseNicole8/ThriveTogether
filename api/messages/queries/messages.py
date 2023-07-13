import os
from psycopg_pool import ConnectionPool

# documentation for psycopg: https://www.psycopg.org/psycopg3/docs/basic/usage.html
pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class MessageQueries:
    def get_messages(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT u.id AS user_id, m.id, m.recipient,
                        m.sender, m.date, m.content, m.is_read
                    FROM users u
                    JOIN messages m ON(u.id = m.recipient OR u.id = m.sender)
                    WHERE u.id = %s
                    ORDER BY m.date DESC
                    """,
                    [user_id],
                )

                messages = []
                current_message_group = []

                for row in cur.fetchall():
                    message = {
                        "id": row[1],
                        "recipient": row[2],
                        "sender": row[3],
                        "date": row[4],
                        "content": row[5],
                        "is_read": row[6],
                    }

                    if len(current_message_group) == 0:
                        current_message_group.append(message)
                    elif (
                        current_message_group[-1]["recipient"] == message["recipient"]
                        and current_message_group[-1]["sender"] == message["sender"]
                    ):
                        current_message_group.append(message)
                    else:
                        messages.append(current_message_group)
                        current_message_group = [message]

                if current_message_group:
                    messages.append(current_message_group)

        messages.sort(key=lambda group: group[-1]["date"], reverse=True)

        return messages

    def create_message(self, data):
         with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.sender,
                    data.recipient,
                    data.content,
                ]
                cur.execute(
                    """
                    INSERT INTO messages (sender, recipient, content)
                    VALUES (%s, %s, %s)
                    RETURNING id, sender, recipient, content, date, is_read
                    """,
                    params
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record
