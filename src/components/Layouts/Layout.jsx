import React from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = ({ children , title , description , keywords , author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>
        <Toaster />
        { children }
      </main>
      <Footer />
    </div>
  )
}

Layout.defaultProps = { 

}

export default Layout