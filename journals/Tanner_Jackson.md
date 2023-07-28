## DAY ONE (6/28/23)
Today we all worked together to get the database up and running. I did it in VSCode while screensharing to everyone else and they helped troubleshoot as we ran into problems. We walked through the process together, up to and including the first merge request, which Amanda approved.

Then Amanda set up PGAdmin in the docker-compose.yaml and pushed that branch to main, which Sarina approved. We failed some pipelines along the way and I'm not sure what that's about but we'll figure it out. Afterwards the rest of us got PGAdmin running on our ends successfully! All in all, a pretty good day's work.

## DAY TWO (6/29/23)
Got the tables up and running today. Clarisse did the bulk of the work while sharing her screen while we acted as kind of a peanut gallery (I'm joking, we all walked through it together and were very helpful to her I hope). At first we tried building all the tables in a single migration file, but that broke some stuff, so we broke them all out into their own files and that made debugging much easier. After Clarisse got the first few implemented, Sarina did the rest, also while screen sharing.

## DAY THREE (6/30/23)
We got the barebones functionality of JWTDown working, barely any thanks to the tutorial video. Most of it was setting up Pydantic models and classes to use later that weren't covered in the tutorial, but I think we're on the right track. Liz helped us with some messed up import paths, too.

## DAY FOUR (7/10/23)
Spent like six and a half hours trying to get backend user account creation done. Turns out we were missing a return statement in our get_account method!! That was a nightmare, but Zach helped and so did Caleb. After that it was just a matter of making sure the function returned an AccountOut object instead of a dictionary, which was also a headache but I think it's fine. We'll test it more tomorrow.

## DAY FIVE (7/11/23)
Finished testing out backend auth by having the rest of the group pull from my branch and make some accounts in FastAPI's interface on their computers. Amanda was having git problems, which hopefully we'll get sorted out soon? Either way, we split up to tackle our individual problems and I'm currently filling the database with dummy data so I can make queries for users by their mental health tags. I've got it working so that you can grab a user's tags by their username, and just need to fill it in backwards so that it spits out a list of users WITH their tags in a nested array.

## DAY SIX (7/12/23)
I'll be real I completely forgot to journal yesterday. I think we mostly worked on API endpoints and got a bunch of them done?

## DAY SEVEN (7/13/23)
More API endpoints today. I got mine done and started working on frontend authorization so we can actually log into the website. I think Clarisse and Amanda are done with theirs too? Sarina and Chen are working together on the peer connections, and they seem to have some ideas for ways to make the code more sensible.

Update: Finished frontend auth, or at least logging in to a valid user account creates a fastapi token and logging out deletes it. It's ugly but it works!!!

## DAY EIGHT (7/14/23)
I forgot to write a journal for Friday but it's fine. Yesterday Clarisse and I got sign-up forms working, which was cool and exciting because we kept running into an error where it would write to the database but not log you in and would throw a CORS error of all things. Thankfully it was just because there was a misspelled login function call to the authenticator. Serena and Chen implemented a new table that they say will make doing peer connections easier on their end. Amanda also got some endpoints done.

## DAY NINE (7/15/23)
Today I started trying to do some unit tests for my existing endpoints, but since I protected them behind the login token they're failing with a 401 forbidden error. Gotta ask the instructors how to fix that. I did write a new endpoint to get a dictionary of all the existing tags out of the database, though, and the unit tests for that pass, so it's cool.

## DAY TEN (7/16/23)
Okay I think that's all the backend stuff we'll need. I got the methods to get all the tags out of the database ready and did some error handling for it, as well as letting users add and delete tags from their profiles. The front end might require a little bit of filtering wizardry to keep things from breaking, but I think I know how to do that. Hopefully I'll be able to get my pieces of that done this coming week.

## DAY ELEVEN (7/17/23)
I forgot to write a journal today. I'm pretty sure we worked on wrapping up backend stuff and moved on to frontend.

## DAY TWELVE (7/18/23)
I also forgot to write a journal but I'm writing it today on the 19th. Yesterday we worked on frontend pages for our various backends. I got the match cards and carousel working and it DOES filter out the currently logged-in user. I also managed to get tag addition and deletion MOSTLY working, but currently if a user deletes a tag from their profile they can't immediately add it back, which is annoying. I've got to shuffle some state around I think. I also got Sarina working on a button that'll post the add-a-peer request to the backend, and we'll work on incorporating that into the matching cards.

## DAY THIRTEEN (7/19/23)
Front end front end front end. I think all our endpoints are done and I got Sarina's button functional. I also did a bunch of styling so the app looks mostly cohesive now. I'm a little worried about deployment but that can be a problem for tomorrow. I should also ask the instructors about how to unit test endpoints that have variable names passed into them.

## DAY SIXTEEN (7/25/23)
Uh guess who forgot to write journals again. Most of what we did was additional styling, cleaning up code to get it up to linting snuff, and some frontend finagling. I've been on deploy duty and due to some problems with misunderstanding the instructions on Thursday we didn't get our image built until Monday, but we did get the front-end deployed yesterday!! Cool stuff! Not 100% sure what's going on with the database as it doesn't seem to be giving us any errors, but I've got some minor hunches that I can try out and I'll ask the group for their input too.

Anyway we did get the back end deployed today as well as starting to do some refactoring on Clarisse's pages and bugfixes on everyone else's.

## DAY SEVENTEEN (7/26/23)
Last looks before presenting for the first time. Got our unit tests running in production and our tags inserted into the database and displaying properly. Also updated the readme.
