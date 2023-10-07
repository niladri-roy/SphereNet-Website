import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ShowComments from './ShowComments';

const GetComments = ({ contentId , contentType }) => {

  const [ comments , setComments ] = useState([]);

  const getCommentOnContent = async(contentId, contentType) => {
    try {
      if(contentType === 'post'){
        const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/posts/comments/${contentId}`);
        setComments(response?.data?.comments);
      }
      if(contentType === 'blog'){
        const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/blogs/${contentId}/comments`);
        setComments(response?.data?.comments);
      }
      if(contentType === 'project'){
        const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/projects/${contentId}/comments`);
        setComments(response?.data?.comments);
      }
      if(contentType === 'newsletter'){
        const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/newsletters/${contentId}/comments`);
        setComments(response?.data?.comments);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const reversedComments = [...comments].reverse();
  
  useEffect(() => {
    if(contentId){
      getCommentOnContent(contentId, contentType);
    }
  },[contentId , contentType])

  return (
    <div>
      <div className='p-1 bg-g2 bc br mt-1'>
        {
          comments.length === 0 && (
            <div className='ta-cen c-w'>
              <h6>No Comments</h6>
            </div>
          )
        }
        {
          reversedComments.map((commentId) => (
            <div key={commentId}>
              <ShowComments commentId={commentId} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default GetComments