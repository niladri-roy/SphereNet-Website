import React , { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import CreatePost from './CreatePost';

const GetAllPosts = () => {
  
  const navigate = useNavigate();
  const [ posts , setPosts ] = useState([]);

  const getAllPosts = async() => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/posts`);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, [])

  return(
    <div>
    <CreatePost />
    <div className='mt-1'>
      {
        posts.map((p) => {
          return (
            <div
              key={p._id}
              onClick={() => navigate(`${p._id}`)}
              className='mt-1'
            >
              <Post postId={p._id} displayComments={false} />
            </div>
          )
        })
      }
    </div>
    </div>
  )
}

export default GetAllPosts;