'use client'

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'

import './Cassowary.scss'

const STATE_MACHINE_NAME = 'State Machine 1'

export default function Example() {
  const { RiveComponent } = useRive({
    src: '/rive/Cassowary.riv',
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
    }),
    autoplay: true,
  })

  return (
    <div className='cassowary'>
      <div className='cassowary__centered'>
        <div className='cassowary__container'>
          <RiveComponent className='cassowary__rive' />
        </div>
      </div>
    </div>
  )
}
