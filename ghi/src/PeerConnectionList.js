import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PeerConnectionList = () => {
    const [peerRequest , setpeerRequest] = useState('');

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/peer_connections?user_id=1';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setpeerRequest(data.peerConnections)
        }
      }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
    //   const data = {};
    //   const locationUrl = 'http://localhost:8080/api/peerRequest/operate';
    //   if(event.operate === 'Approve'){
    //     data.status = 'Approve'
    //     const fetchConfig = {
    //       method: "post",
    //       body: JSON.stringify(data),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     };
    //     const response = await fetch(locationUrl, fetchConfig);
    //     if (response.ok) {
    //       const approvedata = await response.json();

    //     }


    //   }else if(event.operate === 'Reject'){
    //     data.user_id = event.peerConnections.recipient
    //     data.sendRequrst_id = event.peerConnections.sender
    //     data.status = 'Reject'
    //     const fetchConfig = {
    //       method: "post",
    //       body: JSON.stringify(data),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     };
    //     const response = await fetch(locationUrl, fetchConfig);
    //     if (response.ok) {

    //     }
    //   }
  }



  return (
    <div className="container">
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Peer Request Name</th>
                <th>message</th>
                <th>status</th>
                <th>Operate</th>
            </tr>
            </thead>
            <tbody>
                { Array.from(peerRequest).map((peerConnections) => {
                return (
                <tr key={peerConnections.recipient}>
                    <td>{peerConnections.sender_name}</td>
                    <td>{peerConnections.has_messaged}</td>
                    <td>{peerConnections.status}</td>
                    <td>
                        <button className='btn btn-outline-warning' onClick={handleSubmit.bind(this, {peerConnections,'operate':'Approve'})}>Approve</button>
                        <button className='btn btn-outline-warning' onClick={handleSubmit.bind(this, {peerConnections,'operate':'Reject'})}>Reject</button>
                    </td>
                </tr>
                 );
                })}
            </tbody>
        </table>
      </div>
  );

};

export default PeerConnectionList;
