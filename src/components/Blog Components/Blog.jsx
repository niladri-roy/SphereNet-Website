import React, { useState , useCallback, useEffect } from 'react'
import './Blog.css'
import axios from 'axios'
import ViewTags from '../Tag/ViewTags'
import ReactMarkdown from 'react-markdown'
import { useAuth } from '../../context/auth'
import Avatar from '../Design Elements/Avatar/Avatar';

import { 
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineBarChart,
} from "react-icons/ai";

import AddComments from '../Comments/AddComments'
import GetComments from '../Comments/GetComments'

const Blog = ({ blogId , displayComments = true , displayBody = true }) => {

  const [ auth ] = useAuth()
  const [ blog , setBlog ] = useState({})

  const getBlog = useCallback(async ({ blogId }) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/blogs/${blogId}`)
      setBlog(response.data.blog)
    } catch (error) {
      console.log(error);
    }
  }, [])

  const toggleLike = async (blogId , isLiked) => {
    try{
      if(isLiked){
        await axios.put(`${process.env.REACT_APP_API}/v1/api/blogs/${blogId}/dislike`, {
          userId: auth?.user?._id
        })
      } else {
        await axios.put(`${process.env.REACT_APP_API}/v1/api/blogs/${blogId}/like`, {
          userId: auth?.user?._id
        })
      }
      getBlog({ blogId })
    } catch (error) {
      console.log(error);
    }
  }

  const isLiked = blog?.likes?.includes(auth?.user?._id)
  const likedCount = blog?.likes?.length
  const commentCount = blog?.comments?.length
  const interactionCount = likedCount + commentCount

  useEffect(() => {
    if(blogId){
      getBlog({ blogId })
    }
  }, [blogId , getBlog])

  return (
    <div className='w-100'>
      <div className='Blog br bc c-w bg-g2 blog-container p-1 pb-2'>
        <div className='blog-header jc-sb'>
          <div className='post-avatar'>
            <Avatar userId={blog?.author?._id}/>
          </div>
          <div className="blog-menus pointer">
            ...
          </div>
        </div>
        <div className='blog-content ml-1 mt-1'>
          <div className="blog-title">
            <h4>{blog?.title}</h4>
          </div>
          <div className='blog-headline c-g9'>
            <h6>{blog?.headline}</h6>
          </div>
          <div className='blog-tags mt-1 tags'>
            {blog?.tags?.map((tag) => (
              <div key={tag}>
                <ViewTags tagId={tag} />
              </div>
            ))}
          </div>
          {
            displayBody && (
              <div className='blog-body mt-1'>
                <div>
                  <ReactMarkdown>
                    {blog?.content}
                  </ReactMarkdown>
                </div>
              </div>  
            )
          }
        </div>
        <div className="post-interaction pt-1 pl-1 c-g9">
          <div className="post-like bg-g2 pointer">
            <button onClick={(e) => {
              e.stopPropagation();
              toggleLike(blogId, isLiked)
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
            <p className='pl-05'>{likedCount}</p>
          </div>
          <div className="post-comment pointer jc-sb">
            <div className='post-interaction-button'>
              <AiOutlineComment size='1.4rem' color='var(--blue)' />
            </div>
            <p className='pl-05'>{commentCount}</p>
          </div>
          <div className="post-insight pointer jc-sb">
            <div className='post-interaction-button'>
              <AiOutlineBarChart size='1.4rem' color='var(--purple)' />
            </div>
            <p className='pl-05'>{interactionCount}</p>
          </div>
        </div>
      </div>
      {
        displayComments && (
          <div className="post-comments-container">
            <div className="post-add-comments">
              <AddComments contentId={blogId} contentType={"blog"} />
            </div>
            <div className="post-show-comments">
              <GetComments contentId={blogId} contentType={"blog"} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Blog