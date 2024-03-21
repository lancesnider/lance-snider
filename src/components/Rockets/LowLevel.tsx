import React, { useEffect } from 'react'
import gsap from 'gsap'

import useRiveCanvas from './utils/useRiveCanvas'
import {
  getStateMachineByName,
  getArtboardByName,
  getInput,
} from './utils/riveUtils'
import { find, forEach } from 'lodash'

const CANVAS_WIDTH = 1600
const CANVAS_HEIGHT = 1600
const RIVE_FILE_URL = '/rive/space_race.riv'
const RIVE_WASM_URL =
  'https://unpkg.com/@rive-app/canvas-advanced@2.10.4/rive.wasm'

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

  const { context2d, canvasRef, rive, renderer, riveFile, InputType } =
    useRiveCanvas({
      wasmUrl: RIVE_WASM_URL,
      dimensions: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
      riveFileUrl: RIVE_FILE_URL,
    })

  useEffect(() => {
    async function loadRive() {
      if (!rive || !renderer) return

      const riveRace = users.map(({ ship, race, id }, index) => {
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
            ease: 'back.inOut',
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
          id,
        }
      })

      let lastTime = 0
      const currentPlaces: { y: number; id: string | null }[] = [
        { y: 1300, id: null },
        { y: 1300, id: null },
        { y: 1300, id: null },
      ]

      function renderLoop(time: number) {
        if (!rive || !renderer || !context2d) return

        if (!lastTime) {
          lastTime = time
        }
        const elapsedTimeMs = time - lastTime
        const elapsedTimeSec = elapsedTimeMs / 1000
        lastTime = time
        renderer.clear()

        forEach(riveRace, ({ artboard, stateMachine, position, id }) => {
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

          // Determine the current first, 2nd, and 3rd place
          const previousPlaceIndex = currentPlaces.findIndex(
            (place) => place.id === id
          )

          if (previousPlaceIndex !== -1) {
            // Update existing position if found
            currentPlaces[previousPlaceIndex].y = position.y
          } else {
            // Insert new position if not found
            currentPlaces.push({ y: position.y, id })
          }

          // Sort the current places array based on y values in descending order
          currentPlaces.sort((a, b) => b.y - a.y)
          // Keep only the top three positions
          currentPlaces.splice(3)
        })

        // Canvas (not Rivet) stuff

        context2d.beginPath()
        context2d.lineWidth = 6
        context2d.strokeStyle = 'red'
        context2d.rect(5, 5, 290, 140)
        context2d.stroke()

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
