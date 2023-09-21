import React, { useState , useEffect } from 'react'
import { useAuth } from '../../context/auth'
import './Feed.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import CreateContent from '../Create Content/CreateContent';

import {
  IoHeartOutline,
  IoHeart
} from "react-icons/io5";

import Post from '../Post Components/Post';
import { LikeButton } from '../Design Elements/Button/Button';

const Feed = () => {

  const navigate = useNavigate();
  const [ auth ] = useAuth();
  const [ posts , setPosts ] = useState([]);

  //Get All Posts
  const getAllPosts = async () => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/post/get-posts`);
      setPosts(response.data.posts);

    } catch (error) {
      console.log(error);
    }
  }

  const postIds = posts.map(post => post._id);

  const toggleLike = async (postId, isLiked) => {

    try {
      if (isLiked) {
        // If the post is already liked, send an unlike request
        await axios.put(`${process.env.REACT_APP_API}/post/dislike/${postId}`, {
          userId: auth?.user?._id, // Pass the user's ID
        });
      } else {
        // If the post is not liked, send a like request
        await axios.put(`${process.env.REACT_APP_API}/post/like/${postId}`, {
          userId: auth?.user?._id, // Pass the user's ID
        });
      }
      getAllPosts();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();  
  }, [])

  return (
    <div className='the-feed'>
      <div className="feed-greetings a-feed-div table-of-contents">
        <h3 className="feed-greetings-text">Welcome back, {auth?.user?.firstName}</h3>
      </div>
      <CreateContent />
      {
        postIds.map((p) => {
          return (
            <div key={p} onClick={() => navigate(`/post/${p}`)}>
              <Post postId={p} />
            </div>
          )
        })
      }
      {posts.map((post) => {

        const isLiked = post.likes.includes(auth?.user?._id);

        return (
          <div className="feed-post a-feed-div bc bg-g1" key={post._id} onClick={() => navigate(`/post/${post._id}`)}>
            <div className="feed-post-header">
              <h3 className="feed-post-title">{post.title}</h3>
              <p className="feed-post-author">By: {post.author.firstName}</p>
            </div>
            <div className="feed-post-body">
              <p className="feed-post-content">{post.content}</p>
            </div>
            <div>
              <LikeButton></LikeButton>
            </div>
            <button onClick={(e) => {
                e.stopPropagation();
                toggleLike(post._id , isLiked)}}>
              {
                isLiked? (
                  <div className="like-post p-1">
                    <div className="dislike-post-icon hover-hide-parent">
                      <IoHeart color='red' size='1.5rem' />
                    </div>
                    <div className='hover-hide'>DisLike</div>
                  </div>
                ) : (
                  <div className="like-post p-1">
                    <div className="like-post-icon hover-hide-parent">
                      <IoHeartOutline color='red' size='1.5rem' />
                    </div>
                    <div className='hover-hide'>Like</div>
                  </div>
                )
              }
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Feed;