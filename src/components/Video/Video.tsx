import React from 'react'

import './Video.scss'

const Video = ({ children }: any) => {
  return (
    <div className='video'>
      <div className='video__centered'>
        <div className='video__content'>{children}</div>
      </div>
    </div>
  )
}

export default Video
