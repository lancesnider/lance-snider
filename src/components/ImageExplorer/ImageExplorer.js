/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {
  useState,
  useLayoutEffect,
  useRef,
  useMemo,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'

import { get } from 'lodash'
import classNames from 'classnames/bind'

import './ImageExplorer.scss'

const addPinsMode = false

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

const ImageExplorer = ({ image, alt, pins }) => {
  const ref = useRef(null)
  const [pinList, setPinList] = useState(pins)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activePin, setActivePin] = useState(null)
  const [mouseIsDown, setMouseIsDown] = useState(false)
  const [mousePosition, setMousePosition] = useState(false)

  useEffect(() => {
    console.log(JSON.stringify(pinList))
  }, [pinList])

  const [width] = useWindowSize()
  const imageDimensions = useMemo(
    () =>
      ref.current
        ? {
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight,
          }
        : {},
    [ref.current, width, imageLoaded]
  )

  const isLeft = get(activePin, 'x') < 33
  const isRight = get(activePin, 'x') > 66
  const isTop = get(activePin, 'y') < 33
  const isBottom = get(activePin, 'y') > 66

  return (
    <div className="image-explorer">
      <div
        role="button"
        className="image-explorer__explorer"
        onFocus={() => {}}
        // This is for adding pins
        onMouseDown={e => {
          if (addPinsMode) {
            setMouseIsDown(true)
            setMousePosition({ x: e.pageX, y: e.pageY })
          }
        }}
        onMouseUp={e => {
          if (addPinsMode) {
            setPinList([
              ...pinList,
              {
                id: pinList.length + 1,
                label: 'xxx',
                description: 'xxx',
                image: 'testImage',
                x: (e.pageX / imageDimensions.width) * 100,
                y: (e.pageY / imageDimensions.height) * 100,
              },
            ])
            setMouseIsDown(false)
          }
        }}
        onMouseMove={e => {
          if (addPinsMode && mouseIsDown) {
            setMousePosition({ x: e.pageX, y: e.pageY })
          }
        }}
        ref={ref}
      >
        <div className="image-explorer__pins">
          {activePin && (
            <div
              className="image-explorer__tooltip"
              style={{
                left: `${activePin.x}%`,
                top: `${activePin.y}%`,
              }}
            >
              <div
                className={classNames('image-explorer__tooltip-container', {
                  '-center-left': isLeft && !isTop,
                  '-center-right': isRight && !isTop,
                  '-top-left': isTop && isLeft,
                  '-top-right': isTop && isRight,
                  '-top-center': isTop && !isLeft && !isRight,
                  '-bottom-left': isBottom && isLeft,
                  '-bottom-right': isBottom && isRight,
                })}
              >
                <div className="image-explorer__tooltip-image">
                  {console.log(
                    `https://www.youtube-nocookie.com/embed/${activePin.video}autoplay=1&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`
                  )}
                  {console.log(activePin.id)}
                  {activePin.video ? (
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube-nocookie.com/embed/${activePin.video}autoplay=1&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <>
                      <img src={activePin.image} alt="" />
                      <div className="image-explorer__tooltip-content">
                        <div className="image-explorer__tooltip-label">
                          {activePin.label}
                        </div>
                        {activePin.description}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {addPinsMode && mouseIsDown && (
            <div
              className="image-explorer__pin"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transition: 'none',
              }}
            >
              <span>99</span>
            </div>
          )}

          {pinList &&
            pinList.map((pin, index) => (
              <div
                key={pin.id}
                className={classNames('image-explorer__pin', {
                  '-is-inactive': !!activePin && activePin.index !== index,
                  '-to-do': pin.video === 'toDoVideo&',
                })}
                onFocus={() => {
                  setActivePin({ ...pin, index })
                }}
                onMouseOver={() => {
                  setActivePin({ ...pin, index })
                }}
                onMouseOut={() => setActivePin(null)}
                onBlur={() => setActivePin(null)}
                style={{
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                }}
              >
                <span>{index + 1}</span>
              </div>
            ))}
        </div>
        <img
          onLoad={() => setImageLoaded(true)}
          src={image}
          alt={alt}
          className={classNames('image-explorer__image', {
            '-is-active': !!activePin,
          })}
        />
      </div>
      {/* {width < 768 && (
        <div className="image-explorer__list">
          {pinList &&
            pinList.map((pin, index) => (
              <div key={pin.id} className="image-explorer__list-item">
                <div className="image-explorer__list-content">
                  <div className="image-explorer__list-label">
                    {index + 1}.{pin.description}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )} */}
    </div>
  )
}

ImageExplorer.defaultProps = {
  pins: [],
}

ImageExplorer.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ),
}

export default ImageExplorer
