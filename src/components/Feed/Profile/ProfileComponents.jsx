import React from 'react'
import { useAuth } from '../../../context/auth'
import Profile from '../../Profile Components/Profile';

const ProfileComponents = () => {

  const [ auth ] = useAuth();

  return (
    <div>
      <Profile userId={auth?.user?._id}/>
    </div>
  )
}

export default ProfileComponents