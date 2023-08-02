import { useEffect, useState } from "react";

const PeerConnectionList = () => {
  const [peerRequest, setpeerRequest] = useState("");
  const [loginAccount, setLoginAccount] = useState("");

  useEffect(() => {
    async function getPeerData() {
      const url = `${process.env.REACT_APP_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setLoginAccount(data.account);
      }
    }

    getPeerData();
  }, []);

  useEffect(() => {
    async function showPeerRequest() {
      if (!loginAccount) {
        return;
      }
      let listUrl = `${process.env.REACT_APP_API_HOST}/api/peer_connections/${loginAccount.id}`;
      const response = await fetch(listUrl, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setpeerRequest(data.peerConnections);
      }
    }

    showPeerRequest();
  }, [loginAccount]);

  const handleSubmit = async (event) => {
    let approve_data = {};
    let approve_data2 = {};
    let locationUrl = `${process.env.REACT_APP_API_HOST}/api/peerRequest/operate/${event.peerConnections.recipient}/${event.peerConnections.sender}/${event.operate}`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      if (event.operate === "Reject") {
        refreshPage();
      }
      if (event.operate === "Approve") {
        let approveUrl = `${process.env.REACT_APP_API_HOST}/api/peerAdd`;
        approve_data = {
          user_id: event.peerConnections.recipient,
          peer_id: event.peerConnections.sender,
          peer_name: event.peerConnections.sender_name,
          profile_link: "",
          tags_id: 1,
          profile_image: "",
          status: 0,
        };
        const approveConfig = {
          method: "post",
          body: JSON.stringify(approve_data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        const response = await fetch(approveUrl, approveConfig);
        if (response.ok) {
          let approveUrl = `${process.env.REACT_APP_API_HOST}/api/peerAdd`;
          approve_data2 = {
            user_id: event.peerConnections.sender,
            peer_id: event.peerConnections.recipient,
            peer_name: event.loginAccount.name,
            profile_link: "",
            tags_id: 1,
            profile_image: "",
            status: 0,
          };
          const approveConfig2 = {
            method: "post",
            body: JSON.stringify(approve_data2),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          };
          const response2 = await fetch(approveUrl, approveConfig2);
          if (response2.ok) {
            refreshPage();
          }
        }
      }
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="container content-container rounded-edges">
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
          {Array.from(peerRequest).map((peerConnections) => {
            return (
              <tr key={peerConnections.sender_name + peerConnections.recipient}>
                <td>{peerConnections.sender_name}</td>
                <td>{peerConnections.has_messaged}</td>
                <td>{peerConnections.status}</td>
                <td>
                  <div
                    style={{
                      display:
                        peerConnections.status === "pending" ? "" : "none",
                    }}
                  >
                    <button
                      className="btn btn-outline-warning"
                      onClick={handleSubmit.bind(this, {
                        peerConnections,
                        loginAccount,
                        operate: "Approve",
                      })}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-outline-warning"
                      onClick={handleSubmit.bind(this, {
                        peerConnections,
                        operate: "Reject",
                      })}
                    >
                      Reject
                    </button>
                  </div>
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
