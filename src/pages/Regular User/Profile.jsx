import React from 'react'
import { Helmet } from 'react-helmet'
import { useAuth } from '../../context/auth'
import ProfileComponents from '../../components/Feed/Profile/ProfileComponents'

const Profile = () => {

  const [auth] = useAuth();

  return (
    <div>
      <Helmet><title>{auth?.user?.firstName}
        {
          auth?.user?.lastName
            ? ' ' + auth?.user?.lastName
            : ''
        }
      </title></Helmet>
      <div className=''>
        <ProfileComponents />
      </div>
    </div>
  )
}

export default Profile