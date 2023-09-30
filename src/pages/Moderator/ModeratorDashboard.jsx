import React from 'react'
import { Helmet } from 'react-helmet'
import { useAuth } from '../../context/auth'
import ModeratorDashboardComponents from '../../components/Feed/Moderator Dashboard/ModeratorDashboardComponents';

const ModeratorDashboard = () => {

  const [auth] = useAuth();

  return (
    <div>
      <Helmet><title>Moderator Dashboard</title></Helmet>
      <div className="">
        <ModeratorDashboardComponents />
      </div>
    </div>
  )
}

export default ModeratorDashboard