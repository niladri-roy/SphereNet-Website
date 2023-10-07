import React from 'react'
import Layout from '../components/Layouts/Layout'
import { useParams } from 'react-router-dom'
import Post from '../components/Post Components/Post'

const PostDetailPage = () => {

  const params  = useParams();

  return (
    <Layout>
      <div className='post-detail-page layout bg-g1'>
        <div className="container feed-container">
          <Post postId={params?._id} />
        </div>
      </div>
    </Layout>
  )
}

export default PostDetailPage