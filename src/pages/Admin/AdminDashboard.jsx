import React from 'react'
import { Helmet } from 'react-helmet'
import { useAuth } from '../../context/auth'
import AdminDashboardComponents from '../../components/Feed/Admin Dashboard/AdminDashboardComponents';

const AdminDashboard = () => {

  const [auth] = useAuth();

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