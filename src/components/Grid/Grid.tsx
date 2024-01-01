import React from 'react'

import './Grid.scss'

const Grid = ({ images }: any) => {
  console.log(images)
  return (
    <div className='grid'>
      <div className='grid__content'>
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
