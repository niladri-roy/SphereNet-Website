import React, { useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'

const AddProfileEducation = () => {

  const [ auth ] = useAuth();
  const [ school , setSchool ] = useState('');
  const [ degree , setDegree ] = useState('');
  const [ fieldOfStudy , setFieldOfStudy ] = useState('');
  const [ grade , setGrade ] = useState('');
  const [ description , setDescription ] = useState('');
  const [ startDate , setStartDate ] = useState('');
  const [ endDate , setEndDate ] = useState('');

  const postEducations = async () => {
    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/v1/api/educations`, {
        userId : auth?.user?._id,
        school,
        degree,
        fieldOfStudy,
        grade,
        description,
        startDate,
        endDate
      })

      if(response){
        const educationId = response?.data?.education?._id;

        await axios.post(`${process.env.REACT_APP_API}/v1/api/users/educations/${auth?.user?._id}`, {
          educationId,
        })
      }

      window.location.reload();
      setSchool('');
      setDegree('');
      setFieldOfStudy('');
      setGrade('');
      setDescription('');
      setStartDate('');
      setEndDate('');

    } catch (error) {
      console.error(error)
    }
  } 

  const handlePostEducations = (e) => {
    e.preventDefault();
    postEducations();
  }


  return (
    <div className='add-profile-education pr-1 pl-1'>
      <div className='bg-g2 br p-1 mt-1 c-w'>
        <form onSubmit={handlePostEducations}>
          <div className='form-group'>
            <label htmlFor='school'>School</label>
            <input
              type='text'
              className='form-control'
              id='school'
              placeholder='Enter school'
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='degree'>Degree</label>
            <input
              type='text'
              className='form-control'
              id='degree'
              placeholder='Enter degree'
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='fieldOfStudy'>Field Of Study</label>
            <input
              type='text'
              className='form-control'
              id='fieldOfStudy'
              placeholder='Enter field of study'
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='grade'>Grade</label>
            <input
              type='text'
              className='form-control'
              id='grade'
              placeholder='Enter grade'
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              className='form-control'
              id='description'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='startDate'>Start Date</label>
            <input
              type='text'
              className='form-control'
              id='startDate'
              placeholder='Enter start date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='endDate'>End Date</label>
            <input
              type='text'
              className='form-control'
              id='endDate'
              placeholder='Enter end date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary c-w pointer br mt-1'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProfileEducation