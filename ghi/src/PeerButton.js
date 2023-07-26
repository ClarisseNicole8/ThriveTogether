import React, { useState, useCallback, useEffect } from "react";

function PeerButton(props) {
  const [addSuccess, setAddSuccess] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [connectionExistsLoaded, setConnectionExistsLoaded] = useState(false);
  const [connectionExists, setConnectionExists] = useState(false);
  const [addAlert, setAddAlert] = useState(false);

  async function connectionExistsFunc () {
    const peerUrl = `${process.env.REACT_APP_API_HOST}/api/peer_connections/${peerId}`;
    const fetchConfig = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(peerUrl, fetchConfig);
    let data = await response.json();
    console.log("This is data", data);
    if (response.ok) {
      for (const connection in data.peerConnections) {
        if (connection.recipient === peerId) {
          setConnectionExists(true);
        }
      }
    }
    setConnectionExistsLoaded(true);
  }

  const handleAddPeer = useCallback(async (event) => {
    event.preventDefault();
    const data = {
      sender: props.senderId,
      recipient: props.recipientId,
      status: "pending",
      has_messaged: false,
      sender_name: props.senderName,
      recipient_name: props.recipientName,
    };

    setPeerId(data.recipient);

    // setConnectionExists(connectionExistsFunc(peerId));
    if (!connectionExists && connectionExistsLoaded) {
      const peerUrl = `${process.env.REACT_APP_API_HOST}/api/connections/create/`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(peerUrl, fetchConfig);
      if (response.ok) {
        setAddSuccess(true);
      }
      } else {
        setAddAlert(true);
      }
  }, [props.senderId, props.recipientId, props.senderName, props.recipientName, setPeerId, setConnectionExists, connectionExists, connectionExistsLoaded])

  useEffect(() => {
    if (peerId) {
      connectionExistsFunc();
    }
  }, [peerId]);

  return (
  <div>
    {addAlert ? (
      <div className="alert alert-warning" role="alert">
        The request has already been made!
      </div>
    ) : addSuccess ? (
      <div className="alert alert-success" role="alert">
        Success!
      </div>
    ) : (
      <button className="btn btn-primary" onClick={handleAddPeer}>
        Add Peer
      </button>
    )}
  </div>
);
}

export default PeerButton;
