import React from 'react'
import './Profile.css'
import ProfileHeader from './ProfileHeader'
import ProfileBio from './ProfileBio'
import ProfileEducation from './ProfileEducation'
import ProfileExperience from './ProfileExperience'


const Profile = ({ userId }) => {
  return (
    <div>
      <ProfileHeader userId={userId} />
      <ProfileBio userId={userId} />
      <ProfileEducation userId={userId} />
      <ProfileExperience userId={userId} />
    </div>
  )
}

export default Profile