import React from 'react'
import './UsersComponent.css'
import { useAuth } from '../../context/auth'

const UserProfileComponent = () => {

  const [ auth ] = useAuth()

  return (
    <div className='user-profile-component br-15 p-1'>
      <div className="user-profile-name">
        <div className="firstName">
          <p>{auth?.user?.firstName}</p>
        </div>
        <div className="lastName">
          <p>{auth?.user?.lastName}</p>
        </div>
      </div>
      <div className="user-username">
        <p>{auth?.user?.username}</p>
      </div>
    </div>
  )
}

export default UserProfileComponent