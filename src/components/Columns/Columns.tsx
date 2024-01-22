import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import './Columns.scss'

interface Props {
  heading?: string
  subheading?: string
  columns: {
    heading: string
    subheading: string
    alt?: string
    image: {
      src: string
    }
    link: string
    linkText: string
  }[]
  defaultColumns?: number
}

const Columns = ({ heading, subheading, columns, defaultColumns }: Props) => {
  return (
    <div className='columns'>
      <div className='columns__centered'>
        <div className='columns__header'>
          {heading && <h1>{heading}</h1>}
          {subheading && <p>{subheading}</p>}
        </div>
        <div
          className={classNames('columns__content', {
            '--3': defaultColumns === 3,
            '--2': defaultColumns === 2,
            '--1': defaultColumns === 1,
          })}
        >
          {columns.map((column, index) => (
            <div key={index} className='columns__column'>
              <div className='columns__column__image'>
                <img src={column.image.src} alt={column.alt || ''} />
              </div>
              <div className='columns__column__content'>
                <h3>{column.heading}</h3>
                <p>{column.subheading}</p>
                <Link href={column.link}>{column.linkText}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Columns
