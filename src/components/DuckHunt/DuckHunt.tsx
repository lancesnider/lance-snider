import { useRef, useEffect } from 'react'
import { times } from 'lodash'
import RiveCanvas, {
  Artboard,
  Renderer,
  File,
  StateMachineInstance,
  SMIInput,
} from '@rive-app/canvas-advanced'

import {
  getInput,
  getStateMachineByName,
  redDuckPosition,
} from './duckHuntUtils'

const RIVE_WASM_URL =
  'https://unpkg.com/@rive-app/canvas-advanced@2.10.4/rive.wasm'
const RIVE_FILE_URL = '/rive/duck_hunt.riv'
const CANVAS_WIDTH = 768
const CANVAS_HEIGHT = 720

import './DuckHunt.scss'

enum GameState {
  HOME = 0,
  NEW_ROUND = 1,
  TURN = 2,
  BETWEEN_TURNS = 3,
}

const DuckHunt = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    let renderer: Renderer | null = null
    let file: File | null = null
    const ducks: {
      duckArtboard?: Artboard
      duckStateMachine: StateMachineInstance | null
      isGlideInput?: SMIInput | null
      isRightInput?: SMIInput | null
      resetTrigger?: SMIInput | null
      dieTrigger?: SMIInput | null
    }[] = []
    const redDucks: {
      redDuckArtboard?: Artboard
      redDuckStateMachine: StateMachineInstance | null
      redDuckStateInput?: SMIInput | null
    }[] = []
    let mainArtboard: Artboard | null = null
    let mainStateMachine: StateMachineInstance | null = null
    let handleClick: (e: MouseEvent) => void | null
    let handleMove: (e: MouseEvent) => void | null
    const mainCanvas = canvasRef.current as HTMLCanvasElement | null

    let currentRound = 0
    let duckCount = 1

    const loadDuckHunt = async () => {
      if (!canvasRef.current) return

      const rive = await RiveCanvas({
        locateFile: (_) => RIVE_WASM_URL,
      })

      if (!mainCanvas) return

      mainCanvas.width = CANVAS_WIDTH
      mainCanvas.height = CANVAS_HEIGHT

      renderer = rive.makeRenderer(mainCanvas)

      const bytes = await (
        await fetch(new Request(RIVE_FILE_URL))
      ).arrayBuffer()

      file = (await rive.load(new Uint8Array(bytes))) as File

      mainArtboard = file.artboardByName('duckHunt')
      mainStateMachine = getStateMachineByName(
        rive,
        'State Machine 1',
        mainArtboard
      )

      // Load 8 instances of the red ducks
      times(10, () => {
        const redDuckArtboard = file?.artboardByName('redDuck')
        const redDuckStateMachine = getStateMachineByName(
          rive,
          'State Machine 1',
          redDuckArtboard
        )

        const duckStateInput = getInput('duckState', redDuckStateMachine)

        redDucks.push({
          redDuckArtboard: redDuckArtboard,
          redDuckStateMachine: redDuckStateMachine,
          redDuckStateInput: duckStateInput,
        })
      })

      // create ducks (this happens when clicking play on the home screen)
      const instantiateDucks = (ducksToInstantiate: number) => {
        duckCount = ducksToInstantiate

        times(ducksToInstantiate, () => {
          const duckArtboard = file?.artboardByName('duck')
          const duckStateMachine = getStateMachineByName(
            rive,
            'State Machine 1',
            duckArtboard
          )

          const isGlideInput = getInput('isGlide', duckStateMachine)
          const isRightInput = getInput('isRight', duckStateMachine)
          const resetTrigger = getInput('reset', duckStateMachine)
          const dieTrigger = getInput('die', duckStateMachine)

          ducks.push({
            duckArtboard,
            duckStateMachine,
            isGlideInput,
            isRightInput,
            resetTrigger,
            dieTrigger,
          })
        })
      }

      /*
        Inputs
      */
      const gameStateInput = getInput('gameState', mainStateMachine)
      const ammoInput = getInput('ammo', mainStateMachine)

      /*
        Text runs

      */

      const roundNumberText = mainArtboard.textRun('roundNumber')

      handleClick = (e: MouseEvent) => {
        const rect = mainCanvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        mainStateMachine?.pointerDown(mouseX, mouseY)
      }

      mainCanvas.addEventListener('click', handleClick)

      handleMove = (e: MouseEvent) => {
        const rect = mainCanvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        mainStateMachine?.pointerMove(mouseX, mouseY)
      }

      mainCanvas.addEventListener('mousemove', handleMove)

      /*
        Rive events
      */

      const releaseDucks = () => {
        // console
        resetTurn()
      }

      const resetTurn = () => {
        currentRound++
        if (ammoInput) ammoInput.value = 3
      }

      const handleGameStateEvent = ({ properties }: any) => {
        if (!properties) return

        const { currentGameState } = properties

        switch (currentGameState) {
          case 'roundStart':
            currentRound++
            roundNumberText.text = currentRound.toString()
            return
          case 'releaseDucks':
            releaseDucks()
            return
          default:
            return
        }
      }

      /*
        Render Loop
      */

      let lastTime = 0
      function renderLoop(time: number) {
        if (!renderer || !mainArtboard || !mainStateMachine) return

        if (!lastTime) {
          lastTime = time
        }
        const elapsedTimeMs = time - lastTime
        const elapsedTimeSec = elapsedTimeMs / 1000
        lastTime = time

        // Rive events
        const numFiredEvents = mainStateMachine.reportedEventCount()
        for (let i = 0; i < numFiredEvents; i++) {
          const event = mainStateMachine.reportedEventAt(i)
          // Run any Event-based logic now
          if (!event) return

          switch (event.name) {
            case 'gameStateEvent':
              handleGameStateEvent(event)
              break
            case 'startGame1Duck':
              console.log('startGame1Duck')
              instantiateDucks(1)
              break
            case 'startGame2Ducks':
              console.log('startGame2Ducks')
              instantiateDucks(2)
              break
            default:
              break
          }
        }

        renderer.clear()

        // Advance the state machine and artboard
        mainStateMachine.advance(elapsedTimeSec)
        mainArtboard.advance(elapsedTimeSec)

        renderer.save()
        mainArtboard.draw(renderer)
        renderer.restore()

        // get mouse x position relative to the canvas
        if (gameStateInput?.value !== GameState.HOME) {
          redDucks.map(({ redDuckArtboard, redDuckStateMachine }, index) => {
            if (renderer && redDuckArtboard) {
              redDuckStateMachine?.advance(elapsedTimeSec)
              redDuckArtboard?.advance(elapsedTimeSec)
              renderer.save()

              const xPos = redDuckPosition.x + redDuckPosition.width * index

              renderer.align(
                rive.Fit.contain,
                rive.Alignment.topCenter,
                {
                  minX: xPos,
                  minY: redDuckPosition.y,
                  maxX: xPos + redDuckPosition.width,
                  maxY: redDuckPosition.y + redDuckPosition.height,
                },
                redDuckArtboard.bounds
              )
              redDuckArtboard?.draw(renderer)
              renderer.restore()
            }
          })
        }

        // Render ducks
        ducks.map(({ duckArtboard, duckStateMachine }, index) => {
          if (renderer && duckArtboard) {
            duckStateMachine?.advance(elapsedTimeSec)
            duckArtboard?.advance(elapsedTimeSec)
            renderer.save()

            const xPos = 256 + 256 * index

            // renderer.align(
            //   rive.Fit.contain,
            //   rive.Alignment.topCenter,
            //   {
            //     minX: xPos,
            //     minY: 108,
            //     maxX: xPos + 108,
            //     maxY: 108 + 108,
            //   },
            //   duckArtboard.bounds
            // )
            duckArtboard?.draw(renderer)
            renderer.restore()
          }
        })

        rive.requestAnimationFrame(renderLoop)
      }
      rive.requestAnimationFrame(renderLoop)
    }

    loadDuckHunt()

    return () => {
      console.log('DuckHunt unmounted')

      mainCanvas?.removeEventListener('click', handleClick as EventListener)
      mainCanvas?.removeEventListener('mouseMove', handleMove as EventListener)

      renderer?.delete()
      file?.delete()
      mainArtboard?.delete()

      ducks.forEach((duck) => {
        duck?.duckArtboard?.delete()
        duck?.duckStateMachine?.delete()
      })

      redDucks.forEach((redDuck) => {
        redDuck?.redDuckArtboard?.delete()
        redDuck?.redDuckStateMachine?.delete()
      })
    }
  }, [canvasRef.current])

  return (
    <div className='duck-hunt'>
      <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef} />
    </div>
  )
}

export default DuckHunt
