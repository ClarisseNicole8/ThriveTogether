import { useEffect, useState } from "react";

const PeerConnectionList = () => {
    const [peerRequest , setpeerRequest] = useState('');

    const showPeerRequest = async () => {
        // let listUrl=`${process.env.REACT_APP_API_HOST}/api/peer_connections/${Userid.U_id}`;
        let listUrl=`${process.env.REACT_APP_API_HOST}/api/peer_connections/1`;
        const response = await fetch(listUrl);
        if (response.ok) {
          const data = await response.json();
          setpeerRequest(data.peerConnections)
        }
      }

    useEffect(() => {
        showPeerRequest();
    }, []);

    const handleSubmit = async (event) => {
      let approve_data={}
        let locationUrl=`${process.env.REACT_APP_API_HOST}/api/peerRequest/operate/${event.peerConnections.recipient}/${event.peerConnections.sender}/${event.operate}`;
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(locationUrl,fetchConfig);
        if (response.ok) {
          if(event.operate === 'Reject'){
              alert("success to reject")
          }
          if(event.operate === 'Approve'){
            let approveUrl = `${process.env.REACT_APP_API_HOST}/api/peerAdd`;
            approve_data ={
              user_id:event.peerConnections.recipient,
              peer_id:event.peerConnections.sender,
              peer_name:event.peerConnections.recipient,
              profile_link:'this is a link',
              tags_id:1,
              profile_image: "this is image",
              status:0
            }
            const approveConfig = {
            method: "post",
            body: JSON.stringify(approve_data),
            headers: {
              'Content-Type': 'application/json',
            },
          };
            const response = await fetch(approveUrl,approveConfig);
            if (response.ok) {
               alert("success to approve")
            }


          }


        }
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
