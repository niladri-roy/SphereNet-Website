import React from 'react';
import Profile from './Profile';
import { useParams } from 'react-router-dom';

const ProfileDetails = () => {

  const params = useParams();
  console.log(params?._id)

  return (
    <div>
      <Profile userId={params?._id} />
    </div>
  )
}

export default ProfileDetails