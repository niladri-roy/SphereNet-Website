import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Profile.css'

import aVa from '../../assets/images/avatar/default-avatar.jpg'
// import aVa from '../../../assets/images/avatar/default-avatar.png'
import aBa from '../../assets/images/avatar/default-banner.jpeg'

import UserBadge from '../Design Elements/Badge/UserBadge'
import { useAuth } from '../../context/auth';

import {
  IoAtSharp,
  IoBalloonOutline,
  IoLocationOutline,
  IoCalendarOutline,

} from 'react-icons/io5';
import EditProfile from './EditProfile';

const ProfileHeader = ({ userId }) => {

  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const openEditProfile = () => {
    setIsEditProfileOpen(true);
  }

  const closeEditProfile = () => {
    setIsEditProfileOpen(false);
  }

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/${userId}`);
      setUsers(response.data.user);

    } catch (error) {
      console.log(error);
    }
  }

  console.log(users);
  console.log(auth?.user);

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  const timestamp = users?.profileCreated;

  const formatProfileDate = (timestamp) => {
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    const date = new Date(users?.profileCreated);
    const joinedYear = date.getFullYear();
    const joinedMonth = months[date.getMonth()];

    return `Joined In ${joinedMonth} ${joinedYear}`
  }

  const profileCreated = formatProfileDate(timestamp);

  const dateOfBirthTime = users?.dateOfBirth;

  const formatBirthDate = (dateOfBirthTime) => {
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
      "November", "December"
    ]

    const date = new Date(users?.dateOfBirth);
    const birthYear = date.getFullYear();
    const birthMonth = months[date.getMonth()];
    const birthDay = date.getDate();

    return `${birthMonth} ${birthDay}, ${birthYear}`
  }

  const dateOfBirth = formatBirthDate(dateOfBirthTime);

  const toggleFollow = async () => {
    try {
      if (users?.followers?.includes(auth?.user?._id)) {
        // If the user is already followed, send an unfollow request
        await axios.patch(`${process.env.REACT_APP_API}/v1/api/users/connections/${userId}/followers`, {
          followerId: auth?.user?._id, // Pass the user's ID
        });
      } else {
        // If the user is not followed, send a follow request
        await axios.put(`${process.env.REACT_APP_API}/v1/api/users/connections/${userId}/followers`, {
          followerId: auth?.user?._id, // Pass the user's ID
        });
      }
      getUser(userId);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-100 profile-header'>
      <div className="bg-g2 c-w br bc pb-1">
        <div className="banner-image">
          <img src={users?.banner ? users?.banner : aBa} alt="banner" />
        </div>
        <div className='profile-image-and-menu'>
          <div className="profile-image">
            <img src={users?.avatar ? users?.avatar : aVa} alt="avatar" />
          </div>
          <div className='profile-menus pr-1 pt-1'>
            <div className="profile-menu profile-menu-1">
              {
                auth?.user?._id === userId ?
                  (
                    <div>
                      <div className="overlay br bg-g4 bc" style={{ display: isEditProfileOpen ? 'block' : 'none' }}>
                        <div className='pointer close-button-container '>
                          <div className='close-button' onClick={closeEditProfile}>&times;</div>
                        </div>
                        <EditProfile userId={userId} />
                      </div>
                      <div className='pointer edit-profile-button br' onClick={openEditProfile}>
                        <p>Edit Profile</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="btn-primary br pointer" onClick={toggleFollow}>
                        <p>{users?.followers?.includes(auth?.user?._id) ? 'Unfollow' : 'Follow'}</p>
                      </div>
                    </>
                  )
              }
            </div>
          </div>
        </div>
        <div className='profile-user-details p-1'>
          <div className="profile-user-name-and-badge">
            <div className="profile-user-name">
              <h2>{users?.firstName} {users?.lastName}</h2>
            </div>
            <div className="profile-user-badge">
              <UserBadge userId={userId} />
            </div>
          </div>
          <div className="profile-username c-g9">
            <p><IoAtSharp size={'1.02rem'} />{users?.username}</p>
          </div>
          <div className="profile-headline c-g9 pt-1">
            {/* <h6>Its a check Headline</h6> */}
            <h6>{users?.headline}</h6>
          </div>
          <div className='profile-user-location-birth-joined pt-1'>
            {
              !users?.location ? (<></>) :
                (
                  <div className="profile-user-location flex-container ai-cen" style={{ gap: '.5rem' }}>
                    <IoLocationOutline size={'1.02rem'} color='var(--red)' />
                    <p>{users?.location}</p>
                  </div>
                )
            }
            {
              !users?.dateOfBirth ? (<></>) :
                (
                  <div className="profile-user-dateOfBirth flex-container ai-cen" style={{ gap: '.5rem' }} >
                    <IoBalloonOutline size={'1.02rem'} color='var(--green)' />
                    <p>{dateOfBirth}</p>
                  </div>
                )
            }
            {
              !users?.profileCreated ? (<></>) :
                (
                  <div className="profile-user-joinedIn flex-container ai-cen" style={{ gap: '.5rem' }}>
                    <IoCalendarOutline size={'1.02rem'} color='var(--blue)' />
                    <p>{profileCreated}</p>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader