import React, { useState } from 'react'
import axios from 'axios'
import './Blog.css'
import Tag from '../Tag/Tag'
import { useAuth } from '../../context/auth'
import Avatar from '../Design Elements/Avatar/Avatar'

const CreateBlog = () => {

  const [ auth ] = useAuth();
  const [ title , setTitle ] = useState('');
  const [ headline , setHeadline ] = useState('');
  const [ selectedTags , setSelectedTags ] = useState([]);
  const [ content , setContent ] = useState('');
  const [ isCreateBlogOpen , setIsCreateBlogOpen ] = useState(false);

  const openCreateBlog = () => {
    setIsCreateBlogOpen(true);
  }

  const closeCreateBlog = () => {
    setIsCreateBlogOpen(false);
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/v1/api/blogs`, {
        author : auth?.user?._id,
        title,
        headline,
        content,
        tags : selectedTags
      });

      const blogId = response?.data?.blog?._id;

      await axios.put(`${process.env.REACT_APP_API}/v1/api/users/${auth?.user?._id}/blogs`, {
        blogId,
      })

      window.location.reload();

      setTitle('');
      setHeadline('');
      setSelectedTags([]);
      setContent('');

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
            onClick={isCreateBlogOpen ? closeCreateBlog : openCreateBlog}
          >
            {
              isCreateBlogOpen ? 'Close' : 'Create Blog'
            }
          </button>
        </div>
      </div>
      <div style={{ display : isCreateBlogOpen ? 'block' : 'none' }}>
        <div className='create-blog bg-g2 p-1 br bc c-w mt-1'>
          <div className=''>
            <h4>Create Blog</h4>
          </div>
          <form 
            onSubmit={handleBlogSubmit}
            className=''
            >
            <div>
              <input
                className='mt-2'
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                className='mt-2'
                type='text'
                placeholder='Headline'
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
            <div>
              <Tag
                value={selectedTags}
                onChange={handleTagSelectionChange}
              />
            </div>
            <div>
              <textarea
                className='mt-2 bg-g4 br p-1'
                placeholder='Write Content here ... {Markdown Supported}'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
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

export default CreateBlog