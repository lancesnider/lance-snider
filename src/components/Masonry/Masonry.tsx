// @ts-nocheck

import * as React from 'react'

import Image from 'next/image'
import Masonry from '@mui/lab/Masonry'

import './Masonry.scss'

export default function BasicMasonry({ images }) {
  return (
    <div className='masonry'>
      <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={1}>
        {images.map(({ image, alt, imageGroup }) => {
          if (imageGroup && imageGroup.length > 1) {
            return (
              <div key={imageGroup} className='masonry__image-group'>
                {imageGroup.map(({ image, alt }) => (
                  <Image
                    key={image.src}
                    src={image.src}
                    alt={alt}
                    width={image.width}
                    height={image.height}
                    style={{
                      height: 'auto',
                    }}
                  />
                ))}
              </div>
            )
          }

          return (
            <div
              key={image.src}
              className='masonry__image'
              width={image.width}
              height={image.height}
            >
              <Image
                src={image.src}
                alt={alt}
                width={image.width}
                height={image.height}
                style={{
                  height: 'auto',
                }}
              />
            </div>
          )
        })}
      </Masonry>
    </div>
  )
}
