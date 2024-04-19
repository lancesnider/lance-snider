import { useRef, useEffect } from 'react'
import RiveCanvas, {
  Artboard,
  Renderer,
  RiveCanvas as RiveCanvasType,
  File,
  StateMachineInstance,
} from '@rive-app/canvas-advanced'

const RIVE_WASM_URL =
  'https://unpkg.com/@rive-app/canvas-advanced@2.10.4/rive.wasm'
const RIVE_FILE_URL = '/rive/duck_hunt.riv'
const CANVAS_WIDTH = 768
const CANVAS_HEIGHT = 720

import './DuckHunt.scss'

const getStateMachineByName = (
  rive: RiveCanvasType,
  artboard: Artboard,
  name: string
) => {
  if (!rive) return null

  return new rive.StateMachineInstance(
    artboard.stateMachineByName(name),
    artboard
  )
}

const DuckHunt = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    let renderer: Renderer | null = null
    let file: File | null = null
    let mainArtboard: Artboard | null = null
    let mainStateMachine: StateMachineInstance | null = null
    let handleClick: (e: MouseEvent) => void | null
    let handleMove: (e: MouseEvent) => void | null
    const mainCanvas = canvasRef.current as HTMLCanvasElement | null

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
        mainArtboard,
        'State Machine 1'
      )

      /*
        Event Listeners
      */

      handleClick = (e: MouseEvent) => {
        const rect = mainCanvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        console.log('Mouse position relative to canvas:', mouseX, mouseY)

        mainStateMachine?.pointerDown(mouseX / 3, mouseY / 3)
      }

      mainCanvas.addEventListener('click', handleClick)

      handleMove = (e: MouseEvent) => {
        const rect = mainCanvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        console.log('Mouse position relative to canvas:', mouseX, mouseY)

        mainStateMachine?.pointerMove(mouseX / 3, mouseY / 3)
      }

      mainCanvas.addEventListener('mousemove', handleMove)

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
        renderer.clear()

        // Advance the state machine and artboard
        mainStateMachine.advance(elapsedTimeSec)
        mainArtboard.advance(elapsedTimeSec)
        renderer.save()

        // Align the artboard to the canvas
        renderer.align(
          rive.Fit.contain,
          rive.Alignment.center,
          {
            minX: 0,
            minY: 0,
            maxX: CANVAS_WIDTH,
            maxY: CANVAS_HEIGHT,
          },
          mainArtboard.bounds
        )

        // get mouse x position relative to the canvas

        mainArtboard.draw(renderer)
        renderer.restore()

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
    }
  }, [canvasRef.current])

  return (
    <div className='duck-hunt'>
      <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef} />
    </div>
  )
}

export default DuckHunt
