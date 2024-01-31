import React from 'react'

import './Grid.scss'
import classNames from 'classnames'

const Grid = ({ images, columns }: any) => {
  return (
    <div className='grid'>
      <div
        className={classNames('grid__content', {
          '--2': columns === 2,
          '--3': columns === 3,
        })}
      >
        {images.map((img: any) => {
          return (
            <img key={img.image.src} src={img.image.src} alt={img.image.alt} />
          )
        })}
      </div>
    </div>
  )
}

export default Grid
