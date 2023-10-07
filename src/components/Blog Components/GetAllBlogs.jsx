import React , { useState , useEffect } from 'react'
import CreateBlog from './CreateBlog'
import axios from 'axios'
import Blog from './Blog'
import { useNavigate } from 'react-router-dom'

const GetAllBlogs = () => {

  const navigate = useNavigate();
  const [ blogs , setBlogs ] = useState([]);
 
  const getAllBLogs = async () => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/blogs`)
      setBlogs(response.data.blogs)

    } catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBLogs();
  }, [])

  return (
    <div>
      <CreateBlog />
      <div className='mt-1'>
        {
          blogs.map((blog , index) => {
            return (
              <div
                key={blog._id}
                onClick={() => navigate(`${blog._id}`)}
                className='mt-1'
              >
                <Blog blogId={blog._id} displayBody = {false} displayComments = {false}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default GetAllBlogs