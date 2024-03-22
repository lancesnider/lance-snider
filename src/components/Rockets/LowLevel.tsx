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

const PLACE_WIDTH = 400
const PLACE_HEIGHT = 100
const PLACE_SPACING = 16
const PLACE_FULL_HEIGHT = PLACE_HEIGHT + PLACE_SPACING
const PLACE_X = CANVAS_WIDTH - PLACE_WIDTH - PLACE_SPACING

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
  alive: boolean
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

  const { canvas, context2d, canvasRef, rive, renderer, riveFile, InputType } =
    useRiveCanvas({
      wasmUrl: RIVE_WASM_URL,
      dimensions: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
      riveFileUrl: RIVE_FILE_URL,
    })

  useEffect(() => {
    async function loadRive() {
      if (!rive || !renderer) return

      const starsArtboard = getArtboardByName(riveFile, 'stars')
      const starsStateMachine = getStateMachineByName(
        rive,
        starsArtboard,
        'State Machine 1'
      )

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

        const position = { x: index * 250, y: 1300 }

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
                raceData.users.find((user) => user.id === id)!.alive = false
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
        { y: 1300, id: '1' },
        { y: 1300, id: '2' },
        { y: 1300, id: '3' },
      ]

      function renderLoop(time: number) {
        if (!rive || !renderer || !context2d || !canvas) return

        if (!lastTime) {
          lastTime = time
        }
        const elapsedTimeMs = time - lastTime
        const elapsedTimeSec = elapsedTimeMs / 1000
        lastTime = time
        renderer.clear()

        starsStateMachine.advance(elapsedTimeSec)
        starsArtboard.advance(elapsedTimeSec)
        renderer.save()
        renderer.align(
          rive.Fit.contain,
          rive.Alignment.topCenter,
          {
            minX: 0,
            minY: 0,
            maxX: 1600,
            maxY: 1600,
          },
          starsArtboard.bounds
        )
        starsArtboard.draw(renderer)

        riveRace.map(({ artboard, stateMachine, position, id }) => {
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

          const alive = users.find((user) => user.id === id)?.alive

          if (previousPlaceIndex !== -1) {
            // Update existing position if found
            currentPlaces[previousPlaceIndex].y = alive ? position.y : 10000
          } else if (alive) {
            // Insert new position if not found
            currentPlaces.push({ y: position.y, id })
          }

          // Sort the current places array based on y values in ascending order
          currentPlaces.sort((a, b) => a.y - b.y)

          forEach(currentPlaces, (place, index) => {
            const user = users.find((user) => user.id === place.id)
            if (user) {
              user.place = index + 1
            }
          })
        })

        users.map(({ place, name, alive }) => {
          if (!place || !alive) return
          renderer.beginPath()
          renderer.lineWidth = 1
          renderer.strokeStyle = 'red'
          renderer.rect(
            PLACE_X,
            PLACE_SPACING + (place - 1) * PLACE_FULL_HEIGHT,
            PLACE_WIDTH,
            PLACE_HEIGHT
          )
          renderer.stroke()

          renderer.fillText(
            name,
            PLACE_X + 40,
            PLACE_SPACING + 62 + (place - 1) * PLACE_FULL_HEIGHT
          )
          renderer.fillStyle = 'green'
          renderer.font = '48px serif'
        })

        // Canvas (not Rivet) stuff
        renderer.save()

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
      style={{
        width: 800,
        height: 800,
        maxWidth: '100vw',
        maxHeight: '100vw',
        background: 'black',
      }}
      width={800}
      height={800}
      ref={canvasRef}
      id='rive-canvas'
    />
  )
}

export default RiveAnimation
