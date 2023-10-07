import React from 'react'
import CreateProjects from './CreateProjects'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Project from './Project'
import { useNavigate } from 'react-router-dom';

const GetAllProjects = () => {

  const navigate = useNavigate();
  const [projects, setProjects] = useState([])

  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/projects`)
      setProjects(response.data.projects)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProjects();
  }, [])


  return (
    <div>
      <CreateProjects />
      <div className='mt-1'>
        {
          projects.map((project, index) => {
            return (
              <div
                key={project._id}
                onClick={() => navigate(`${project._id}`)}
                className='mt-1'
              >
                <Project projectId={project._id} displayBody={false} displayComments={false} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default GetAllProjects