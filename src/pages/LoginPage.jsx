import React from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import { useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/auth'
import '../stylesheets/loginPage.css'
import Button  from '../components/Design Elements/Button/Button'

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

        if( userRole === "regular" ) navigate(location.state || "/regular-user/feed/home/post")
        if( userRole === "verified" ) navigate(location.state || "/verified-user/feed/home/post")
        if( userRole === "moderator" ) navigate(location.state || "/moderator-user/feed/home/post")
        if( userRole === "admin" ) navigate(location.state || "/admin/feed/home/post")

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
      <div className="login bg-g1 c-w">
        <div className="container log-container">
          <div className="main-log-container p-2 br bc bg-g2">
            <h3 className="ta-cen pb-2">Login</h3>
            <form onSubmit={handleLoginSubmit}>

              <div className="login-email p-1">
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

              <div className="login-password p-1">
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

              <div className="login-btn pr-1 register-form-button">
                <Button appearance="normal">
                  Login
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login