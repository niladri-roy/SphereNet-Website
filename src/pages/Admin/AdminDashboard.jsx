import React from 'react'
import { Helmet } from 'react-helmet'
import AdminDashboardComponents from '../../components/Feed/Admin Dashboard/AdminDashboardComponents';

const AdminDashboard = () => {

  return (
    <div>
      <Helmet><title>Admin Dashboard</title></Helmet>
      <div className="">
        <AdminDashboardComponents />
      </div>
    </div>
  )
}

export default AdminDashboard