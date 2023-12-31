import React, { useEffect } from 'react'

import { useWindowSize } from 'usehooks-ts'
import Link from 'next/link'

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

const MasonryCSSThumbnail = ({ image, link, alt }: any) => {
  const [loaded, setLoaded] = React.useState(false)
  const Component = link ? Link : 'div'

  return (
    <Component
      className={classNames('masonry-css__image', {
        '-loaded': loaded,
      })}
      href={link && link}
    >
      <div className='masonry-css__image-hover' />
      <Image
        src={image.src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        width={image.width}
        height={image.height}
      />
    </Component>
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
              column.map((item) => {
                // return null
                if (isArray(item)) {
                  return (
                    <div
                      className='masonry-css__grouped-image'
                      key={item[0].key}
                    >
                      <MasonryCSSThumbnail
                        image={item[0].image}
                        key={item[0].key}
                        link={item[0].link}
                        alt={item[0].alt}
                      />
                      <MasonryCSSThumbnail
                        image={item[1].image}
                        key={item[1].key}
                        link={item[1].link}
                        alt={item[1].alt}
                      />
                    </div>
                  )
                }

                return (
                  <MasonryCSSThumbnail
                    image={item.image}
                    key={item.key}
                    link={item.link}
                    alt={item.alt}
                  />
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

export default MasonryCSS
