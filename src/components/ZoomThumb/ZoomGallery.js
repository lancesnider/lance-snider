import React, { useState } from 'react'

import ZoomThumb from './ZoomThumb'
import useMousePosition from '../../hooks/useMousePosition'

import './ZoomGallery.scss'

const ZoomGallery = ({ images, zoomForever, defaultZoom, desaturate }) => {
  const { mouseX, mouseY } = useMousePosition()

  const [isHovering, setIsHovering] = useState(null)
  return <div className="zoom-gallery">
    {images.map((imageData, index) => {
      return (
        <div key={index} className="zoom-gallery__image-container">
          <div className="zoom-gallery__image"
            onMouseEnter={() => setIsHovering(index)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <ZoomThumb
              desaturate={index !== isHovering && desaturate}
              index={index}
              isHovering={index === isHovering}
              zoomForever={zoomForever}
              mouseX={index === isHovering ? mouseX : null}
              mouseY={index === isHovering ? mouseY + window.scrollY : null}
              imageData={imageData}
              maxSize={defaultZoom}
            />
          </div>
        </div>
      )
    })}
  </div>
}

export default ZoomGallery