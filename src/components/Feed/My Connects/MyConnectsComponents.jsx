import React from 'react'
import './MyConnectsComponents.css'
import GetAllProfiles from '../../Profile Components/GetAllProfiles'
import Notifications from '../../Profile Components/Notifications'

const MyConnectsComponents = () => {
  return (
    <div>
      <Notifications />
      <GetAllProfiles />
    </div>
  )
}

export default MyConnectsComponents