import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import './Columns.scss'

interface Props {
  heading?: string
  subheading?: string
  columns: {
    heading: string
    body: string
    alt?: string
    image?: {
      src: string
    }
    link?: string
    linkText?: string
    tags?: string
    target?: string
    component?: () => JSX.Element
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
            '--4': defaultColumns === 4,
            '--3': defaultColumns === 3,
            '--2': defaultColumns === 2,
            '--1': defaultColumns === 1,
          })}
        >
          {columns.map((column, index) => (
            <div key={index} className='columns__column'>
              {column.image && column.link && (
                <div className='columns__column__image'>
                  <Link href={column.link} target={column.target}>
                    <img src={column.image.src} alt={column.alt || ''} />
                  </Link>
                </div>
              )}
              {column.image && !column.link && (
                <div className='columns__column__image'>
                  <img src={column.image.src} alt={column.alt || ''} />
                </div>
              )}
              {column.component && (
                <div className='columns__column-component-container'>
                  <div className='columns__column-component'>
                    {column.component()}
                  </div>
                </div>
              )}
              <div>
                <h3>{column.heading}</h3>

                <p>{column.body}</p>
                {column.tags && (
                  <div className='columns__tags'>{column.tags}</div>
                )}
                {column.link && column.linkText && (
                  <Link
                    className='columns__text-link'
                    href={column.link}
                    target={column.target}
                  >
                    {column.linkText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Columns
