'use client'

import { useEffect } from 'react'
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from '@rive-app/react-canvas'

import useMousePosition from '../../hooks/useMousePosition'

import './Seagulls.scss'

const STATE_MACHINE_NAME = 'State Machine 1'

export default function Example() {
  const { mouseXPerc, mouseYPerc } = useMousePosition()

  const { rive, RiveComponent } = useRive({
    src: '/rive/seagulls.riv',
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
    }),
    autoplay: true,
  })

  const fireInput = useStateMachineInput(rive, STATE_MACHINE_NAME, 'fire')
  const mouseXPercInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'cursorX'
  )
  const mouseYPercInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'cursorY'
  )

  useEffect(() => {
    if (mouseXPercInput && mouseXPerc !== null) {
      mouseXPercInput.value = mouseXPerc
    }
  }, [mouseXPercInput, mouseXPerc])

  useEffect(() => {
    if (mouseYPercInput && mouseYPerc !== null) {
      mouseYPercInput.value = mouseYPerc
    }
  }, [mouseYPercInput, mouseYPerc])

  return (
    <div className='seagulls' onMouseDown={() => fireInput?.fire()}>
      <div className='seagulls__centered'>
        <div className='seagulls__container'>
          <RiveComponent className='seagulls__rive' />
        </div>
      </div>
    </div>
  )
}
