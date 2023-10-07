import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/auth';
import AddProfileEducation from './AddProfileEducation';
import {
  IoTrashOutline,
  IoAdd
} from 'react-icons/io5'

const ProfileEducation = ({ userId }) => {
  
  const [ users , setUsers ] = useState([]);
  const [ auth ] = useAuth();
  const [ isEditEducationOpen, setIsEditEducationOpen ] = useState(false);
  const [ educationArray , setEducationArray ] = useState([]);

  const openEditEducation = () => {
    setIsEditEducationOpen(true);
  }

  const closeEditEducation = () => {
    setIsEditEducationOpen(false);
  }

  const getUserById = async (userId) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/${userId}`);
      setUsers(response.data.user);

    } catch (error) {
      console.error(error)
    }
  }

  const getUserEducation = async (userId) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/educations/${userId}`);
      setEducationArray(response.data.education);

    } catch (error) {
      console.error(error)
    }
  }

  const handleEducationsDelete = async (educationId) => {
    try{
      await axios.delete(`${process.env.REACT_APP_API}/v1/api/educations/${educationId}`);
      await axios.patch(`${process.env.REACT_APP_API}/v1/api/users/educations/${auth?.user?._id}`, {
        educationId
      })
      getUserEducation(userId);

    } catch (error) {
      console.error(error)
    }
  }

  // const formatDate = (nonFormatDate) => {
  //   const months = [
  //     "January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
  //     "November", "December"
  //   ]

  //   const date = new Date(users?.dateOfBirth);
  //   const birthYear = date.getFullYear();
  //   const birthMonth = months[date.getMonth()];
  //   const birthDay = date.getDate();

  //   return `${birthMonth} ${birthDay}, ${birthYear}`
  // }

  useEffect(() => {
    if(userId){
      getUserById(userId);
    }
  }, [userId]);

  useEffect(() => {
    if(userId){
      getUserEducation(userId);
    }
  }, [userId]);

  return (
    <div className='profile-education'>
      <div className="bg-g2 br bc p-1 mt-1 c-w">
        <div className="profile-education-header ai-cen">
          <h6>Education</h6>
          {
            auth?.user?._id === userId ? (<>
              <div className="overlay br bg-g4 bc" style={{ display: isEditEducationOpen ? 'block' : 'none' }}>
                <div className="pointer close-button-container">
                  <div className="close-button" onClick={closeEditEducation}>&times;</div>
                </div>
                <AddProfileEducation />
              </div>
              <button 
                className='btn btn-primary c-w pointer br ai-cen'
                onClick={openEditEducation}
              >
              <IoAdd size={'1.5rem'} color='var(--green)' /> Add
              </button>
            </>) : (<></>)
          }
        </div>
        <div className="profile-education-body">
          {
            educationArray?.map((education) => (
              <div className="profile-education-content bg-g4 p-1 mt-1 br" key={education?._id}>
                <div className="profile-education-content-header pb-1">
                  <h6>{education?.school}</h6>
                  <div className="education-delete">
                    {
                      auth?.user?._id === userId ? (
                        <div className="pointer" onClick={() => handleEducationsDelete(education?._id)}>
                          <IoTrashOutline size={'1.5rem'} color='var(--red)' />
                        </div>
                      ) : (
                        <></>
                      )
                    }
                  </div>
                </div>
                <div className="profile-education-content-body">
                  {
                    !education?.degree ? (<></>) : (
                      <p><span className='h6 c-g9'>Degree : </span>{education?.degree}</p>
                    )
                  }
                  {
                    !education?.fieldOfStudy ? (<></>) : (
                      <p><span className='h6 c-g9'>Field of Study : </span>{education?.fieldOfStudy}</p>
                    )
                  }
                  {
                    !education?.grade ? (<></>) : (
                      <p><span className='h6 c-g9'>Grade : </span>{education?.grade}</p>
                    )
                  }
                  {
                    !education?.description ? (<></>) : (
                      <p><span className='h6 c-g9'>Description : </span>{education?.description}</p>
                    )
                  }
                  {
                    !education?.startDate ? (<></>) : (
                      <p><span className='h6 c-g9'>Start Date : </span>(education?.startDate)</p>
                    )
                  }
                  {
                    !education?.endDate ? (<></>) : (
                      <p><span className='h6 c-g9'>End Date : </span>{education?.endDate}</p>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileEducation