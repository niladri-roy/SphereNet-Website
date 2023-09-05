import React from 'react'
import './UsersComponent.css';
import { useAuth } from '../../context/auth';

const FeedProfile = () => {

  const [ auth ] = useAuth()

  return (
    <div className='feed-profile regular-shadow p-1'>
      <div className="feed-profile-name">
        <h5>{auth?.user?.firstName}</h5>
      </div>
    </div>
  )
}

export default FeedProfile