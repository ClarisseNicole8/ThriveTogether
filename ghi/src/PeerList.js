import React, { useState, useEffect } from "react";

function PeerList() {
  const [peer, setPeer] = useState([]);
  const [peerData, setPeerData] = useState("");

  useEffect(() => {
    async function getPeerData() {
      const url = `${process.env.REACT_APP_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        console.log("ACCOUNT DATA", data.account);
        setPeerData(data.account);
      } else {
        console.log("Peer data could not be fetched");
      }
    }

    getPeerData();
  }, []);

  async function LoadPeers() {
    console.log("!!!", peerData);
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/peers/${peerData["id"]}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log("peerData", data);
      setPeer(data);
    } else {
      console.log("Error! Peer not found.");
    }
  }

  useEffect(() => {
    LoadPeers();
  }, [peerData]);

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
              <tr key={peerData.id + peerData.peer_name}>
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
