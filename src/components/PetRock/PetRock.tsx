import { useState, useEffect, useCallback } from 'react'
import { useWindowSize } from '@react-hook/window-size'

import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
  EventType,
} from '@rive-app/react-canvas'
import { clamp } from 'lodash'

const BAR_WIDTH = 4177
const BAR_HEIGHT = 2160
const STATE_MACHINE_NAME = 'State Machine 1'

// For extra wide screens, we want a min shift
const minRatio = BAR_HEIGHT / BAR_WIDTH

export default function Example() {
  const [maxShift, setMaxShift] = useState(0)
  const [mouseDownX, setMouseDownX] = useState(0)
  const [sceneX, setSceneX] = useState(0)
  const [mouseEnabled, setMouseEnabled] = useState(true)

  const [windowWidth, windowHeight] = useWindowSize()

  // We only use this
  const extraWide = windowWidth * minRatio < windowHeight

  const { rive, RiveComponent } = useRive({
    src: '/rive/pet_rock.riv',
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: extraWide ? Fit.FitHeight : Fit.FitWidth,
      alignment: Alignment.CenterLeft,
    }),
    autoplay: true,
  })

  const sceneXInput = useStateMachineInput(rive, STATE_MACHINE_NAME, 'sceneX')
  const pointerXInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'pointerX'
  )

  useEffect(() => {
    if (windowWidth) {
      const adjustedBarWidth = (windowHeight / BAR_HEIGHT) * BAR_WIDTH

      setMaxShift(1 - windowWidth / adjustedBarWidth)
    }
  }, [windowWidth, windowHeight])

  const handleMouseMove = useCallback(
    (e: any) => {
      if (!mouseEnabled) {
        return
      }

      const mouseXPercent = (e.pageX / windowWidth) * 100

      if (sceneXInput && pointerXInput) {
        sceneXInput.value = mouseXPercent * maxShift
        pointerXInput.value = mouseXPercent
      }
    },
    [windowWidth, maxShift, sceneXInput, pointerXInput, mouseEnabled]
  )

  const handleTouch = useCallback(
    (e: any) => {
      setMouseEnabled(false)
      setMouseDownX(e.targetTouches[0].clientX)
      if (sceneXInput) {
        setSceneX(sceneXInput.value as number)
      }
    },
    [sceneXInput]
  )

  const handleTouchMove = useCallback(
    (e: any) => {
      const moveDelta = e.targetTouches[0].clientX - mouseDownX
      const moveDeltaPercent = -(moveDelta / windowWidth) * 100
      const updatedSceneX = clamp(
        moveDeltaPercent * maxShift + sceneX,
        0,
        maxShift * 100
      )

      if (sceneXInput && pointerXInput) {
        pointerXInput.value = updatedSceneX / maxShift
        sceneXInput.value = updatedSceneX
      }
    },
    [mouseDownX, maxShift, sceneX]
  )

  const onRiveEventReceived = (riveEvent: any) => {
    const eventData = riveEvent.data
    console.log('Event data', eventData)
  }

  useEffect(() => {
    if (!rive) return

    // Wait until the rive object is instantiated before adding the Rive
    // event listener
    rive.on(EventType.RiveEvent, onRiveEventReceived)

    const updateTime = () => {
      const date = new Date()
      let hours = date.getHours()
      let minutes = date.getMinutes()

      // Add leading zero if less than 10
      const hoursString = hours < 10 ? `0${hours}` : hours.toString()
      const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString()

      rive.setTextRunValue('hoursText', hoursString)
      rive.setTextRunValue('minutesText', minutesString)
    }

    updateTime()
    const intervalId = setInterval(updateTime, 60000) // Update every minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId)
  }, [rive])

  return (
    <div
      style={{ width: '100vw', height: '100vh' }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouch}
      onTouchMove={handleTouchMove}
    >
      <RiveComponent />
    </div>
  )
}
