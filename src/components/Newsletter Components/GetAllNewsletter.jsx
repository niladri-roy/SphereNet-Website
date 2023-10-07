import React , { useState, useEffect } from 'react'
import CreateNewsletter from './CreateNewsletter'
import axios from 'axios'
import Newsletter from './Newsletter'
import { useNavigate } from 'react-router-dom'

const GetAllNewsletter = () => {

  const navigate = useNavigate();
  const [ newsletters , setNewsletters ] = useState([]);

  const getAllNewsletters = async () => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/newsletters`)
      setNewsletters(response.data.newsletters)

    } catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    getAllNewsletters();
  }, [])

  console.log(newsletters);

  return (
    <div>
      <CreateNewsletter />
      <div className='mt-1'>
        {
          newsletters.map((newsletter , index) => {
            return (
              <div
                key={newsletter._id}
                onClick={() => navigate(`${newsletter._id}`)}
                className='mt-1'
              >
                <Newsletter newsletterId={newsletter._id} displayBody = {false} displayComments = {false}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default GetAllNewsletter