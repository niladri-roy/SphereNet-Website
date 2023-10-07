import React from 'react'
import { useParams } from 'react-router-dom'
import Newsletter from './Newsletter'

const NewsletterDetails = () => {

  const params = useParams();

  return(
    <div className='newsletter-detail-page bg-g1 w-100'>
      <Newsletter newsletterId={params?._id} />
    </div>
  )

}

export default NewsletterDetails