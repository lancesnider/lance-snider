import React from 'react'

import './Details.scss'
import classNames from 'classnames'

interface Props {
  subheading?: string
  heading?: string
  children?: React.ReactNode
  mb?: boolean
  mt?: boolean
}

const Details = ({ children, subheading, heading, mb, mt }: Props) => {
  return (
    <div
      className={classNames('details', {
        '-mb': mb,
        '-mt': mt,
      })}
    >
      <div className='details__centered'>
        {subheading && <h2>{subheading}</h2>}
        {heading && <h1>{heading}</h1>}
        {children && children}
      </div>
    </div>
  )
}

export default Details
