import React from "react";

const PeerButton = () => {
  const handleClick = () => {
    // Handle button click logic here

    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Add a Peer</button>;
};

export default PeerButton;
