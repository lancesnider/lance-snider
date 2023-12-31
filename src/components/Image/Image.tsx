import React from 'react'
import NextImage, { StaticImageData } from 'next/image'

import './Image.scss'

interface Props {
  image: StaticImageData
  alt: string
}

const Image = ({ image, alt }: Props) => {
  return (
    <div className='image'>
      <NextImage src={image} alt={alt} />
    </div>
  )
}

export default Image
