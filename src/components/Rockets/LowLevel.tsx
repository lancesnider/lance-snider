import React, { useEffect } from 'react'
import gsap from 'gsap'

import useRiveCanvas, { InputType } from './utils/useRiveCanvas'
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

const PLACE_WIDTH = 500
const PLACE_HEIGHT = 100
const PLACE_SPACING = 16
const PLACE_FULL_HEIGHT = PLACE_HEIGHT + PLACE_SPACING
const PLACE_X = CANVAS_WIDTH - PLACE_WIDTH - PLACE_SPACING

const PLACE_POSITIONS = [
  {
    x: 300,
    y: 400,
  },
  {
    x: 300,
    y: 700,
  },
  {
    x: 300,
    y: 1000,
  },
]

interface RaceSegment {
  time: number
  x: number
  y: number
  onCompleteTrigger?: string
}

const fighterTypes = {
  bomber: 0,
  fighter: 1,
  frigate: 2,
  scout: 3,
  support: 4,
  gunner: 5,
}

const placeText = ['1st Place', '2nd Place', '3rd Place']

interface User {
  id: string
  name: string
  ship: string
  avatar: string
  place?: number
  alive: boolean
  race: RaceSegment[]
  baseShipImage: HTMLImageElement
  baseAvatarImage: HTMLImageElement
  destructionType?: number
  prize?: string
}

interface Props {
  raceData: {
    users: User[]
    duration: number
  }
}

const progressValue = {
  value: 0,
}

const RiveAnimation = ({ raceData }: Props) => {
  const { users, duration } = raceData

  const { canvas, canvasRef, rive, renderer, riveFile } = useRiveCanvas({
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

      const progressInput = getInput(
        starsStateMachine,
        InputType.Number,
        'progress'
      )

      if (progressInput) {
        const progressTl = gsap.timeline({ delay: 2 })
        progressTl.to(progressValue, {
          value: 100,
          duration: duration,
          ease: 'quad.in',
          onUpdate: () => {
            progressInput.value = progressValue.value
          },
        })
      }

      const riveRace = users.map((user, index) => {
        const { ship, race, id, place, destructionType, avatar, name, prize } =
          user

        // ship thumbnail
        const baseShipImage = new Image()
        baseShipImage.src = `/rockets/ships/${ship}.png`
        baseShipImage.onload = function () {
          // This function will be called when the image is fully loaded
          user.baseShipImage = baseShipImage
          // You can perform any further actions you need here
        }

        // ship thumbnail
        const baseAvatarImage = new Image()
        baseAvatarImage.src = avatar
        baseAvatarImage.onload = function () {
          // This function will be called when the image is fully loaded
          user.baseAvatarImage = baseAvatarImage
          // You can perform any further actions you need here
        }

        const artboard = getArtboardByName(riveFile, 'rockets')

        if (place) {
          const textPrize = artboard.textRun('textPlaceMoney')
          textPrize.text = prize
          const textName = artboard.textRun('textPlaceName')
          textName.text = name
          const textPlace = artboard.textRun('textPlace')
          textPlace.text = placeText[place - 1]
        }

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
        const fighterType = getInput(
          stateMachine,
          InputType.Number,
          'fighterType'
        )
        const destructionTypeInput = getInput(
          stateMachine,
          InputType.Number,
          'destructionType'
        )
        const showPrizeTrigger = getInput(
          stateMachine,
          InputType.Trigger,
          'showPrize'
        )

        if (fighterType)
          fighterType.value = fighterTypes[ship as keyof typeof fighterTypes]

        if (destructionTypeInput) destructionTypeInput.value = destructionType

        const position = { x: index * 220, y: 1300 }

        const tl = gsap.timeline({ delay: 2 })

        race.map(({ x, y, time, onCompleteTrigger }) => {
          tl.to(position, {
            x: x,
            y: y,
            duration: time * duration,
            ease: 'back.inOut',
            onComplete: () => {
              // console.log(name)
              if (name === 'Brad') {
                console.log('Brad', x, y)
              }
              if (onCompleteTrigger && destructionTrigger) {
                destructionTrigger.fire()
                raceData.users.find((user) => user.id === id)!.alive = false
              }
            },
          })
        })

        if (!destructionType && !place) {
          // If the user doesn't die or place, finish by animating them off the screen
          tl.to(position, {
            y: 2000,
            duration: 1,
            ease: 'back.out',
          })
        } else if (place) {
          tl.to(position, {
            x: PLACE_POSITIONS[place - 1].x,
            y: PLACE_POSITIONS[place - 1].y,
            duration: 1,
            ease: 'back.inOut',
            onComplete: () => {
              console.log('done')
              showPrizeTrigger?.fire()
            },
          })
        }

        return {
          artboard,
          stateMachine,
          destructionTrigger,
          showPrizeTrigger,
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
        if (!rive || !renderer || !canvas) return

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

        users.map(({ place, name, alive, baseShipImage, baseAvatarImage }) => {
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

          if (baseShipImage) {
            renderer.drawImage(
              baseShipImage,
              PLACE_X + 100,
              PLACE_SPACING + (place - 1) * PLACE_FULL_HEIGHT
            )
          }
          if (baseAvatarImage) {
            renderer.drawImage(
              baseAvatarImage,
              PLACE_X,
              PLACE_SPACING + (place - 1) * PLACE_FULL_HEIGHT
            )
          }

          renderer.fillText(
            name,
            PLACE_X + 240,
            PLACE_SPACING + 62 + (place - 1) * PLACE_FULL_HEIGHT
          )
          renderer.fillStyle = 'green'
          renderer.font = '48px serif'
        })

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

          const user = users.find((user) => user.id === id)
          const alive = user?.alive

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
