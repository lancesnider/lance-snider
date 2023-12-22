import { useEffect, useState } from 'react'

import { useImageSize } from 'react-image-size'
import classNames from 'classnames'
import {clamp} from 'lodash'

import { useRect } from '../../hooks/useRect'

import './ZoomThumb.scss'

const getPosition = (imageDimensions, isHovering, maxSize, mouseX, mouseY, windowRect) => {
  const windowX = windowRect.x
  const windowY =  windowRect.y
  const windowWidth = windowRect.width
  const windowHeight =  windowRect.height
  const imageWidth = imageDimensions.width
  const imageHeight = imageDimensions.height
  const windowAspectRatio = windowRect.width / windowRect.height
  const imageAspectRatio = imageWidth / imageHeight

  const sizeBasedOnWidth = windowAspectRatio < imageAspectRatio

  const xPercent = clamp((mouseX - windowX) / windowWidth, 0, 1)
  const yPercent = clamp((mouseY - windowY) / windowHeight, 0, 1)

  const clampedXPercentage = Math.min(1, Math.max(0, xPercent));
  const clampedYPercentage = Math.min(1, Math.max(0, yPercent));

  const idleImageScale = sizeBasedOnWidth
  ? windowWidth / imageHeight
    : windowHeight / imageWidth

  const maxSizeCalculated = maxSize * idleImageScale


  const idleX = (windowWidth - idleImageScale * imageWidth) / 2
  const idleY = (windowHeight - idleImageScale * imageHeight) / 2

  const zoomedX =  (windowWidth - maxSizeCalculated * imageWidth);
  const zoomedY = (windowHeight - maxSizeCalculated * imageHeight)
    // These actually get used
    const imageScale = isHovering ? maxSizeCalculated : idleImageScale
    const xPos = isHovering
      ? zoomedX * clampedXPercentage
      : idleX
    const yPos = isHovering
      ? zoomedY * clampedYPercentage
      : idleY

  return {xPos, yPos, imageScale, idleX, idleY, idleImageScale}
}

const ZoomThumb = ({ imageData, maxSize, mouseX, mouseY, isHovering, zoomForever, index, desaturate }) => {
  const { image, alt } = imageData
  const [windowRect, windowRef] = useRect()
  const [imageDimensions = {width: 1, height: 1}] = useImageSize(image.src)
  const [loaded, setLoaded] = useState(false)
  const [imageTransform, setImageTransform] = useState({ })
  const [hasLoaded, setHasLoaded] = useState(false)
  const [easeTime, setEaseTime] = useState(0)


  useEffect(() => {
    if (hasLoaded && zoomForever && !isHovering) {
      return
    }

    if ( !windowRect?.x || !windowRect?.y || !imageDimensions?.width) return;

    const {xPos, yPos, imageScale} = getPosition(imageDimensions, isHovering, maxSize, mouseX, mouseY, windowRect, hasLoaded)

    setImageTransform({
      x: xPos,
      y: yPos,
      scale: imageScale,
    })

    setHasLoaded(true)
  }, [imageDimensions, isHovering, maxSize, mouseX, mouseY, windowRect, index])

  useEffect(() => {
    if (isHovering) {
      setEaseTime(0.2)
    } else if (hasLoaded && !isHovering) {
      setEaseTime(0.3)
    }
  }, [hasLoaded, isHovering])



  return (
    <div
      className={classNames('zoom-thumb', {
        '--loaded': loaded,
      })}
      ref={windowRef}
    >
      {
        imageDimensions && (
          <img
            src={image.src}
            alt={alt}
            style={{
              transform: `translate(${imageTransform.x}px, ${imageTransform.y}px) scale(${imageTransform.scale})`,
              transition: `all ${easeTime}s ease-out`,
            }}
            className={classNames('zoom-thumb__image', {
              '--loaded': loaded,
              '--desaturate': desaturate && !isHovering,
            })}
              onLoad={() => setLoaded(true)}
          />
        )
      }
    </div>
  )
}

export default ZoomThumb