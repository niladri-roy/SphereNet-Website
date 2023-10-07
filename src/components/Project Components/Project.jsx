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

const Project = ({ projectId , displayComments = true , displayBody = true }) => {

  const [ auth ] = useAuth()
  const [ project , setProject ] = useState({})

  const getProject = useCallback(async ({ projectId }) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/projects/${projectId}`)
      setProject(response.data.project)
    } catch (error) {
      console.log(error);
    }
  }, [])

  const toggleLike = async (projectId , isLiked) => {
    try{
      if(isLiked){
        await axios.put(`${process.env.REACT_APP_API}/v1/api/projects/${projectId}/dislike`, {
          userId: auth?.user?._id
        })
      } else {
        await axios.put(`${process.env.REACT_APP_API}/v1/api/projects/${projectId}/like`, {
          userId: auth?.user?._id
        })
      }
      getProject({ projectId })
    } catch (error) {
      console.log(error);
    }
  }

  const isLiked = project?.likes?.includes(auth?.user?._id)
  const likedCount = project?.likes?.length
  const commentCount = project?.comments?.length
  const interactionCount = likedCount + commentCount

  useEffect(() => {
    if(projectId){
      getProject({ projectId })
    }
  }, [projectId , getProject])


  return (
    <div className='w-100'>
      <div className='Project br bc c-w bg-g2 project-container p-1 pb-2'>
        <div className='blog-header jc-sb'>
          <div className="post-avatar">
            <Avatar userId={project?.author?._id} />
          </div>
          <div>
            ...
          </div>
        </div>
        <div className='project-content ml-1 mt-1'>
          <div className='project-title'>
            <h4>{project?.title}</h4>
          </div>
          <div className='project-headline c-g9'>
            <h6>{project?.headline}</h6>
          </div>
          <div className='project-tags mt-1 tags'>
            {project?.tags?.map((tag) => (
              <div key={tag}>
                <ViewTags tagId={tag} />
              </div>
            ))}
          </div>
          { // problem statement , content , solution , challenges , results
            displayBody && (
              <div className='project-body mt-1'>
                <div className="project-problem-statement mb-1">
                  <h6>Problem Statement</h6>
                  <div className='bg-g4 p-1 br'>
                    <ReactMarkdown>{project?.problemStatement}</ReactMarkdown>
                  </div>
                </div>
                <div className="project-content mb-1">
                  <h6>Content</h6>
                  <div className='bg-g4 p-1 br'>
                    <ReactMarkdown>{project?.content}</ReactMarkdown>
                  </div>
                </div>
                <div className="project-solution mb-1">
                  <h6>Solution</h6>
                  <div className='bg-g4 p-1 br'>
                    <ReactMarkdown>{project?.solution}</ReactMarkdown>
                  </div>
                </div>
                <div className="project-challenges mb-1">
                  <h6>Challenges</h6>
                  <div className='bg-g4 p-1 br'>
                    <ReactMarkdown>{project?.challenges}</ReactMarkdown>
                  </div>
                </div>
                <div className="project-results mb-1">
                  <h6>Results</h6>
                  <div className='bg-g4 p-1 br'>
                    <ReactMarkdown>{project?.results}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <div className="post-interaction pt-1 pl-1 c-g9">
          <div className="post-like bg-g2 pointer">
            <button onClick={(e) => {
              e.stopPropagation();
              toggleLike(projectId, isLiked)
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
              <AddComments contentId={projectId} contentType={"project"} />
            </div>
            <div className="post-show-comments">
              <GetComments contentId={projectId} contentType={"project"} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Project