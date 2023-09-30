import React from 'react'
import { Helmet } from 'react-helmet'
import JobComponents from '../../components/Feed/Jobs/JobsComponents'

const Job = () => {
  return (
    <div>
      <Helmet><title>Job</title></Helmet>
      <div className="">
        <JobComponents />
      </div>
    </div>
  )
}

export default Job

