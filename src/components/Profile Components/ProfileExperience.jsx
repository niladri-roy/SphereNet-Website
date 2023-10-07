import React , { useEffect , useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/auth';
import AddProfileExperience from './AddProfileExperience';
import {
  IoTrashOutline,
  IoAdd
} from 'react-icons/io5'

const ProfileExperience = ({ userId }) => {

  const [ users , setUsers ] = useState([]);
  const [ auth ] = useAuth();
  const [ isEditExperienceOpen, setIsEditExperienceOpen ] = useState(false);
  const [ experienceArray , setExperienceArray ] = useState([]);

  const openEditExperience = () => {
    setIsEditExperienceOpen(true);
  }

  const closeEditExperience = () => {
    setIsEditExperienceOpen(false);
  }

  const getUserById = async (userId) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/${userId}`);
      setUsers(response.data.user);

    } catch (error) {
      console.error(error)
    }
  }

  const getUserExperience = async (userId) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/experiences/${userId}`);
      setExperienceArray(response.data.experience);

    } catch (error) {
      console.error(error)
    }
  }

  const handleExperiencesDelete = async (experienceId) => {
    try{
      await axios.delete(`${process.env.REACT_APP_API}/v1/api/experiences/${experienceId}`);
      await axios.patch(`${process.env.REACT_APP_API}/v1/api/users/experiences/${auth?.user?._id}`, {
        experienceId
      })
      getUserExperience(userId);

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(userId){
      getUserById(userId);
    }
  }, [userId]);

  useEffect(() => {
    if(userId){
      getUserExperience(userId);
    }
  }, [userId]);

  const formatDate = (nonFormatDate) => {
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
      "November", "December"
    ]

    const date = new Date(users?.dateOfBirth);
    const Year = date.getFullYear();
    const Month = months[date.getMonth()];
    // const Day = date.getDate();

    return `${Month}, ${Year}`
  }

  return(
    <div className="profile-experience">
      <div className='bg-g2 br bc p-1 mt-1 c-w'>
        <div className='profile-experience-header jc-sb ai-cen'>
          <h6>Experience</h6>
          {
            auth?.user?._id === userId ? (<>
              <div className="overlay br bg-g4 bc" style={{ display: isEditExperienceOpen ? 'block' : 'none' }}>
                <div className="pointer close-button-container">
                  <div className='close-button' onClick={closeEditExperience}>&times;</div>
                </div>
                <AddProfileExperience />
              </div>
              <button
                className='btn btn-primary c-w pointer br ai-cen'
                onClick={openEditExperience}
              >
              <IoAdd size={'1.5rem'} color='var(--green)' /> Add
              </button>
            </>) : (<></>)
          }
        </div>
        <div className='profile-experience-body'>
          {
            experienceArray?.map((experience) => (
              <div className='profile-experience-body-item bg-g4 br p-1 mt-1 c-w' key={experience?._id}>
                <div className='profile-experience-body-item-header jc-sb ai-cen'>
                  <h6>{experience?.company}</h6>

                  {
                    auth?.user?._id === userId ? (<>
                      <div className='pointer' onClick={() => handleExperiencesDelete(experience?._id)}>
                        <IoTrashOutline size={'1.5rem'} color='var(--red)' />
                      </div>
                    </>) : (<></>)
                  }
                </div>
                <div className='profile-experience-content-body'>
                {
                  !experience?.title ? (<></>) : (
                    <p><span className='h6 c-g9'>Title : </span>{experience?.title}</p>
                  )
                }
                {
                  !experience?.employmentType ? (<></>) : (
                    <p><span className='h6 c-g9'>Employment Type : </span>{experience?.employmentType}</p>
                  )
                }
                {
                  !experience?.location ? (<></>) : (
                    <p><span className='h6 c-g9'>Location : </span>{experience?.location}</p>
                  )
                }
                {
                  !experience?.description ? (<></>) : (
                    <p><span className='h6 c-g9'>Description : </span>{experience?.description}</p>
                  )
                }
                {
                  !experience?.startDate ? (<></>) : (
                    <p><span className='h6 c-g9'>Start Date : </span>{formatDate(experience?.startDate)}</p>
                  )
                }
                {
                  !experience?.endDate ? (<></>) : (
                    <p><span className='h6 c-g9'>End Date : </span>{formatDate(experience?.endDate)}</p>
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

export default ProfileExperience