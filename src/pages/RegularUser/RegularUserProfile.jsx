import React from 'react'
import Layout from '../../components/Layouts/Layout'
import UserMenus from '../../components/Menus/userMenus'
import UserProfileComponent from '../../components/Users/userProfileComponent'

const UserProfile = () => {

  return (
    <Layout title={"Your Profile"}>
      <div className="feeds-container container">
        <UserMenus />
        <div className='w-100'>
          <UserProfileComponent />
        </div>
      </div>
    </Layout>
  )
}

export default UserProfile