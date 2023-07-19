import React, { useState } from "react";

function PeerForm() {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState("");
  const [hasMessaged, setHasMessaged] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      sender,
      recipient,
      status,
      has_messaged: hasMessaged,
      sender_name: senderName,
      recipient_name: recipientName,
    };

    const peerUrl = "http://localhost:8000/api/connections/create/";
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

      setSender("");
      setRecipient("");
      setStatus("");
      setHasMessaged("");
      setSenderName("");
      setRecipientName("");
    }
  }

  function handleChangeSender(event) {
    const value = event.target.value;
    setSender(value);
  }

  function handleChangeRecipient(event) {
    const value = event.target.value;
    setRecipient(value);
  }

  function handleChangeStatus(event) {
    const value = event.target.value;
    setStatus(value);
  }

  function handleChangeHasMessaged(event) {
    const value = event.target.value;
    setHasMessaged(value);
  }

  function handleChangeSenderName(event) {
    const value = event.target.value;
    setSenderName(value);
  }

  function handleChangeRecipientName(event) {
    const value = event.target.value;
    setRecipientName(value);
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a New Peer</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeSender}
                value={sender}
                placeholder="Sender"
                required
                type="int"
                name="sender"
                id="sender"
                className="form-control"
              />
              <label htmlFor="sender">Sender</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeRecipient}
                value={recipient}
                placeholder="Recipient"
                required
                type="int"
                name="recipient"
                id="recipient"
                className="form-control"
              />
              <label htmlFor="recipient">Recipient</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeStatus}
                value={status}
                placeholder="Status"
                required
                type="int"
                name="status"
                id="status"
                className="form-control"
              />
              <label htmlFor="status">Status</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeHasMessaged}
                value={hasMessaged}
                placeholder="Has messaged"
                required
                type="text"
                name="has_messaged"
                id="has_messaged"
                className="form-control"
              />
              <label htmlFor="has_messaged">Has Messaged</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeSenderName}
                value={senderName}
                placeholder="Sender name"
                required
                type="text"
                name="sender_name"
                id="sender_name"
                className="form-control"
              />
              <label htmlFor="sender_name">Sender Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeRecipientName}
                value={recipientName}
                placeholder="Recipient name"
                required
                type="text"
                name="recipient_name"
                id="recipient_name"
                className="form-control"
              />
              <label htmlFor="recipient_name">Recipient Name</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PeerForm;
