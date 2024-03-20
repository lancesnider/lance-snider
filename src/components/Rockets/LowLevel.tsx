import React, { useEffect } from 'react'
import gsap from 'gsap'

import useRiveCanvas from './utils/useRiveCanvas'
import {
  getStateMachineByName,
  getArtboardByName,
  getInput,
} from './utils/riveUtils'
const CANVAS_WIDTH = 1600
const CANVAS_HEIGHT = 1600
const RIVE_FILE_URL = '/rive/space_race.riv'
const RIVE_WASM_URL =
  'https://unpkg.com/@rive-app/canvas-advanced@2.10.4/rive.wasm'

const position = { x: 0, y: 0 }

function RiveAnimation() {
  const { canvasRef, rive, renderer, riveFile, InputType } = useRiveCanvas({
    wasmUrl: RIVE_WASM_URL,
    dimensions: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
    riveFileUrl: RIVE_FILE_URL,
  })

  useEffect(() => {
    async function loadRive() {
      if (!rive || !renderer) return

      const bomberArtboard = getArtboardByName(riveFile, 'bomber')
      const bomberStateMachine = getStateMachineByName(
        rive,
        bomberArtboard,
        'State Machine 1'
      )
      const bomberDestruction = getInput(
        bomberStateMachine,
        InputType.Trigger,
        'destruction'
      )

      const fighterArtboard = getArtboardByName(riveFile, 'fighter')
      const fighterStateMachine = getStateMachineByName(
        rive,
        fighterArtboard,
        'State Machine 1'
      )
      const fighterDestruction = getInput(
        fighterStateMachine,
        InputType.Trigger,
        'destruction'
      )

      let lastTime = 0

      gsap.to(position, {
        x: 200,
        y: 400,
        duration: 4,
        onComplete: () => {
          if (bomberDestruction) {
            bomberDestruction.fire()
          }
        },
      })

      function renderLoop(time: number) {
        if (!rive || !renderer) return

        if (!lastTime) {
          lastTime = time
        }
        const elapsedTimeMs = time - lastTime
        const elapsedTimeSec = elapsedTimeMs / 1000
        lastTime = time
        renderer.clear()
        if (bomberArtboard && bomberStateMachine) {
          bomberStateMachine.advance(elapsedTimeSec)
          bomberArtboard.advance(elapsedTimeSec)

          renderer.save()
          renderer.align(
            rive.Fit.contain,
            rive.Alignment.topCenter,
            {
              minX: position.x,
              minY: position.y,
              maxX: position.x + 220,
              maxY: position.y + 220,
            },
            bomberArtboard.bounds
          )
          bomberArtboard.draw(renderer)
          renderer.restore()
        }

        if (fighterArtboard && bomberStateMachine) {
          bomberStateMachine.advance(elapsedTimeSec)
          fighterArtboard.advance(elapsedTimeSec)

          renderer.save()
          renderer.align(
            rive.Fit.contain,
            rive.Alignment.topCenter,
            {
              minX: position.y + 200,
              minY: position.x,
              maxX: position.y + 420,
              maxY: position.x + 220,
            },
            fighterArtboard.bounds
          )
          fighterArtboard.draw(renderer)
          renderer.restore()
        }

        rive.requestAnimationFrame(renderLoop)
      }
      rive.requestAnimationFrame(renderLoop)
    }

    loadRive()

    // Clean-up function
    return () => {
      // Perform any necessary clean-up here
    }
  }, [rive, renderer, riveFile])

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
