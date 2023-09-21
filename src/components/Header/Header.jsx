import React from 'react'
import './Header.css'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';


const Header = () => {

  const [ auth , setAuth ] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user : null,
      token : "",
    })
    localStorage.removeItem("auth")
    toast.success("Logout Successfully")
  }

  return (
    <div className='header larger-shadow bg-g1'>
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <h5>SphereNet</h5>
          </a>
        </div>
        <div className="log">
        {
          !auth?.user? (
            <div className="log">
              <div>
                <NavLink to="/login">Login</NavLink>
              </div>
              <div>
                <NavLink to="/register">Sign Up</NavLink>
              </div>
            </div>
          ) : (
            <div className="log">
              <div className="user-name">
                {auth?.user?.firstName} {auth?.user?.lastName}
              </div>
              <NavLink 
                onClick={handleLogout}
                to="/login"
                className="logout-btn"
              >
                LogOut
              </NavLink>
            </div>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default Header