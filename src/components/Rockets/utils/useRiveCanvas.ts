import { useState, useRef, useEffect, useCallback } from 'react'
import RiveCanvas, {
  Artboard,
  Renderer,
  RiveCanvas as RiveCanvasType,
} from '@rive-app/canvas-advanced'

import { getInput, advanceStateMachine, advanceArtboard } from './riveUtils'

interface Props {
  wasmUrl: string
  dimensions: { width: number; height: number }
  riveFileUrl: string
  artboardName?: string
}

const useRiveCanvas = ({ wasmUrl, dimensions, riveFileUrl }: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [rive, setRive] = useState<RiveCanvasType | null>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [renderer, setRenderer] = useState<Renderer | null>(null)
  const [mainRiveFile, setMainRiveFile] = useState<any>(null)
  const [context2d, setContext2d] = useState<CanvasRenderingContext2D | null>(
    null
  )

  const canvasRef = useRef(null)

  const getArtboardByName = useCallback(
    (name: string) => {
      if (!mainRiveFile) return

      return mainRiveFile.artboardByName(name)
    },
    [rive]
  )

  const getStateMachineByName = useCallback(
    (artboard: Artboard, name: string) => {
      if (!rive) return

      return new rive.StateMachineInstance(
        artboard.stateMachineByName(name),
        artboard
      )
    },
    [rive]
  )

  useEffect(() => {
    async function loadRive() {
      try {
        setLoading(true)

        const rive = await RiveCanvas({
          locateFile: (_) => wasmUrl,
        })

        const mainCanvas = canvasRef.current as HTMLCanvasElement | null

        if (!mainCanvas) return

        mainCanvas.width = dimensions.width
        mainCanvas.height = dimensions.height

        const renderer = rive.makeRenderer(mainCanvas)

        const riveFile = await fetch(riveFileUrl)
        const arrayBuffer = await riveFile.arrayBuffer()
        const mainRive = await rive.load(new Uint8Array(arrayBuffer))
        const context = mainCanvas.getContext('2d')

        setContext2d(context)
        setCanvas(mainCanvas)
        setRenderer(renderer)
        setRive(rive)
        setMainRiveFile(mainRive)

        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
    }

    loadRive()
  }, [])

  return {
    loading,
    error,
    context2d,
    canvasRef,
    rive,
    canvas,
    renderer,
    getArtboardByName,
    getStateMachineByName,
  }
}

export {
  useRiveCanvas as default,
  getInput,
  advanceStateMachine,
  advanceArtboard,
}
