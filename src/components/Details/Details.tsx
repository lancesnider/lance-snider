import React from 'react'

import './Details.scss'
import classNames from 'classnames'

interface Props {
  subheading?: string
  heading?: string
  children?: React.ReactNode
  mb?: boolean
  mt?: boolean
  sold?: boolean
}

const Details = ({ children, subheading, heading, mb, mt, sold }: Props) => {
  return (
    <div
      className={classNames('details', {
        '-mb': mb,
        '-mt': mt,
      })}
    >
      <div className='details__centered'>
        <div className='details__subheading'>
          {subheading && (
            <h2>
              {subheading} {sold && <span>(Sold)</span>}
            </h2>
          )}
        </div>
        {heading && <h1>{heading}</h1>}
        {children && children}
      </div>
    </div>
  )
}

export default Details
