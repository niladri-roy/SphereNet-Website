import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Avatar from '../Design Elements/Avatar/Avatar';
import ReactMarkdown from 'react-markdown';
import ViewTags from '../Tag/ViewTags';
import { useAuth } from '../../context/auth';

import { 
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineBarChart,
  AiOutlineShareAlt
} from "react-icons/ai";

import AddComments from '../Comments/AddComments';
import GetComments from '../Comments/GetComments';


const Post = ({ postId , displayComments = true }) => {

  const [ auth ] = useAuth();
  const [post, setPost] = useState({});

  const getPost = useCallback(async ({ postId }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/posts/${postId}`);
      setPost(response.data.post);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleLike = async (postId, isLiked) => {

    try {
      if (isLiked) {
        // If the post is already liked, send an unlike request
        await axios.put(`${process.env.REACT_APP_API}/v1/api/posts/dislike/${postId}`, {
          userId: auth?.user?._id, // Pass the user's ID
        });
      } else {
        // If the post is not liked, send a like request
        await axios.put(`${process.env.REACT_APP_API}/v1/api/posts/like/${postId}`, {
          userId: auth?.user?._id, // Pass the user's ID
        });
      }
      getPost({ postId });

    } catch (error) {
      console.log(error);
    }
  };

  const isLiked = post?.likes?.includes(auth?.user?._id);
  const likedCount = post?.likes?.length;

  useEffect(() => {
    if (postId) {
      getPost({ postId });
    }
  }, [postId, getPost]);

  return (
  <div className='w-100'>
    <div className="Post br bc c-w bg-g2">
      <div className="post-container m-2">
        <div className="post-header">
          <div className="post-avatar">
            <Avatar userId={post?.author?._id} />
          </div>
          <div className="post-menu pointer">
            ...
          </div>
        </div>
        <div className="post-content-container pl-5">
          <div className="post-content pb-1">
            <ReactMarkdown>{post?.content}</ReactMarkdown>
          </div>
          <div className="post-media">
            {post?.media}
          </div>
          <div className="post-tags tags">
            {post?.tags?.map((tag) => (
              <div key={tag}>
                <ViewTags tagId={tag} />
              </div>
            ))}
          </div>
        </div>
        <div className="post-interaction pl-5 pt-2  c-g9">
          <div className="post-like bg-g2 pointer">
            <button onClick={(e) => {
              e.stopPropagation();
              toggleLike(postId, isLiked)
            }}
            className='bg-g2 pointer'>
              {
                isLiked ? (
                  <div className="bg-g2 post-interaction-button">
                    <AiFillHeart color='var(--red)' size='1.4rem' />
                  </div>
                ) : (
                  <div className="bg-g2 post-interaction-button">
                    <AiOutlineHeart color='var(--red)' size='1.4rem' />
                  </div>
                )
              }
            </button>
            <p>{likedCount}</p>
          </div>
          <div className="post-comment pointer">
            <div className='post-interaction-button'>
              <AiOutlineComment size='1.4rem' color='var(--blue)' />
            </div>
          </div>
          <div className="post-insight pointer">
            <div className='post-interaction-button'>
              <AiOutlineBarChart size='1.4rem' color='var(--purple)' />
            </div>
          </div>
          <div className="post-share pointer">
            <div className='post-interaction-button'>
              <AiOutlineShareAlt size='1.4rem' color='var(--orange)' />
            </div>
          </div>
        </div>
      </div>
    </div>
    {
      displayComments && (
        <div className="post-comments-container">
          <div className="post-add-comments">
            <AddComments contentId={postId} contentType={"post"} />
          </div>
          <div className="post-show-comments">
            <GetComments contentId={postId} contentType={"post"} />
          </div>
        </div>
      )
    }
  </div>
  )
}

export default Post;
