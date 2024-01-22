import React from 'react'

import Link from 'next/link'

import Gallery from 'react-photo-gallery'

import './ReactMasonry.scss'

const ReactMasonry = ({images}) => {
  const imageRenderer = ({ left, top, photo, margin }) => {
    if (photo.imageGroup) {
      return (
        <div
          className='react-masonry__image-group'
          style={{
            width: photo.width,
            height: photo.height,
            left: left,
            top: top,
            margin: margin,
            gap: margin * 2
          }}
          key={photo.imageGroup[0].image.src}
        >
          {photo.imageGroup.map((groupedImage, index) => {
            const image = groupedImage.image

            return (
              <Link
                href={groupedImage.link}
                className='react-masonry__group' key={groupedImage.key}>
                <div className='react-masonry__image-hover' />
                <img
                  alt={image.alt}
                  src={image.src}
                  className='react-masonry__group-image'
                />
              </Link>
            )
          })}
        </div>
      )
    }

    return (
      <Link
        href={photo.link}
        className='react-masonry__image'
        style={{
          margin,
          height: photo.height,
          width: photo.width,
          left: left,
          top: top,
        }}
        key={photo.key}
      >
        <div className='react-masonry__image-hover' />
        <img
          alt={photo.title}
          src={photo.image.src}
        />
      </Link>
    )
  }

  return (
    <div className='react-masonry'>
      <Gallery
        photos={images}
        renderImage={imageRenderer}
        direction={'column'}
      />
    </div>
  )
}

export default ReactMasonry
