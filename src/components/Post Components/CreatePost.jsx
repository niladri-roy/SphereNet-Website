import React, { useState } from 'react';
import './Post.css';
import axios from 'axios'
import { useAuth } from '../../context/auth';
import Tag from '../Tag/Tag';
import Avatar from '../Design Elements/Avatar/Avatar';

const CreatePost = () => {

  const [ auth ] = useAuth();
  const [ content , setContent ] = useState('');
  const [ selectedTags , setSelectedTags ] = useState([]);
  const [ isCreatePostOpen , setIsCreatePostOpen ] = useState(false);

  const openCreatePost = () => {
    setIsCreatePostOpen(true);
  }

  const closeCreatePost = () => {
    setIsCreatePostOpen(false);
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/v1/api/posts`, {
        author : auth?.user?._id,
        content,
        tags : selectedTags
      });

      const postId = response?.data?.post?._id;

      await axios.put(`${process.env.REACT_APP_API}/v1/api/users/${auth?.user?._id}/posts`, {
        postId,
      })

      window.location.reload();

      setContent('');
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
            onClick={isCreatePostOpen ? closeCreatePost : openCreatePost}
          >
            {
              isCreatePostOpen ? 'Close' : 'Create Post'
            }
          </button>
        </div>
      </div>
      <div style={{ display : isCreatePostOpen ? 'block' : 'none' }}>
        <div className='create-post bg-g2 p-1 br bc c-w mt-1'>
          <div className=''>
            <h4>Create Post</h4>
          </div>
          <form 
            onSubmit={handlePostSubmit}
            className=''
          >
            <div>
              <textarea
                className='mt-2 bg-g4 br p-1'
                placeholder='Content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
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
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreatePost