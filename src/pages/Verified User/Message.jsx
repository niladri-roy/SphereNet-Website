import React from 'react'
import { Helmet } from 'react-helmet'
import MessageComponents from '../../components/Feed/Chats/ChatsComponents'

const Message = () => {

  return (
    <div>
      <Helmet><title>Your Chats</title></Helmet>
      <div className="">
        <MessageComponents />
      </div>
    </div>
  )
}

export default Message