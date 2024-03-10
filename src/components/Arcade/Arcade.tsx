'use client'

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'

import './Arcade.scss'

const STATE_MACHINE_NAME = 'State Machine 1'

export default function Example() {
  const { RiveComponent } = useRive({
    src: '/rive/arcade_controls.riv',
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  })

  return (
    <div className='arcade'>
      <div className='arcade__centered'>
        <div className='arcade__container'>
          <RiveComponent className='arcade__rive' />
        </div>
      </div>
    </div>
  )
}
