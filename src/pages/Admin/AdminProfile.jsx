import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenus from '../../components/Menus/adminMenus'
import UserProfileComponent from '../../components/Users/userProfileComponent'


const AdminProfile = () => {

  return (
    <Layout title={"Your Profile"}>
      <div className="feeds-container container">
        <AdminMenus />
        <div className='w-100'>
          <UserProfileComponent />
        </div>
      </div>
    </Layout>
  )

}

export default AdminProfile