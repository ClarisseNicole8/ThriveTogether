import React, { useState } from "react";

const PeerButton = () => {
  // Set an initial state to track whether the peer is added or not
  const [peerStatus, setPeerStatus] = useState(false);

  const handleAddPeer = () => {
    // Update the state to toggle between added and not added
    setPeerStatus((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={handleAddPeer}>
        {peerStatus ? "Pending" : "Accept"}
      </button>
    </div>
  );
};

export default PeerButton;
