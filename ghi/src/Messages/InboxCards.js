import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { setRecipient } from './recipientActions';


function InboxCards(props) {
    const [messagesData, setMessagesData] = useState([]);
    const [userData, setUserData] = useState([]);
    const { recipient } = props;

    useEffect(() => {
        async function getUserData() {
            let url = `${process.env.REACT_APP_API_HOST}/token`;
            let response = await fetch(url, {
                credentials: "include",
            });
            let data = await response.json()

            if (response.ok) {
                setUserData(data.account)
            } else {
                console.log("Your data could not be fetched")
            }
        }

        getUserData();
    }, []);

    useEffect(() => {
        async function getMessagesData() {
            if (!userData) {
                return;
            } //wait until userData is set
            let url = `${process.env.REACT_APP_API_HOST}/api/messages/${userData["id"]}`;
            let response = await fetch(url, {
                credentials: "include",
            });
            let data = await response.json()

            if (response.ok) {
                setMessagesData(data)
            } else {
                console.log("could not return user messages")
            }
        }

        getMessagesData();
    }, [userData]);

    const handleSetRecipient = (userId) => {
      props.setRecipient({recipient: userId});
    };

  useEffect(() => {
    console.log('Recipient:', props.recipient); // testing purposes only
  }, [props.recipient]);


   return (
    <div className="container mt-4">
      <div className="row justify-content-start">
        <div className="col-lg-4">
            {messagesData.map((conversation) => (
          <div key={conversation[0].id} className="card mb-4">
            <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle overflow-hidden me-2" style={{ width: '40px', height: '40px' }}>
                    <img src={conversation[0].profile_image} alt="Profile" className="img-fluid" />
                  </div>
                  <strong>{conversation[0].username}</strong>
                </div>
                <p>{conversation[0].content}</p>
                <small className="text-muted">{conversation[0].date}</small>
            </div>
            <div>
              <button onClick={() => handleSetRecipient(conversation[0].user_id)}>Message</button>
          </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipient: state.recipient,
});

export default connect(mapStateToProps, { setRecipient })(InboxCards);
