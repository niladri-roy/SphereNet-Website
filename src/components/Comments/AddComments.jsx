import React , { useState } from 'react'
import { IoSendOutline } from "react-icons/io5";
import { useAuth } from '../../context/auth';
import './Comment.css'
import axios from 'axios';

const AddComments = ({ contentId , contentType}) => {

  const [ auth ] = useAuth();
  const [ content , setContent ] = useState('');

  //content Type : "post" , "blog" , "project" , "newsletter"
  const postComments = async ({ contentId , contentType }) => {
    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/v1/api/comments`, {
        author : auth?.user?._id,
        contentId,
        contentType,
        content
      })

      if(response){
        const commentId = response?.data?.comment?._id;

        if(contentType === 'post'){
          await axios.put(`${process.env.REACT_APP_API}/v1/api/posts/comments/${contentId}`, {
            commentId,
          })
        }
        
        if(contentType === 'blog'){
          await axios.put(`${process.env.REACT_APP_API}/v1/api/blogs/${contentId}/comments`, {
            commentId,
          })
        }

        if(contentType === 'project'){
          await axios.put(`${process.env.REACT_APP_API}/v1/api/projects/${contentId}/comments`, {
            commentId,
          })
        }

        if(contentType === 'newsletter'){
          await axios.put(`${process.env.REACT_APP_API}/v1/api/newsletters/${contentId}/comments`, {
            commentId,
          })
        }
      }

      window.location.reload();
      setContent('')

    } catch (error) {
      console.log(error);
    }
  }

  const handlePostComments = async (e) => {
    e.preventDefault();
    postComments({ contentId , contentType });
  }

  return (
    <div className='mt-1'>
      <div className="Comments p-1 bg-g2 br bc c-w">
        <div className='add-comments-container'>
          <form className="comment-submit w-100">
            <div className="comment-content w-100">
              <input
                className='w-100 bg-g2 c-w'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Write your comment...'
                required
              >
              </input>
            </div>
            <button type="submit" className="comment-post-button pointer ml-1" onClick={handlePostComments}>
              <IoSendOutline color='var(--blue)' size='1.4rem' />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddComments