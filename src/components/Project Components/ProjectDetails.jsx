import React from 'react'
import { useParams } from 'react-router-dom'
import Project from './Project'

const ProjectDetails = () => {

  const params = useParams();

  return (
    <div className='project-detail-page bg-g1 w-100'>
      <Project projectId={params?._id} />
    </div>
  )
}

export default ProjectDetails