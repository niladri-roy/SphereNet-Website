import React from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import { useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/auth'
import '../stylesheets/loginPage.css'

const Login = () => {

  const [ email , setEmail ] = React.useState("");
  const [ password , setPassword ] = React.useState("");
  const [ auth , setAuth ] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/login` , {
        email,
        password,
      })

      if( response && response.data.success ){
  
        setAuth({
          ...auth,
          user : response.data.user,
          token : response.data.token,
        })
        
        const userRole = response.data.user.role;       

        localStorage.setItem("auth" , JSON.stringify(response.data))

        if( userRole === "regular" ) navigate(location.state || "/feed/user-feed")
        if( userRole === "admin" ) navigate(location.state || "/feed/admin-feed")

        toast.success( response.data && response.data.message )      
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }
  
  return (
    <Layout title={"Login User"}>
      <div className="login">
        <div className="container log-container">
          <div className="main-log-container">
            <h3>Login</h3>
            <form onSubmit={handleLoginSubmit}>

              <div className="login-email">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='login-form'
                  id='login-email'
                  placeholder='Enter Your Email'
                  required
                />
              </div>

              <div className="login-password">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='login-form'
                  id='login-password'
                  placeholder='Enter Your Password'
                  required
                />
              </div>

              <div className="login-btn">
                <button>
                  Login
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login