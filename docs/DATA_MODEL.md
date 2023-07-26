# Data Models

## Users

| field | type | optional? | unique? |
| ------ | ------ | ------ | ------ |
| id     | int | no | yes |
| username | string | no | yes |
| hashed_password | string | no | no |
| name | string | no | no |
| age | int | no | no |
| gender | string | no | no |
| pronouns | string | no | no |
| profile_link | string | yes | no |
| profile_image | string | yes | no |
| banner_image | string | yes | no |
| email | string | no | no|
| about_me | string | yes | no |
| my_story | string | yes | no |
| preferences | string | yes | no |

- The user password is converted to and stored in the  database as a hashed password and on the user side it is a regular password.



## Peer

| field | type | optional? | unique? |
| ------ | ------ | ------ | ------ |
| user_id | int | no | no |
| peer_id | int | no | no |
| peer_name | string | no | no |
| profile_link | string | yes | no |
| tags_id | int | yes | no |
| profile_image | string | yes | no |
| status | int | no | no |
| id | int | no | yes |



## Peer Connections

| field | type | optional? | unique? |
| ------ | ------ | ------ | ------ |
| id | int | no | yes |
| sender | int | no | no |
| recipient | int | no | no |
| status | string | no | no |
| has_messaged | bool | yes | no |
| sender_name | string | no | no |
| recipient_name | string | no | no |



## Messages

| field | type | optional? | unique? |
| ------ | ------ | ------ | ------ |
| id | int | no | yes |
| recipient | int | no | no |
| sender | int | no | no |
| date | datetime | no | no |
| content | string | yes | no |
| is_read | bool | yes | no |
| user_id | int | yes | no |



## Tags

| field | type | optional? | unique? |
| ------ | ------ | ------ | ------ |
| id | int | no | yes |
| tag | string | no | yes |



## User Tags

| field | type | optional? | unique? |
| ------ | ------ | ------ | ------ |
| id | int | no | yes |
| user_id | int | no | no |
| tag_id | int | no | no |
