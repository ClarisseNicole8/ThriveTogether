import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AccountInfo = () => {
    const {id} = useParams();
    // const [userId, setUserId] = useState('');
    const [accountInfo, setAccountInfo] = useState('');
    const [userData, setUserData] = useState('');

    async function getAccountInfo() {
    try {
        let url = `${process.env.REACT_APP_API_HOST}/api/accounts/${id}`;
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

    // async function getAccountInfo() {
    //     try {
    //         let url = `${process.env.REACT_APP_API_HOST}/api/accounts/${userId}`;
    //         let response = await fetch(url, {
    //             credentials: "include",
    //         });
    //         let data = await response.json();

    //         if (response.ok) {
    //             setAccountInfo(data);
    //         } else {
    //             console.log("Account info could not be found");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching account info:", error);
    //     }
    // }

    useEffect(() => {
        if (id === undefined) {
            async function getUserData() {
            let url = `${process.env.REACT_APP_API_HOST}/token`;
            let response = await fetch(url, {
                credentials: "include",
            });
            let data = await response.json();

            if (response.ok) {
                setUserData(data.account);
            } else {
                console.log("User data could not be fetched");
            }
    }
        getUserData();

        }
        getAccountInfo(id);
    }, [id]);

    return (
    <div>
        <h2>Account Information for User ID: {id}</h2>
        {accountInfo ? (
            <div>
                <div className="d-flex justify-content-center">
                <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
                </div>
                <br />
                <Link to={`/update`}>
                    <div>
                        <div className="d-flex justify-content-center">
                        <input className='btn btn-primary' type='submit' value='Update' />
                        </div>
                    </div>
                </Link>
                <br />
            </div>
        ) : (
            <p>Loading account information...</p>
        )}
    </div>
);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await getAccountInfo();
    // };

    // return (
    //     <div>
    //         <h2>Get Account Information</h2>
    //         <form onSubmit={handleSubmit}>
    //             <br></br>
    //             <label>
    //                 User ID:
    //                 <input
    //                     type="text"
    //                     value={userId}
    //                     onChange={(e) => setUserId(e.target.value)}
    //                 />
    //             </label>
    //             <div>
    //                 <br></br>
    //             </div>
    //             <div>
    //                 <input className='btn btn-primary' type='submit' value='Submit' />
    //             </div>
    //         </form>
    //         <br></br>
    //         {accountInfo && (
    //             <div>
    //                 <h3>Account Information: {userId}</h3>
    //                 <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
    //                 <br></br>
    //                 <Link to={`/update`}>
    //                         <div>
    //                             <input className='btn btn-primary' type='submit' value='Update' />
    //                         </div>
    //                 </Link>
    //                 <br></br>
    //             </div>
    //         )}
    //     </div>
    // );
};

export default AccountInfo;
