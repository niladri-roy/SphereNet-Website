import React , { useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios';
import Avatar from '../Design Elements/Avatar/Avatar';
import Tag from '../Tag/Tag';

const CreateProjects = () => {

  /*
  author
  title
  headline
  problem statement
  content
  solution
  challenges
  results
  tags
*/

  const [ auth ] = useAuth();
  const [ title , setTitle ] = useState('');
  const [ headline , setHeadline ] = useState('');
  const [ problemStatement , setProblemStatement ] = useState('');
  const [ content , setContent ] = useState('');
  const [ solution , setSolution ] = useState('');
  const [ challenges , setChallenges ] = useState('');
  const [ results , setResults ] = useState('');
  const [ selectedTags , setSelectedTags ] = useState([]);
  const [ isCreateProjectOpen , setIsCreateProjectOpen ] = useState(false);

  const openCreateProject = () => {
    setIsCreateProjectOpen(true);
  }

  const closeCreateProject = () => {
    setIsCreateProjectOpen(false);
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/v1/api/projects`, {
        author : auth?.user?._id,
        title,
        headline,
        problemStatement,
        content,
        solution,
        challenges,
        results,
        tags : selectedTags
      });

      const projectId = response?.data?.project?._id;

      await axios.put(`${process.env.REACT_APP_API}/v1/api/users/${auth?.user?._id}/projects`, {
        projectId,
      })

      window.location.reload();

      setTitle('');
      setHeadline('');
      setProblemStatement('');
      setContent('');
      setSolution('');
      setChallenges('');
      setResults('');
      setSelectedTags([]);

    } catch (error) {
      console.log(error);
    }
  }

  const handleTagSelectionChange = (selected) => {
    setSelectedTags(selected);
  }

  return (
    <>
      <div className='bg-g2 p-1 br bc c-w'>
        <div className='jc-sb ai-cen'>
          <Avatar userId={auth?.user?._id} />
          <button
            className='btn-primary c-w br pointer'
            onClick={isCreateProjectOpen ? closeCreateProject : openCreateProject}
          >
            {
              isCreateProjectOpen ? 'Close' : 'Create Project'
            }
          </button>
        </div>
      </div>
      <div style={{ display : isCreateProjectOpen ? 'block' : 'none' }}>
        <div className='create-project bg-g2 p-1 br bc c-w mt-1'>
          <div>
            <h4>Create Project</h4>
          </div>
          <form 
            onSubmit={handleProjectSubmit}
            className=''
          >
            <div>
              <input 
                className='mt-2'
                type="text"
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input 
                className='mt-2'
                type="text"
                placeholder='Headline'
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
            <div>
              <textarea
                className='mt-2 bg-g4 br p-1'
                type="text"
                placeholder='Problem Statement'
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <textarea
                className='mt-2 bg-g4 br p-1'
                type="text"
                placeholder='Content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
            </div>
            <div>
              <textarea
                className='mt-2 bg-g4 br p-1'
                type="text"
                placeholder='Solution'
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <textarea
                className='mt-2 bg-g4 br p-1'
                type="text"
                placeholder='Challenges'
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <textarea
                className='mt-2 bg-g4 br p-1'
                type="text"
                placeholder='Results'
                value={results}
                onChange={(e) => setResults(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Tag
                value={selectedTags}
                onChange={handleTagSelectionChange}
              />
            </div>
            <div className='btn-container'>
              <button className='btn-primary c-w br pointer mt-1'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateProjects