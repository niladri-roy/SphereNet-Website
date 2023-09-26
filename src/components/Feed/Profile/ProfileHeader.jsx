import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Profile.css'

import aVa from '../../../assets/images/avatar/default-avatar.jpg'
// import aVa from '../../../assets/images/avatar/default-avatar.png'
import aBa from '../../../assets/images/avatar/default-banner.jpeg'

import UserBadge from '../../Design Elements/Badge/UserBadge'
import { useAuth } from '../../../context/auth';

import { 
  IoAtSharp,
  IoBalloonOutline,
  IoLocationOutline,
  IoCalendarOutline,

} from 'react-icons/io5';
import EditProfile from './EditProfile';

const ProfileHeader = ({ userId }) => {  

  const [ auth ] = useAuth();
  const [ users , setUsers ] = useState([]);
  const [ isEditProfileOpen , setIsEditProfileOpen ] = useState(true);

  const openEditProfile = () => {
    setIsEditProfileOpen(true);
  }

  const closeEditProfile = () => {
    setIsEditProfileOpen(false);
  }

  const getUser = async (userId) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/${userId}`);
      setUsers(response.data.user);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(userId) {
      getUser(userId);
    }
  },[userId]);

  console.log(users);

  const formatProfileDate = (timestamp) => {
    const months = [
      "January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"
    ]

    const date = new Date(users?.profileCreated);
    const joinedYear = date.getFullYear();
    const joinedMonth = months[date.getMonth()];

    return `Joined In ${joinedMonth} ${joinedYear}`
  }

  const timestamp = users?.profileCreated;
  const profileCreated = formatProfileDate(timestamp);

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
                !auth?.user?.id === userId ? 
                (
                <div></div>
                ) : (
                <div>
                  <div className="overlay br bg-g4 bc" style={{ display : isEditProfileOpen ? 'block' : 'none' }}>
                    <div className='pointer close-button-container '>
                      <div className='close-button' onClick={closeEditProfile}>&times;</div>
                    </div>
                    <EditProfile userId={userId} />
                  </div>
                  <div className='pointer edit-profile-button' onClick={openEditProfile}>
                    <p>Edit Profile</p>
                  </div>
                </div>
                )
              }
            </div>
          </div>
        </div>
        <div className='profile-user-details pr-1 pl-1 pt-2'>
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
          <div className='profile-user-location-birth-joined'>
            {
              !users?.location? (<></>) :                 
                (
                <div className="profile-user-location flex-container" style={{ gap : '.5rem'}}>
                  <IoLocationOutline size={'1.02rem'} color='var(--red)'/>
                  <p>{users?.location}</p>
                </div>
              )
            }
            {
              !users?.dateOfBirth? (<></>) :
              (
              <div className="profile-user-dateOfBirth flex-container ai-cen" style={{ gap : '.5rem'}} >
                <IoBalloonOutline size={'1.02rem'} color='var(--green)'/>
                <p>{users?.dateOfBirth}</p>
              </div>
              )
            }
            {
              !users?.profileCreated? (<></>) :
              (
              <div className="profile-user-joinedIn flex-container ai-cen" style={{ gap : '.5rem'}}>
                <IoCalendarOutline size={'1.02rem'} color='var(--blue)'/>
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