import React from 'react'
import NextImage, { StaticImageData } from 'next/image'

import './Image.scss'
import classNames from 'classnames'

interface Props {
  image: StaticImageData
  alt: string
  sm?: boolean
}

const Image = ({ image, alt, sm }: Props) => {
  return (
    <div
      className={classNames('image', {
        '-sm': sm,
      })}
    >
      <div className='image__container'>
        <NextImage src={image} alt={alt} />
      </div>
    </div>
  )
}

export default Image
