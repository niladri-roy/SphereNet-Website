import React, { useState, useCallback, useEffect } from 'react'
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

const Newsletter = ({ newsletterId , displayComments = true , displayBody = true }) => {  

  const [ auth ] = useAuth()
  const [ newsletter , setNewsletter ] = useState({})

  const getNewsletter = useCallback(async ({ newsletterId }) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/newsletters/${newsletterId}`)
      setNewsletter(response.data.newsletter)
    } catch (error) {
      console.log(error);
    }
  } , [])

  const toggleLike = async (newsletterId , isLiked) => {
    try{
      if(isLiked){
        await axios.put(`${process.env.REACT_APP_API}/v1/api/newsletters/${newsletterId}/dislike`, {
          userId: auth?.user?._id
        })
      } else {
        await axios.put(`${process.env.REACT_APP_API}/v1/api/newsletters/${newsletterId}/like`, {
          userId: auth?.user?._id
        })
      }
      getNewsletter({ newsletterId })
    } catch (error) {
      console.log(error);
    }
  }

  const isLiked = newsletter?.likes?.includes(auth?.user?._id)
  const likedCount = newsletter?.likes?.length
  const commentCount = newsletter?.comments?.length
  const interactionCount = likedCount + commentCount

  useEffect(() => {
    if(newsletterId){
      getNewsletter({ newsletterId })
    }
  }, [newsletterId , getNewsletter])


  return (
    <div className='w-100'>
      <div className='Newsletter br bc c-w bg-g2 newsletter-container p-1 pb-2'>
        <div className='blog-header jc-sb'>
          <div className="post-avatar">
            <Avatar userId={newsletter?.author?._id}/>
          </div>
          <div>
            ...
          </div>
        </div>
        <div className='newsletter-content ml-1 mt-1'>
          <div className="newsletter-title">
            <h4>{newsletter?.title}</h4>
          </div>
          <div className='newsletter-headline c-g9'>
            <h6>{newsletter?.headline}</h6>
          </div>
          <div className='newsletter-tags mt-1 tags'>
            {newsletter?.tags?.map((tag) => (
              <div key={tag}>
                <ViewTags tagId={tag} />
              </div>
            ))}
          </div>
          {
            displayBody && (
              <div className='newsletter-body mt-1'>
                <div>
                  <ReactMarkdown>
                    {newsletter?.content}
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
              toggleLike(newsletterId, isLiked)
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
              <AddComments contentId={newsletterId} contentType={"newsletter"} />
            </div>
            <div className="post-show-comments">
              <GetComments contentId={newsletterId} contentType={"newsletter"} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Newsletter