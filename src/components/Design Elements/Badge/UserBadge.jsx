import React, { useCallback, useEffect, useState } from 'react';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import axios from 'axios';
import './badge.css';

const badgeSize = '1.2rem';

const UserBadge = ({ userId }) => {
  const [badgeColor, setBadgeColor] = useState('#ffffff');
  
  // Function to fetch user role and set badge color
  const fetchUserRole = useCallback(async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/role/${userId}`);
      const role = response.data.role;

      // Set the badge color based on the user's role
      switch (role) {
        case 'regular':
          setBadgeColor('#808080');
          break;
        case 'verified':
          setBadgeColor('#0099ff');
          break;
        case 'moderator':
          setBadgeColor('#00ff00');
          break;
        case 'admin':
          setBadgeColor('#ff0040');
          break;
        case 'company':
          setBadgeColor('#ffbf00');
          break;
        default:
          setBadgeColor('#ffffff');
          break;
      }

    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {

    if(userId)
    // Call the fetchUserRole function with the userId
    fetchUserRole(userId);
  }, [userId , fetchUserRole]);

  return (
    <div className="user-badge">
      <HiOutlineBadgeCheck size={badgeSize} color={badgeColor} />
    </div>
  );
};

export default UserBadge;
