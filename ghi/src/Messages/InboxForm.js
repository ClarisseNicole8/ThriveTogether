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

    const handleNewMessage = (event) => {
        const value = event.target.value;
        setMessage(value);
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.content = message;
        data.sender = userData["id"];
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
            console.log("Response2: ", info2);
            if (response2.ok) {
                setUpdatedConversation(info2);
                console.log("converstation: ", updatedConversation)
            } else {
                console.log("Could not retrieve updated conversation.");
            }
        } else {
            console.log("could not create message");
        }
    }

    useEffect(() => {
        if (Array.isArray(updatedConversation) && updatedConversation.length > 0) {
            console.log("Conversation data has been updated:", updatedConversation);
        }
    }, [updatedConversation]);


return (
        <div className="my-5 container">
        <div className="row">
            <div className="col col-sm-auto">
                <div className="card shadow">
                    <div className="card-body">
                    <h1 className="card-title">Conversation</h1>
                        {Array.isArray(updatedConversation) && updatedConversation.length > 0 ? (
                            updatedConversation.map((message) => (
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
            <div className="col">
            <div className="card shadow">
                <div className="card-body">
                <form onSubmit={handleSubmit} id="create-model-form">
                    <h1 className="card-title">Inbox</h1>
                    <div className="mb-3">
                    </div>
                    <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleNewMessage} required placeholder="NewMessage" type="text" id="new_message" name="new_message" value={message} className="form-control"/>
                        <label htmlFor="price">Message</label>
                        </div>
                    </div>
                    </div>
                    <button className="btn btn-lg btn-primary">Send</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>);

}


export default InboxForm;
