import axios from 'axios';
import React, { useEffect, useState } from 'react'

import {
  IoTrashOutline,
  IoHeartOutline,
  // IoHeartSharp,
} from 'react-icons/io5'

import { 
  BiUpvote,
  // BiSolidUpvote,
  BiDownvote,
  // BiSolidDownvote,
  BiReply
} from "react-icons/bi";
import UserBadge from '../Design Elements/Badge/UserBadge';
import { useAuth } from '../../context/auth';

const ShowComments = ({ commentId }) => {

  const [ auth ] = useAuth();
  const [ comment , setComment ] = useState({});
  const [ user , setUser ] = useState({});
  const iconSize = '1.2rem';

  const getComment = async(commentId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/comments/${commentId}`);
      setComment(response.data.comment);
    } catch (error) {
      console.log(error);
    }
  }

  const userId = comment?.author?._id;
  const contentId = comment?.contentId;
  const contentType = comment?.contentType;

  const getUser = async(userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/${userId}`);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteComment = async() => {
    try{
      await axios.delete(`${process.env.REACT_APP_API}/v1/api/comments/${commentId}`);

      if( contentType === 'post' ){
        await axios.patch(`${process.env.REACT_APP_API}/v1/api/posts/comments/${contentId}`, {
          commentId
        });
      }

      window.location.reload();

    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    if(commentId){
      getComment(commentId);
    }
  },[commentId])


  useEffect(() => {
    if(userId){
      getUser(userId);
    }
  }, [userId])
  
  return (
    <div className='show-comments'>
      <div className='c-w bg-g4 br p-1'>
        <div className="comment-container">
          <div className="comment-author-image">
            {
              user?.avatar ? (
                <img src={user?.avatar} alt="avatar" />
              ) : (
                <img src="https://www.redditstatic.com/avatars/avatar_default_02_0079D3.png" alt="avatar" />
              )
            }
          </div>
          <div className="comment-author-content-menus">
            <div className="comment-author-details">
              <div className="comment-author-name-badge">
                <div className='comment-author-name'>
                  <h4>
                    {user?.firstName} {user?.lastName}
                  </h4>
                </div>
                <div className="comment-author-badge">
                  <UserBadge userId={userId} />
                </div>
              </div>
              <div className="comment-author-username"></div>
            </div>
            <div className="comment-content">
              {comment?.content}
            </div>
            <div className="comment-menus">
              <div className="comment-menu comment-upvote">
                <BiUpvote size={iconSize} color='var(--green)'/>
              </div>
              <div className="comment-menu comment-downvote">
                <BiDownvote size={iconSize} color='var(--red)'/>
              </div>
              <div className="comment-menu comment-reply">
                <BiReply size={iconSize} color='var(--blue)'/>
              </div> {/* Future Update Not Now */}
              <div className="comment-menu comment-author-love">
                <IoHeartOutline size={iconSize} color='var(--purple)'/>
              </div>
              {
                comment?.author?._id === auth?.user?._id ? (
                  <div className="comment-menu comment-author-delete" onClick={handleDeleteComment}>
                    <IoTrashOutline size={iconSize} color='var(--red)'/>
                  </div>
                ) : (
                  <></>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowComments