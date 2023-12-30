import React, { useCallback, useEffect } from 'react'

import { useWindowSize } from 'usehooks-ts'

import './MasonryCSS.scss'
import { isArray } from 'lodash'
import classNames from 'classnames'
import Image from 'next/image'

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

const Loader = () => {
  return (
    <div className='masonry-css__loader'>
      xyz
      <div className='masonry-css__loader-spinner' />
    </div>
  )
}

const MasonryCSSThumbnail = ({ image }: any) => {
  const [loaded, setLoaded] = React.useState(false)

  return (
    <div
      className={classNames('masonry-css__image', {
        '-loaded': loaded,
      })}
    >
      <div className='masonry-css__image-hover' />
      <Image
        src={image.src}
        alt={image.src}
        onLoad={() => setLoaded(true)}
        width={image.width}
        height={image.height}
      />
    </div>
  )
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
          <div className='masonry-css__column' key={`column-${index}`}>
            {isArray(column) &&
              // @ts-ignore
              column.map((image: any) => {
                if (isArray(image)) {
                  return (
                    <div
                      className='masonry-css__grouped-image'
                      key={image[0].src}
                    >
                      <MasonryCSSThumbnail
                        image={image[0]}
                        key={image[0].src}
                      />
                      <MasonryCSSThumbnail
                        image={image[1]}
                        key={image[1].src}
                      />
                    </div>
                  )
                }

                return (
                  <MasonryCSSThumbnail image={image} key={image.src} />
                  // <div className='masonry-css__image' key={image.src}>
                  //   <div className='masonry-css__image-hover' />
                  //   <img src={image.src} alt={image.alt} />
                  // </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

export default MasonryCSS
