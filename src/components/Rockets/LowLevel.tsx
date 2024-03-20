import React, { useEffect } from 'react'
import gsap from 'gsap'

import useRiveCanvas from './utils/useRiveCanvas'
import {
  getStateMachineByName,
  getArtboardByName,
  getInput,
} from './utils/riveUtils'
import { forEach } from 'lodash'

const CANVAS_WIDTH = 1600
const CANVAS_HEIGHT = 1600
const RIVE_FILE_URL = '/rive/space_race.riv'
const RIVE_WASM_URL =
  'https://unpkg.com/@rive-app/canvas-advanced@2.10.4/rive.wasm'

// const position = { x: 0, y: 0 }

interface RaceSegment {
  time: number
  x: number
  y: number
  onCompleteTrigger?: string
}

interface User {
  id: string
  name: string
  ship: string
  place?: number
  race: RaceSegment[]
}

interface Props {
  raceData: {
    users: User[]
    duration: number
  }
}

const RiveAnimation = ({ raceData }: Props) => {
  const { users, duration } = raceData

  const { canvasRef, rive, renderer, riveFile, InputType } = useRiveCanvas({
    wasmUrl: RIVE_WASM_URL,
    dimensions: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
    riveFileUrl: RIVE_FILE_URL,
  })

  useEffect(() => {
    async function loadRive() {
      if (!rive || !renderer) return

      const riveRace = users.map(({ ship, race }, index) => {
        const artboard = getArtboardByName(riveFile, ship)
        const stateMachine = getStateMachineByName(
          rive,
          artboard,
          'State Machine 1'
        )
        const destructionTrigger = getInput(
          stateMachine,
          InputType.Trigger,
          'destruction'
        )

        const position = { x: index * 320, y: 1300 }

        const tl = gsap.timeline({ delay: 2 })

        race.map(({ x, y, time, onCompleteTrigger }) => {
          tl.to(position, {
            x: x,
            y: y,
            duration: time * duration,
            onComplete: () => {
              if (onCompleteTrigger && destructionTrigger) {
                destructionTrigger.fire()
              }
            },
          })
        })

        return {
          artboard,
          stateMachine,
          destructionTrigger,
          position,
        }
      })

      let lastTime = 0

      function renderLoop(time: number) {
        if (!rive || !renderer) return

        if (!lastTime) {
          lastTime = time
        }
        const elapsedTimeMs = time - lastTime
        const elapsedTimeSec = elapsedTimeMs / 1000
        lastTime = time
        renderer.clear()

        forEach(riveRace, ({ artboard, stateMachine, position }) => {
          stateMachine.advance(elapsedTimeSec)
          artboard.advance(elapsedTimeSec)

          renderer.save()
          renderer.align(
            rive.Fit.contain,
            rive.Alignment.topCenter,
            {
              minX: position.x,
              minY: position.y,
              maxX: position.x + artboard.bounds.maxX,
              maxY: position.y + artboard.bounds.maxY,
            },
            artboard.bounds
          )

          artboard.draw(renderer)
          renderer.restore()
        })

        rive.requestAnimationFrame(renderLoop)
      }
      rive.requestAnimationFrame(renderLoop)
    }

    loadRive()

    // Clean-up function
    return () => {
      // Perform any necessary clean-up here
    }
  }, [rive, renderer, riveFile, users])

  return (
    <canvas
      style={{ width: 800, height: 800, maxWidth: '100vw', maxHeight: '100vw' }}
      width={800}
      height={800}
      ref={canvasRef}
      id='rive-canvas'
    />
  )
}

export default RiveAnimation
