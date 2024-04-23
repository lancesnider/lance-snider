import { useRef, useEffect } from 'react'
import { times } from 'lodash'
import gsap from 'gsap'
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

/*
  Game Logic

  - Home Screen
    - Show top score (saved to localstorage)
    - Click 1 duck or 2 ducks, which takes you to Game Screen
      - Instantiate ducks (The same duck instances get reused through the game)
  - Round Start
    - Reset round variables
    - When round animation (dog sniffing) completes, start turn
  - Turn
    - Random path is created for ducks to follow
    - Gun becomes active
    - Clicking anywhere fires shot, reducing ammo
      - When ammo is 0, ducks fly away, end turn
    - Clicking duck kills it
      - When all ducks are dead, end turn
  - End Turn
    - Reset turn variables (ammo, duck positions, etc.)
    - turnNumber++
    - Display end turn animation (dog laughing or holding duck(s))
    - If ducks released in this round == 10, end round
    - If ducks released in this round < 10, start next turn
  - End Round
    - Check if game over
    - End round animation
    - roundNumber++
    - Reset round variables
    - Update high score (if applicable)
  - Game Over
    - Game over animation
    - Reset everything
    - Go to Home Screen
*/

enum GameState {
  HOME_SCREEN = 0,
  ROUND_START = 1,
  TURN = 2,
  END_TURN = 3,
  END_ROUND = 4,
  GAME_OVER = 5,
}

const DUCK_WIDTH = 108
const DUCK_HEIGHT = 105
const ROUND_DURATION = 5
const DUCK_START_Y = 465

