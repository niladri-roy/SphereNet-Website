import React from 'react'
import { Helmet } from 'react-helmet'
import { useAuth } from '../../context/auth'
import HomeComponents from '../../components/Feed/Home/HomeComponents';

const Home = () => {

  const [auth] = useAuth();

  return (
    <div>
      <Helmet><title>Welcome {auth?.user?.firstName}</title></Helmet>
      <div className="">
        <HomeComponents />
      </div>
    </div>
  )
}

export default Home