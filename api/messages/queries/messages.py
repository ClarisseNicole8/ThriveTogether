import os
from psycopg_pool import ConnectionPool
#comment

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
                    """,
                    [user_id],
                )

                messages = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    messages.append(record)
                print("this is messages", messages)
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
