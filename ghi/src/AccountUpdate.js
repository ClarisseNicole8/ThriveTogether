import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';

const AccountUpdate = () => {
    const [userId, setUserId] = useState('');
    const [accountInfo, setAccountInfo] = useState({});
    const [editedAccountInfo, setEditedAccountInfo] = useState({
        username: '',
        name: '',
        age: '',
        gender: '',
        pronouns: '',
        email: '',
        profile_image: '',
        banner_image: '',
        about_me: '',
        my_story: '',
        preferences: '',
    });
    const { fetchWithToken } = useToken();

  useEffect(() => {
    if (accountInfo) {
      setEditedAccountInfo({ ...accountInfo });
    }
  }, [accountInfo]);

  async function getAccountInfo() {
    try {
      let url = `${process.env.REACT_APP_API_HOST}/api/accounts/${userId}`;
      let response = await fetch(url, {
        credentials: 'include',
      });
      let data = await response.json();

      if (response.ok) {
        setAccountInfo(data);
      } else {
        console.log('Account info could not be found');
      }
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  }

  async function updateAccountInfo() {
    try {
      let url = `${process.env.REACT_APP_API_HOST}/api/accounts/${userId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedAccountInfo),
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Account info updated successfully');
        setAccountInfo(editedAccountInfo);
      } else {
        console.log('Account info could not be updated');
      }
    } catch (error) {
      console.error('Error updating account info:', error);
    }
  }

  const handleAccountInfoChange = (event) => {
    const { name, value } = event.target;
    setEditedAccountInfo({ ...editedAccountInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await getAccountInfo();
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    await updateAccountInfo();
  };

  return (
    <div className='card-header'>
      <h5>Enter User ID</h5>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          User ID:
          <input type="text" value={userId || ''} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <br></br>
        <div>
            <input className='btn btn-primary' type='submit' value='Update' />
        </div>
        <br></br>
      </form>
      <br></br>
      {accountInfo && (
        <div>
          <h5 className='card-header'>Update Account Information</h5>
          <form onSubmit={handleUpdateSubmit}>
            <br></br>
            <div className='mb-3'>
              Username:
              <input
                type="text"
                name="username"
                value={editedAccountInfo.username || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              Name:
              <input
                type="text"
                name="name"
                value={editedAccountInfo.name || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              Age:
              <input
                type="text"
                name="age"
                value={editedAccountInfo.age || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              Gender:
              <input
                type="text"
                name="gender"
                value={editedAccountInfo.gender || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              Pronouns:
              <input
                type="text"
                name="pronouns"
                value={editedAccountInfo.pronouns || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              Email:
              <input
                type="text"
                name="email"
                value={editedAccountInfo.email || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              Profile Image:
              <input
                type="text"
                name="profile_image"
                value={editedAccountInfo.profile_image || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              Banner Image:
              <input
                type="text"
                name="banner_image"
                value={editedAccountInfo.banner_image || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              About Me:
              <input
                type="text"
                name="about_me"
                value={editedAccountInfo.about_me || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              My Story:
              <input
                type="text"
                name="my_story"
                value={editedAccountInfo.my_story || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <div className='mb-3'>
              Preferences:
              <input
                type="text"
                name="preferences"
                value={editedAccountInfo.preferences || ''}
                onChange={handleAccountInfoChange}
              />
            </div>
            <br />
                <div>
                    <input className='btn btn-primary' type='submit' value='Update' />
                </div>
                <br></br>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountUpdate;
