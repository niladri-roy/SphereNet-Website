import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { NavLink, Outlet } from 'react-router-dom'

import {
  IoHomeOutline,
  IoPersonCircleOutline,
  IoChatbubblesOutline,
  IoPeopleOutline,
  IoBriefcaseOutline,
  IoSettingsOutline,
  IoNewspaperOutline,
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline
} from "react-icons/io5"

import {MdOutlineAddModerator} from "react-icons/md"

const ModeratorUserFeed = () => {

  const [showUserMenu, setShowUserMenu] = useState(true)

  const handleShowUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  const iconSize = '1.8rem'
  const iconColor = 'var(--blue)'

  const RegularUserMenus = [
    {
      name: 'Home',
      icon: <IoHomeOutline size={iconSize} color={iconColor} />,
      path: 'home/post'
    },
    {
      name: 'Profile',
      icon: <IoPersonCircleOutline size={iconSize} color={iconColor} />,
      path: 'profile'
    },
    {
      name: 'Message',
      icon: <IoChatbubblesOutline size={iconSize} color={iconColor} />,
      path: 'message'
    },
    {
      name: 'My-Connects',
      icon: <IoPeopleOutline size={iconSize} color={iconColor} />,
      path: 'my-connects'
    },
    {
      name: 'Job',
      icon: <IoBriefcaseOutline size={iconSize} color={iconColor} />,
      path: 'job'
    },
  ]

  const NewsLetter = [
    {
      name: 'NewsLetter',
      icon: <IoNewspaperOutline size={iconSize} color='var(--yellow)' />,
      path: 'newsletter'
    }
  ]

  const ModeratorDashboard = [
    {
      name: 'Moderator-Dashboard',
      icon: <MdOutlineAddModerator size={iconSize} color='var(--green)' />,
      path: 'dashboard'
    }
  ]

  const UserSetting = [
    {
      name: 'Setting',
      icon: <IoSettingsOutline size={iconSize} color='white' />,
      path: 'settings'
    }
  ]

  return (
    <Layout>
      <div className="feed layout bg-g1">
        <div className='user-menu-toggler'>
          <div className='pointer' onClick={handleShowUserMenu}>
            {
              showUserMenu ?
                <IoArrowBackCircleOutline size={iconSize} color={iconColor} /> :
                <IoArrowForwardCircleOutline size={iconSize} color={iconColor} />
            }
          </div>
        </div>
        <div className="feed-container container">
          <div
            className="feed-section-1 sticky"
            style={{ paddingRight: showUserMenu ? '1rem' : '0' }}
          >
            <div className={`menu br bg-g2 bc ${showUserMenu ? 'show' : 'hide'}`}
              style={{ width: showUserMenu ? '100%' : '0' }}
            >
              <div className="menu-items regular-user-menu">
                {RegularUserMenus.map((menu, index) => (
                  <NavLink
                    key={index}
                    to={menu.path}
                    className='menu-item br'
                    activeclassname='active-menu-item'
                  >
                    <div className="menu-item-icons br bg-g3">
                      {menu.icon}
                    </div>
                  </NavLink>
                ))}
              </div>
              <span className='line'></span>
              <div className="menu-items newsletter">
                {NewsLetter.map((menu, index) => (
                  <NavLink
                    key={index}
                    to={menu.path}
                    className='menu-item br'
                    activeclassname='active-menu-item'
                  >
                    <div className="menu-item-icons br bg-g3">
                      {menu.icon}
                    </div>
                  </NavLink>
                ))}
              </div>
              <span className='line'></span>
              <div className="menu-items moderator-dashboard">
                {ModeratorDashboard.map((menu, index) => (
                  <NavLink
                    key={index}
                    to={menu.path}
                    className='menu-item br'
                    activeclassname='active-menu-item'
                  >
                    <div className="menu-item-icons br bg-g3">
                      {menu.icon}
                    </div>
                  </NavLink>
                ))}
              </div>
              <span className='line'></span>
              <div className="menu-items user-setting">
                {UserSetting.map((menu, index) => (
                  <NavLink
                    key={index}
                    to={menu.path}
                    className='menu-item br'
                    activeclassname='active-menu-item'
                  >
                    <div className="menu-item-icons br bg-g3">
                      {menu.icon}
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="w-100">
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ModeratorUserFeed