import React from 'react'

import './BlogContent.scss'

interface Props {
  children: React.ReactNode
}

const BlogContent = ({ children }: Props) => {
  return (
    <div className='blog-content'>
      <div className='blog-content__centered'>{children}</div>
    </div>
  )
}

export default BlogContent
