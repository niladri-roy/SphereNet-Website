import React from 'react'
import { useParams } from 'react-router-dom'
import Post from './Post'

const PostDetails = () => {

  const params = useParams();

  return (
    <div className='post-detail-page bg-g1 w-100'>
      <Post postId={params?._id} />
    </div>
  )
}
export default PostDetails