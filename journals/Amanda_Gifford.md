7/10/23
Today, our team worked together to compose the database and get it running. Tanner did this in VSCode while screensharing so everyone could help troubleshoot.

Next, I set up PGAdmin in the docker-compose.yaml and pushed to main, where Sarina approved the second merge request. Next, everyone got PGAdmin running on their ends.

7/11/23
Today I worked on retrieving all of the messages that a user has either sent or received by sending in their user ID on the endpoint. I was able to fix all errors to make the endpoint return an empty list but not yet able to insert data because I haven't built the create a message function, which I will be working on tomorrow.

7/12/23
Today, I decided to merge the retrieve all messages for a user feature branch (18) into the create a new message branch since I would need that to test my functionality I built yesterday. I do realize that merging feature branches before testing is completed is a bit messy, and will definitely think more in the future about the order that I build stuff in. I should have built the branch to create a message first, so I could use that to insert the proper data (difficult to insert directly into database because of datetime ovject formatting) to help with testing the other feature branch that returns all the messages for a, identified user.

I did end up getting both features to work after a little bit of debugging and was able to merge them into main in Gitlab with Tanner's approval after he examined and also determined the code was working.

Finally, after getting the code to work by returning a list of all of the messages a user has sent or received, I was able to ammend the code to instead return a list of lists of grouped messages (conversations) between two users (one being the identified user from the API call). I then sorted those grouped messages in descending order so when I call this list on the frontend it will be easy to display the most recently active conversations in the inbox.

7/17/23
Today, I ran into an issue with the authentication and sought help from the instructor's. I realized I needed to be better and more detailed at posting in help me understand and do more thorough research before posting, as this is a good practice for the worklplace. I was feeling under the weather today so not up to my usual standards of researching something. Paul helped me understand more about useContext and how that would be good to store the global user values in. Tanner also figured out how to do this so I will consult with him tomorrow on that.

I also consulted paul about an issue with returning my JSON on the frontend. It turns out that in react, children cannot be objects so my dictionary format will have to be changed on the frontend or backend to a list of lists of dictionairies instead of a dictionary of lists of dictionaries. Paul was saying it would be the preferred method to do this on the backend, and I didn't want to rewrite the whole backend since it was working with the grouping and order of the messages already, so I figured out a happpy medium where I can just add the function to transform the format of the dictionary to a list of lists with the keys included in each entry of the list on the backedn after they are put into a dictionary so it will be in the correct order when put into a list of lists of dictionaries.

7/18/23
Today I begain working on theInboxForm and got it mostly working but there are a few bugs that need to be corrected tomorrow.

7/19/23
Today I finalized the code for the InboxDialogue component and added that to the inboxpage along with the InboxCards. I also added Redux to the state so that I could pass state between these two components to allow clicking on a card to pull up that conversation in the Messaging dialogue.

Also did a merge to main and have assisted with some of my teammates in doing ghecks of their code and approving merges.

I also got the name alternation working in the messaging dialogue as well as the if/else of the components on Inbox Page so initial rendering will just be the inboxcards and then when you click on one of them it will open up the messaging form and dialogue along side it.

7/20/23
Today I played around with the UI formatting of the components on InboxPage. Overall, the UI is really starting to come together and Tanner has done some great work on the design already! At the end of the day,our group was at the final step of trying to push the code for deployment and resolved several linting errors and testing errors (unit tests). We were running into an issue with deployment though and had to push it over till beginning of next week in order to figure out why the error was occurring.

7/24/23
Today our group did some work on deployment, and I worked on resolving some console errors with a function call being made before the user data was loaded. I was able to resolve this issue by protecting the call using userData by using a custom hook userDataLoaded and adding that to my dependency array.

By the end of the day, our group was able to deploy the frontend but were running into an issue with the CLI tool. We will tackle this tomorrow. Also, I realized that I didn't have a place for the user to choose from a dropdown of users who they would want to message and start a new message, I had only focused on the functionality of switching between user threads that were created using fastAPI docs. This was definielty a design flaw on my part, but I will work on getting that feature of the inbox implemented tomorrow. Good learning experience that I should have thought out my process more before jumping into designing and building.

7/25/23
Today, I built the InboxMessage component (with user dropdown) that allows the user to select from a list of their peers, who they want to message and starat a new message thread. It then adds a card to the side bar where the peer threads are displayed for the peer that was just messaged. I also added a button to reload the MessageInbox component if the user wants to send a message to a peer that they haven't yet messaged, or they can select a peer that they have already messaged in the dropdown as it will work this way also. Redux proved very helpful for acheiving this functionality.

We were also able to get our backend deployed, so now we have both back and frontend deployed.

I have brought up to the group that I think we ought to change the design to a white background for the site, with just the colored accents on the buttons and navbar and logo. Perhaps outlines of some of the componenets. I think it will look a lot cleaner that way but we will see what the team decides together.

7/26/23

Today, I tried to implement code on the peer button that would check if the user had already sent a request to a peer before making another request, to stop duplicate data. Unfortunately, I was unable to do this in a few hours of trying so I will push it off to stretch goals.

We will do an early presentation to the instructors today to see if there is anything we need to add. We also fixed several bugs today together, the biggest of which was not creating mutual peer connections, and only one sided peer connnections. This was also breaking the inbox feature so we were glad to resolve this.

7/27/23
Today, we had our code review and fixed several bugs. In the review, we were given some feedback about renaming things to make them clearer which we were able to implement. Also, some of our team members had to add authentication to protect their API endpoints, and in response I had to add credentials include to one of my API calls. Found some bugginess still exists when there are duplicate requests of peers, which the app is not protected against, it can cause my inbox to bug out.

Excited to get our final grade and have such a comprehensive project in my portfolio soon!
