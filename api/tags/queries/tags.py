import os
from ..models import TagsOut, AllTagsOut
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class TagQueries:

    def get_all_tags(self) -> AllTagsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, tag FROM tags
                    """
                )

                tags = []
                rows = cur.fetchall()
                for row in rows:
                    tag = {row[0]: row[1]}
                    tags.append(tag)
                return {"tags": tags}

    def get_user_tags(self, username) -> TagsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT tags.tag FROM users
                    JOIN user_tags ON (users.id = user_tags.user_id)
                    JOIN tags ON (user_tags.tag_id = tags.id)
                    WHERE (users.username = %s)
                    """,
                    [username]
                )

                tags = []
                rows = cur.fetchall()
                for row in rows:
                    tag = str(row[0])
                    tags.append(tag)
                return {"tags": tags}
