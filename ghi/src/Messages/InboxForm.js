import React, {useEffect, useState} from 'react';

function InboxForm(props) {
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState([]);
    const [updatedConversation, setUpdatedConversation] = useState([]);

    useEffect(() => {
        async function getUserData() {
            let url = `${process.env.REACT_APP_API_HOST}/token`;
            let response = await fetch(url, {
                credentials: "include",
            });
            let data = await response.json();

            if (response.ok) {
                setUserData(data.account);
            } else {
                console.log("Your data could not be fetched");
            }
        }

        getUserData();
    }, []);

    useEffect(() => {
        if (userData.id) {
            fetchInitialConversation();
        }

    }, [userData.id]);


    async function fetchInitialConversation() {
        try {

            const messagesUrl = `${process.env.REACT_APP_API_HOST}/api/messages/${userData["id"]}/message/2`; // Assuming 2 is the recipient ID
            const fetchConfig = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            };

            const response = await fetch(messagesUrl, fetchConfig);
            const data = await response.json();
            console.log("data", data)
            if (response.ok) {
                if (data.length > 10) {
                    const truncData = data.slice(0,10);
                    console.log("trunc data", truncData)
                    setUpdatedConversation(truncData);
                    console.log("Initial Conversation:", updatedConversation)
                } else {
                    setUpdatedConversation(data);
                }

            } else {
            console.log("Could not retrieve initial conversation.");
            }
        } catch (error) {
            console.error('Error fetching initial conversation data:', error);
        }
    }

    const handleNewMessage = (event) => {
        const value = event.target.value;
        setMessage(value);
    }




    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.content = message;
        data.sender = userData.id;
        data.recipient = 2;
        const createMessageUrl = `${process.env.REACT_APP_API_HOST}/api/messages/create/`;
        const fetchConfig = {
            // credentials: "include",
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(createMessageUrl, fetchConfig);
            let info = await response.json();
            console.log("Response1: ", info);
            if (response.ok) {
                const messagesUrl = `${process.env.REACT_APP_API_HOST}/api/messages/${data.sender}/message/${data.recipient}`;
                const fetchConfig2 = {
                // credentials: "include",
                    method: "get",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                const response2 = await fetch(messagesUrl, fetchConfig2);
                let info2 = await response2.json();

                if (response2.ok) {
                    if (info2.length > 10) {
                        const truncData = info2.slice(0,10);
                        setUpdatedConversation(truncData);
                    } else {
                        setUpdatedConversation(info2);
                    }
                } else {
                    console.log("Could not retrieve updated conversation.");
                }
                setMessage("");
            } else {
            console.log("could not create message");
        }
    } catch (error) {
        console.error("Error handling the form submission:", error);
    }
    };





return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h1 className="card-title">Conversation</h1>
              {Array.isArray(updatedConversation) && updatedConversation.length > 0 ? (
                updatedConversation.slice().reverse().map((message) => (
                  <div key={message.id} className="mb-3">
                    <strong>{message.sender} | {message.recipient}</strong>: {message.content}
                  </div>
                ))
              ) : (
                <div>Loading...</div> // You can also render an empty state here
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title">Inbox</h1>
              <form onSubmit={handleSubmit} id="create-model-form">
                <div className="form-floating mb-3">
                  <input onChange={handleNewMessage} required placeholder="NewMessage" type="text" id="new_message" name="new_message" value={message} className="form-control" />
                  <label htmlFor="price">Message</label>
                </div>
                <button className="btn btn-lg btn-primary">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}


export default InboxForm;
