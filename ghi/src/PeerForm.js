import React, { useState } from "react";

function PeerForm({ getConferences }) {
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

    const locationUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);
      getConferences();

      setName("");
      setStarts("");
      setEnds("");
      setDescription("");
      setMaxPresentations("");
      setMaxAttendees("");
      setLocation("");
    }
  }

  function handleChangeName(event) {
    const value = event.target.value;
    setName(value);
  }

  function handleChangeStarts(event) {
    const value = event.target.value;
    setStarts(value);
  }

  function handleChangeEnds(event) {
    const value = event.target.value;
    setEnds(value);
  }

  function handleChangeDescription(event) {
    const value = event.target.value;
    setDescription(value);
  }

  function handleChangeLocation(event) {
    const value = event.target.value;
    setLocation(value);
  }

  function handleChangeMaxAttendees(event) {
    const value = event.target.value;
    setMaxAttendees(value);
  }

  function handleChangeMaxPresentations(event) {
    const value = event.target.value;
    setMaxPresentations(value);
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new conference</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeName}
                value={name}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeStarts}
                value={starts}
                placeholder="Starts"
                required
                type="date"
                name="starts"
                id="starts"
                className="form-control"
              />
              <label htmlFor="starts">Starts</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeEnds}
                value={ends}
                placeholder="Ends"
                required
                type="date"
                name="ends"
                id="ends"
                className="form-control"
              />
              <label htmlFor="ends">Ends</label>
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={handleChangeDescription}
                value={description}
                className="form-control"
                id="description"
                rows="3"
                name="description"
              ></textarea>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeMaxPresentations}
                value={maxPresentations}
                placeholder="Maximum presentations"
                required
                type="number"
                name="max_presentations"
                id="max_presentations"
                className="form-control"
              />
              <label htmlFor="max_presentations">Maximum presentations</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChangeMaxAttendees}
                value={maxAttendees}
                placeholder="Maximum attendees"
                required
                type="text"
                name="max_attendees"
                id="max_attendees"
                className="form-control"
              />
              <label htmlFor="max_attendees">Maximum attendees</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleChangeLocation}
                value={locations}
                required
                name="locations"
                id="locations"
                className="form-select"
              >
                <option value="">Choose a location</option>
                {locations.map((location) => {
                  return (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PeerForm;
