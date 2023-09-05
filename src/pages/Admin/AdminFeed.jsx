import React from 'react'
import Layout from '../../components/Layouts/Layout'
import { useAuth } from '../../context/auth'
import '../Feed Stylesheets/Feed.css'
import AdminMenus from '../../components/Menus/adminMenus'
import FeedProfile from '../../components/Users/feedProfile'

const AdminFeed = () => {
  const [auth] = useAuth();
  const firstName = auth?.user?.firstName;

  return (
    <Layout title={`Welcome ${firstName}`}>
      <div className="feeds">
        <div className="feeds-container container">
          <div className="sticky">
            <AdminMenus />
          </div>
          <div className="sticky br-15">
            <FeedProfile />
          </div>
          <div className="feed-container feed-grid-3 regular-shadow">hi</div>
          <div className="feed-container feed-grid-4 regular-shadow">hi</div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminFeed