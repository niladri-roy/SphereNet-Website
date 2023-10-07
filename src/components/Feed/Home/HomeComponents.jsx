import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './HomeComponents.css'

const HomeComponents = () => {

  const ContentType = [
    // Post , Blog , Project , Newsletter
    {
      name: 'Post',
      path: 'post'
    },
    {
      name: 'Blog',
      path: 'blog'
    },
    {
      name: 'Project',
      path: 'project'
    },
    {
      name: 'Newsletter',
      path: 'newsletter'
    }
  ]

  return (
    <div>
      <div className="feed-menus pb-1 sticky">
        {
          ContentType.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
                className='feed-menu c-w br bc bg-g2 ta-cen'
              >
                <h6>
                  {item.name}
                </h6>
              </NavLink>
            )
          })
        }
      </div>
      <Outlet />
    </div>
  )
}

export default HomeComponents