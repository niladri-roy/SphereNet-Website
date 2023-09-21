import React, { useEffect, useState } from 'react'
import './Tag.css'
import axios from 'axios'

const ViewTags = ({ tagId }) => {
  const [ tags , setTags ] = useState([])

  const getTagById = async ({ tagId }) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/tags/${tagId}`)
      setTags(response.data.tag)

    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    if(tagId) {
      getTagById({ tagId })
    }
  }, [tagId])

  return (
    <div className='tag pointer br'>
      <p>{tags?.name}</p>
    </div>
  )
}

export default ViewTags