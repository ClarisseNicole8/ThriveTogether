import React, { useState } from "react";

const PeerButton = (props) => {
  async function handleAddPeer(event) {
    event.preventDefault();
    const data = {
      sender: props.senderId,
      recipient: props.recipientId,
      status: "pending",
      has_messaged: False,
      sender_name: props.senderName,
      recipient_name: props.recipientName,
    };
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
      const newPeer = await response.json();
      console.log(newPeer);
    }
  }

  return (
    <div>
      <button onClick={handleAddPeer}></button>
    </div>
  );
};

export default PeerButton;