const DuckHunt = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    let currentRound = 0
    let currentTurn = 0
    let duckCount = 1
    let ducksKilledPerRound = 0
    let ducksKilledPerTurn = 0
    let missesPerTurn = 0
    let currentAmmo = 3
    let currentScore = 0
    let currentGameState = GameState.HOME_SCREEN

    let renderer: Renderer | null = null
    let file: File | null = null
    let ducks: {
      duckArtboard?: Artboard
      duckStateMachine: StateMachineInstance | null
      isGlideInput?: SMIInput | null
      isRightInput?: SMIInput | null
      resetTrigger?: SMIInput | null
      dieTrigger?: SMIInput | null
      timeline?: gsap.core.Timeline | null
      position: { x: number; y: number }
      previousPosition: { x: number; y: number }
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

    const removeDucks = () => {
      ducks.forEach(({ duckStateMachine, duckArtboard }) => {
        duckArtboard?.delete()
        duckStateMachine?.delete()
      })
      ducks = []
    }

    const loadDuckHunt = async () => {
      if (!canvasRef.current || !mainCanvas) return

      const rive = await RiveCanvas({
        locateFile: (_) => RIVE_WASM_URL,
      })

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

      /*
        Pass mouse move/click events to the Rive State Machine
      */
      handleClick = (e: MouseEvent) => {
        const rect = mainCanvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        checkHitDuck(mouseX, mouseY)

        mainStateMachine?.pointerDown(mouseX, mouseY)
      }
      mainCanvas.addEventListener('mousedown', handleClick)
      handleMove = (e: MouseEvent) => {
        const rect = mainCanvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        mainStateMachine?.pointerMove(mouseX, mouseY)
      }
      mainCanvas.addEventListener('mousemove', handleMove)

      /*
        Instantiate nested artboards
      */

      // Add 10 red ducks to the UI
      // These are used to indicate active turn and ducks hit/missed
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

      // Instantiate ducks (this happens when clicking play on the home screen)
      // The same duck(s) get reused throughout turns and rounds
      // Remove on Game Over
      const instantiateDucks = (ducksToInstantiate: number) => {
        duckCount = ducksToInstantiate

        times(ducksToInstantiate, () => {
          const duckArtboard = file?.artboardByName('duck')
          const duckStateMachine = getStateMachineByName(
            rive,
            'State Machine 1',
            duckArtboard
          )

          const timeline = gsap.timeline()

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
            timeline,
            position: { x: 0, y: 0 },
            previousPosition: { x: 0, y: 0 },
          })
        })
      }

      /*
        Game Inputs
      */
      const gameStateInput = getInput('gameState', mainStateMachine)
      const ammoInput = getInput('ammo', mainStateMachine)
      const turnOverTrigger = getInput('turnOver', mainStateMachine)
      const killsInput = getInput('kills', mainStateMachine)

      // Text runs
      const roundNumberText = mainArtboard.textRun('roundNumber')

      /*
        -----------------------------------------
        -------------- GAME LOGIC --------------
        -----------------------------------------
      */

      const startGame = (duckCount: number) => {
        instantiateDucks(duckCount)
        currentAmmo = 3
        beginRound()
      }

      const beginRound = () => {
        // reset red ducks in ui
        ducksKilledPerRound = 0
      }

      const beginTurn = () => {
        currentAmmo = 3
        missesPerTurn = 0
        ducksKilledPerTurn = 0
        // activate gun
        // release ducks
        ducks.map(({ position, resetTrigger, timeline }, index) => {
          resetTrigger?.fire()

          timeline?.clear()

          let xPos = 205 + 205 * index
          let yPos = DUCK_START_Y

          timeline?.set(position, {
            x: xPos,
            y: yPos,
          })

          let totalDuration = 0

          while (totalDuration < ROUND_DURATION) {
            const newXPos =
              Math.floor(Math.random() * CANVAS_WIDTH) - DUCK_WIDTH / 2
            const newYPos = Math.floor(Math.random() * 400) - DUCK_HEIGHT / 2

            const distance = Math.sqrt(
              Math.pow(newXPos - xPos, 2) + Math.pow(newYPos - yPos, 2)
            )

            const duration = distance / 300
            totalDuration += duration

            timeline?.to(position, {
              x: newXPos,
              y: newYPos,
              duration: duration,
              ease: 'linear',
            })

            xPos = newXPos
            yPos = newYPos
          }

          // fly offscreen
          const finalXPos =
            Math.floor(Math.random() * CANVAS_WIDTH) - DUCK_WIDTH / 2
          const finalYPos = -110
          const distance = Math.sqrt(
            Math.pow(finalXPos - xPos, 2) + Math.pow(finalYPos - yPos, 2)
          )
          const finalDuration = distance / 300
          timeline?.to(position, {
            x: finalXPos,
            y: finalYPos,
            duration: finalDuration,
            ease: 'linear',
            onComplete: () => {
              missesPerTurn++

              if (missesPerTurn + ducksKilledPerTurn === duckCount) {
                endTurn()
              }
            },
          })
        })
      }

      const checkHitDuck = (mouseX: number, mouseY: number) => {
        let ducksHit = 0

        ducks.map(({ position, timeline, dieTrigger }, index) => {
          if (
            ducksHit == 0 &&
            mouseX > position.x &&
            mouseX < position.x + DUCK_WIDTH &&
            mouseY > position.y &&
            mouseY < position.y + DUCK_HEIGHT
          ) {
            ducksHit++
            dieTrigger?.fire()
            timeline?.clear()

            // get duration based on y distance
            const distance = DUCK_START_Y - position.y

            timeline?.to(position, {
              y: DUCK_START_Y,
              duration: distance / 500,
              onComplete: duckLanded,
              ease: 'linear',
              delay: 0.6,
            })

            timeline?.play()
          }
        })

        currentAmmo -= 1

        if (ducksHit === 0) {
          console.log('miss')
        }
      }

      const duckLanded = () => {
        ducksKilledPerTurn++
        ducksKilledPerRound++

        if (ducksKilledPerTurn + missesPerTurn === duckCount) {
          endTurn()
        }
      }

      const endTurn = () => {
        if (killsInput && turnOverTrigger) {
          killsInput.value = ducksKilledPerTurn
          turnOverTrigger?.fire()
        }
      }

      const endTurnAnimationEnd = () => {
        currentTurn++
        if (currentTurn * duckCount === 10) {
          endRound()
        } else {
          beginTurn()
        }
      }

      const endRound = () => {
        // update high score
        // shift red ducks in ui until red are all to the left, white to the right
        if (ducksKilledPerRound >= 6) {
          console.log('round over, success')
          currentRound++
          beginRound()
        } else {
          gameOver()
        }
      }

      const gameOver = () => {
        // show game over animation for 5 seconds
        // reset game
        resetGame()
      }

      const resetGame = () => {
        currentRound = 0
        currentTurn = 0
        duckCount = 1
        ducksKilledPerRound = 0
        ducksKilledPerTurn = 0
        missesPerTurn = 0
        currentAmmo = 3
        currentScore = 0

        if (gameStateInput) gameStateInput.value = 0

        removeDucks()
      }

      /*
        -----------------------------------------
        -------------- Render Loop --------------
        -----------------------------------------
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

        /*
          Rive Event Handling
          Listen for events fired by Rive
        */
        const numFiredEvents = mainStateMachine.reportedEventCount()
        for (let i = 0; i < numFiredEvents; i++) {
          const event = mainStateMachine.reportedEventAt(i)
          // Run any Event-based logic now
          if (!event) return

          console.log('Rive Event:', event.name)

          switch (event.name) {
            case 'startGame1Duck':
              startGame(1)
              break
            case 'startGame2Ducks':
              startGame(2)
              break
            case 'beginRoundAnimationEnd':
              beginTurn()
              break
            case 'turnOverAnimationEnd':
              endTurnAnimationEnd()
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
        if (gameStateInput?.value !== GameState.HOME_SCREEN) {
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
        ducks.map(
          (
            {
              duckArtboard,
              duckStateMachine,
              position,
              previousPosition,
              isRightInput,
              isGlideInput,
            },
            index
          ) => {
            if (renderer && duckArtboard) {
              duckStateMachine?.advance(elapsedTimeSec)
              duckArtboard?.advance(elapsedTimeSec)
              renderer.save()

              // set duck positions
              if (isRightInput) {
                isRightInput.value = previousPosition.x < position.x
              }
              if (isGlideInput) {
                isGlideInput.value = previousPosition.y < position.y
              }
              renderer.translate(position.x, position.y)

              duckArtboard?.draw(renderer)
              renderer.restore()
              ducks[index].previousPosition = { ...position }
            }
          }
        )

        rive.requestAnimationFrame(renderLoop)
      }
      rive.requestAnimationFrame(renderLoop)
    }

    loadDuckHunt()

    /*
        -----------------------------------------
        ---------------- CLEANUP ----------------
        -----------------------------------------
      */

    return () => {
      console.log('DuckHunt unmounted')

      mainCanvas?.removeEventListener('click', handleClick as EventListener)
      mainCanvas?.removeEventListener('mouseMove', handleMove as EventListener)

      renderer?.delete()
      file?.delete()
      mainArtboard?.delete()

      removeDucks()

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
