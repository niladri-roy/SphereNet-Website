import React, { useState } from 'react'
import Layout from '../components/Layouts/Layout';
import './../stylesheets/registerPage.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Design Elements/Button/Button';

const Register = () => {
 
  //firstName , lastName , username , email , password , uniqueAnswer
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ uniqueAnswer, setUniqueAnswer ] = useState("");

  const navigate = useNavigate();
  
  const handleRegistration = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/register`, {
        firstName,
        lastName,
        username,
        email,
        password,
        uniqueAnswer
      });

      if(response && response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
        
        //login -> Will do it latter
      }

      else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <Layout title={"Register User"}>
      <div className="register-page bg-g1 c-w layout">
        <div className="register-section container">
          <form className="register-form br-15 p-4 bg-g2 bc regular-shadow" onSubmit={handleRegistration}>
            <div className='register-form-headlines pb-2 bb-g6 ta-cen'>
              <h3>Go Ahead and Register Yourself</h3>
              <p className=''>Find Valuable Connections Here.</p>
              <span className='break-line'></span>
            </div>
            <div className="register-name pb-1 pt-2">
              <div className="firstName">
                <input 
                  type="text" 
                  name="firstName" 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  placeholder="First Name"              
                />
              </div>
              <div className="lastName">
                <input 
                  type="text" 
                  name="lastName" 
                  id="lastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="register-username pb-1">
              <input 
                type="text" 
                name="username" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username"
              />
            </div>
            <div className="register-email pb-1">
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
              />
            </div>
            <div className="register-password pb-1">
              <input 
                type="password" 
                name="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
              />
            </div>
            <div className="register-uniqueAnswer pb-1">
              <input 
                type="text" 
                name="uniqueAnswer" 
                id="uniqueAnswer" 
                value={uniqueAnswer} 
                onChange={(e) => setUniqueAnswer(e.target.value)} 
                placeholder="Unique Answer"
              />
            </div>          
            <div className="register-form-button">
              <Button appearance="normal">
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register