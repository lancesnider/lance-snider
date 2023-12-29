import React, { useCallback, useEffect } from 'react'

import { useWindowSize } from 'usehooks-ts'

import './MasonryCSS.scss'
import { isArray } from 'lodash'

interface Props {
  order: any
}

const breakopoints = [1024, 660, 0]

const getImageOrderIdex = (width: number) => {
  // to do: refactor this garbage
  if (width >= breakopoints[0]) return 0
  if (width >= breakopoints[1]) return 1
  return 2
}

const MasonryCSS = ({ order }: Props) => {
  const { width } = useWindowSize()

  const [columns, setColumns] = React.useState([])

  const orderIndex = getImageOrderIdex(width)

  useEffect(() => {
    setColumns(order[orderIndex])
  }, [orderIndex])

  return (
    <div className='masonry-css'>
      {columns.map((column, index) => {
        return (
          <div className='masonry-css__column' key={index}>
            {column.map((image, index) => {
              if (isArray(image)) {
                return (
                  <div className='masonry-css__grouped-image' key={index}>
                    <div className='masonry-css__image' key={index}>
                      <div className='masonry-css__image-hover' />
                      <img src={image[0].src} alt={image[0].alt} />
                    </div>
                    <div className='masonry-css__image' key={index}>
                      <div className='masonry-css__image-hover' />
                      <img src={image[1].src} alt={image[1].alt} />
                    </div>
                  </div>
                )
              }

              return (
                <div className='masonry-css__image' key={index}>
                  <div className='masonry-css__image-hover' />
                  <img src={image.src} alt={image.alt} />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default MasonryCSS
