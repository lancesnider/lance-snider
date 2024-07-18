'use client'

import { useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

import useMousePosition from '../../hooks/useMousePosition'
import useDeviceOrientation from '../../hooks/useDeviceOrientation'

import './MagicAlley.scss'
import { round } from 'lodash'

const STATE_MACHINE_NAME = 'State Machine 1'

export default function MagicAlley() {
  const { beta } = useDeviceOrientation()
  // const { mouseXPerc } = useMousePosition()

  const { rive, RiveComponent } = useRive({
    src: '/rive/magic_alley_7.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  })

  const testText = useStateMachineInput(rive, STATE_MACHINE_NAME, 'test')
  console.log('testText', testText)

  const parallaxInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'parallax'
  )

  // useEffect(() => {
  //   if (parallaxInput && mouseXPerc !== null) {
  //     const parallaxValue = round(100 - mouseXPerc, 2)
  //     parallaxInput.value = parallaxValue
  //     // parallaxInput.value = 50
  //     rive?.setTextRunValue('test', parallaxValue.toString())
  //   }
  // }, [mouseXPerc, parallaxInput])

  useEffect(() => {
    if (parallaxInput && beta !== null) {
      const minMax = [-6, 6]
      // normalize beta value where minMax[0] to minMax[1] is between 0 and 100
      const parallaxValue = round(
        ((beta - minMax[0]) / (minMax[1] - minMax[0])) * 100,
        2
      )

      parallaxInput.value = 100 - parallaxValue
    }
  }, [beta, parallaxInput])

  return (
    <div className='magic-alley'>
      {/* <button
        onClick={() => {
          DeviceOrientationEvent.requestPermission().then((response) => {
            if (response === 'granted') {
              console.log('Permission granted')
            }
          })
        }}
      >
        xxx
      </button> */}

      <RiveComponent />
    </div>
  )
}
