import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";

const AccountInfo = () => {
    const [userId, setUserId] = useState('');
    const [accountInfo, setAccountInfo] = useState('');
    const { fetchWithToken } = useToken();

    async function getAccountInfo() {
        try {
            let url = `${process.env.REACT_APP_API_HOST}/api/accounts/${userId}`;
            let response = await fetch(url, {
                credentials: "include",
            });
            let data = await response.json();

            if (response.ok) {
                setAccountInfo(data);
            } else {
                console.log("Account info could not be found");
            }
        } catch (error) {
            console.error("Error fetching account info:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await getAccountInfo();
    };

    return (
        <div>
            <h2>Get Account Information</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    User ID:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {accountInfo && (
                <div>
                    <h3>Account Information: {userId}</h3>
                    <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
                    <Link to={`/update/${userId}`}>
                        <button>Update Account Info</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AccountInfo;
