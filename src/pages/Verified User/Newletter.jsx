import React from 'react'
import { Helmet } from 'react-helmet'
import { useAuth } from '../../context/auth'
import NewsletterComponents from '../../components/Feed/Newsletter/NewsletterComponents';

const Newsletter = () => {

  const [auth] = useAuth();

  return (
    <div>
      <Helmet><title>Welcome {auth?.user?.firstName}</title></Helmet>
      <div className="">
        <NewsletterComponents />
      </div>
    </div>
  )
}

export default Newsletter