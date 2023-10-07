import React , { useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'

const AddProfileExperience = () => {

  const [ auth ] = useAuth();
  const [ title , setTitle ] = useState('');
  const [ employmentType , setEmploymentType ] = useState('');
  const [ company , setCompany ] = useState('');
  const [ location , setLocation ] = useState('');
  const [ description , setDescription ] = useState('');
  const [ startDate , setStartDate ] = useState('');
  const [ endDate , setEndDate ] = useState('');

  const postExperiences = async () => {
    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/v1/api/experiences`, {
        userId : auth?.user?._id,
        title,
        employmentType,
        company,
        location,
        description,
        startDate,
        endDate
      })

      if(response){
        const experienceId = response?.data?.experience?._id;

        await axios.post(`${process.env.REACT_APP_API}/v1/api/users/experiences/${auth?.user?._id}`, {
          experienceId,
        })
      }

      window.location.reload();
      setTitle('');
      setEmploymentType('');
      setCompany('');
      setLocation('');
      setDescription('');
      setStartDate('');
      setEndDate('');

    } catch (error) {
      console.error(error)
    }
  }

  const handlePostExperiences = (e) => {
    e.preventDefault();
    postExperiences();
  }

  return (
    <div className='add-profile-experience pr-1 pl-1'>
      <div className='bg-g2 br p-1 mt-1 c-w'>
        <form onSubmit={handlePostExperiences}>
          <div className='mb-1'>
            <input
              type='text'
              placeholder='Company'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className='w-100'
            />
          </div>
          <div className='mb-1'>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-100'
            />
          </div>
          <div className='mb-1'>
            <input
              type='text'
              placeholder='Employment Type'
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className='w-100'
            />
          </div>
          <div className='mb-1'>
            <input
              type='text'
              placeholder='Location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='w-100'
            />
          </div>
          <div className='mb-1'>
            <textarea
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-100'
            />
          </div>
          <div className='mb-1'>
            <input
              type='date'
              placeholder='Start Date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className='w-100'
            />
          </div>
          <div className='mb-1'>
            <input
              type='date'
              placeholder='End Date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='w-100'
            />
          </div>
          <div className='text-right'>
            <button className='btn btn-primary br c-w pointer'>Add Experience</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProfileExperience