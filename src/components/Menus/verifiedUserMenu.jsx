import React from 'react';
import { NavLink } from "react-router-dom";
import {
  IoHomeOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import './Menus.css';

const verifiedUserMenus = () => {

  const iconSize = '2rem'
  const iconColor = '#00ff'

  const Menus = [
    {
      name: 'Home',
      icon: <IoHomeOutline size={iconSize} color={iconColor} />,
      path: '/feed/verified-feed'
    },
    {
      name: 'Profile',
      icon: <IoPersonCircleOutline size={iconSize} color={iconColor} />,
      path: '/feed/verified-profile'
    },
  ]

  return (
    <div className="menu">
      <div className="menu-items regular-shadow">

        {Menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            className="menu-item"
            activeClassName="active-menu-item"
          >
            <div className="menu-item-icons">
              {menu.icon}
            </div>
          </NavLink>
        ))}

      </div>
    </div>
  )
}

export default verifiedUserMenus