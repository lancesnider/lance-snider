// @ts-nocheck

import * as React from 'react'

import Image from 'next/image'
import Masonry from '@mui/lab/Masonry'

import './Masonry.scss'

export default function BasicMasonry({ images }) {
  return (
    <div className='masonry'>
      <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={1}>
        {images.map(({ image, alt, imageGroup }, index) => {
          if (imageGroup && imageGroup.length > 1) {
            return (
              <div
                key={`${imageGroup}-${index}`}
                className='masonry__image-group'
              >
                {imageGroup.map(({ image: groupedImage, alt: groupedAlt }) => (
                  <div key={groupedImage.src} className='masonry__image'>
                    <div className='masonry__image-hover' />
                    <Image
                      src={groupedImage.src}
                      alt={groupedAlt}
                      width={groupedImage.width}
                      height={groupedImage.height}
                      style={{
                        height: 'auto',
                      }}
                    />
                  </div>
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
              <div className='masonry__image-hover' />
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
