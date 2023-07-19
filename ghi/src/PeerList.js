import React, { useState, useEffect } from "react";

function PeerList() {
  const [peer, setPeer] = useState([]);
  async function LoadPeers() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/peers/${userData["user_id"]}`
    );
    if (response.ok) {
      const data = await response.json();
      setPeer(data.peer);
    }
  }

  useEffect(() => {
    LoadPeers();
  }, []);

  return (
    <div>
      <h1>Peers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Peer ID</th>
            <th>Peer Name</th>
            <th>Profile Link</th>
            <th>Tags ID</th>
            <th>Profile Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {peer.map((peerData) => {
            return (
              <tr key={peerData.user_id}>
                <td>{peerData.peer_id}</td>
                <td>{peerData.peer_name}</td>
                <td>{peerData.profile_link}</td>
                <td>{peerData.tags_id}</td>
                <td>{peerData.profile_image}</td>
                <td>{peerData.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PeerList;
