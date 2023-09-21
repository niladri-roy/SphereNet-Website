import React , { useState , useEffect } from 'react';
import './Avatar.css';
import axios from 'axios';
import aVa from '../../../assets/images/avatar/default-avatar.png';
import UserBadge from '../Badge/UserBadge.jsx';

import { IoAtSharp } from 'react-icons/io5';

const Avatar = ({ userId }) => {
  const [ currentUser , setCurrentUser ] = useState({});

  const getUserPersonalInfo = async ({ userId }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/auth/find-user/${userId}`);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(userId){
      getUserPersonalInfo({ userId });
    }
  }, [userId]);
  
  return (
    <div className="avatar">
      <div className="avatar-image-container">
        <div className="avatar-image pointer">
          {
            currentUser?.profilePicture ? (
              <img src={currentUser?.profilePicture} alt="avatar-pic" />
            ) : (
              <img src={aVa} alt="no-avatar-pic" />
            )
          }
        </div>
      </div>
      <div className="avatar-info-container">
        <div className="avatar-name-badge-username">
          <div className="avatar-name pointer">
            <h5>
              {currentUser?.firstName} {currentUser?.lastName}
            </h5>
          </div>
          <div className="avatar-badge">
            <UserBadge userId={userId} />
          </div>
          <div className="avatar-username c-g9 pointer">
            <p>
              <IoAtSharp size={'1.05rem'} /> {currentUser?.username}
            </p>
          </div>
        </div>
        <div className="avatar-headline c-g9">
          <h6>
            {currentUser?.headline}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default Avatar