import React from 'react'
import { useParams } from 'react-router-dom'
import Blog from './Blog'

const BlogDetails = () => {

  const params = useParams();

  return(
    <div className='blog-detail-page bg-g1 w-100'>
      <Blog blogId={params?._id} />
    </div>
  )

}

export default BlogDetails