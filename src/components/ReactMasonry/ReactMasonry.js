import React from 'react'

import Gallery from 'react-photo-gallery'
import { imagesGrouped2 } from '../../utils/images'

const ReactMasonry = () => {
  const imageRenderer = ({ index, left, top, key, photo, margin }) => {
    if (photo.imageGroup) {
      return (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          width: photo.width,
          height: photo.height,
          position: 'absolute',
          left: left,
          top: top,
          boxSizing: 'border-box',
          overflow: 'hidden',
          margin: margin,
          gap: margin * 2
        }}
          key={photo.imageGroup[0].image.src}
        >
          {photo.imageGroup.map((group, index) => {
            const image = group.image
            return (
              <img
                key={index}
                alt={image.alt}
                src={image.src}
                onClick={() => console.log('clicked', index, photo)}
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            )
          })}
        </div>
      )
    }

    return (
      <div
        style={{
          margin,
          height: photo.height,
          width: photo.width,
          position: 'absolute',
          left: left,
          top: top,
          maxWidth: '100%',
        }}
        key={photo.image.src}
      >
        <img
          alt={photo.title}
          src={photo.image.src}
            onClick={() => console.log('clicked', index, photo)}
            style={{ height: '100%', width: '100%', objectFit: 'cover'  }}
        />
      </div>
    )
  }


  return (
    <div className='react-masonry'>
      <Gallery

        photos={imagesGrouped2}
        renderImage={imageRenderer}
        direction={'column'}
      />
    </div>
  )
}

export default ReactMasonry
