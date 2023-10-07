import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/auth'

import {
  IoAtSharp
} from 'react-icons/io5'

const GetAllProfiles = () => {

  const navigate = useNavigate();
  // const [ auth ] = useAuth();
  const [ users , setUsers ] = useState([])


  const getAllUsers = useCallback(async () => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users`);
      setUsers(response.data.users);
    }
    catch (error) {
      console.error(error)
    }
  }
  ,[])

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return (
    <div className='all-profiles all-users'>
      <div className="profile-cards">
        {users.map((user) => {
          return (
            <div
              key={user._id}
              className='profile-card br bg-g2 bc c-w ta-cen'
              onClick={()=> navigate(`${user._id}`)}
            >
              <div>
                <div className="profile-card-banner-image">
                  {
                    user?.bannerImage
                    ? <img src={user?.bannerImage} alt="Banner" />
                    : <img src="https://picsum.photos/seed/picsum/200/300" alt="Banner" />
                  }
                </div>
                <div className="profile-card-profile-image">
                  {
                    user?.profileImage
                    ? <img src={user?.profileImage} alt="Profile" />
                    : <img src="https://picsum.photos/seed/picsum/200/300" alt="Profile" />
                  }
                </div>
              </div>
              <div className='pt-1'>
                <div className="profile-name">
                  <h6>{user?.firstName} {user?.lastName}</h6>
                  <p className='c-g9 '>
                    <IoAtSharp />
                    {user?.username}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GetAllProfiles