import React from 'react'
import { Helmet } from 'react-helmet'
import MyConnectsComponents from '../../components/Feed/My Connects/MyConnectsComponents'

const MyConnects = () => {
  return (
    <div>
      <Helmet><title>My Connects</title></Helmet>
      <div className="">
        <MyConnectsComponents />
      </div>
    </div>
  )
}

export default MyConnects
