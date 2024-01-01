import React from 'react'

import './Details.scss'

interface Props {
  subheading?: string
  heading?: string
  children?: React.ReactNode
}

const Details = ({ children, subheading, heading }: Props) => {
  return (
    <div className='details'>
      <div className='details__centered'>
        {subheading && <h2>{subheading}</h2>}
        {heading && <h1>{heading}</h1>}
        {children && children}
      </div>
    </div>
  )
}

export default Details
