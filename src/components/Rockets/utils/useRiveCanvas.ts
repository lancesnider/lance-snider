import { useState, useRef, useEffect } from 'react'
import RiveCanvas, {
  RiveCanvas as RiveCanvasType,
  WrappedRenderer,
} from '@rive-app/canvas-advanced'

interface Props {
  wasmUrl: string
  dimensions: { width: number; height: number }
  riveFileUrl: string
  artboardName?: string
}

enum InputType {
  Number = 'number',
  Bool = 'bool',
  Trigger = 'trigger',
}

const useRiveCanvas = ({ wasmUrl, dimensions, riveFileUrl }: Props) => {
  const [rive, setRive] = useState<RiveCanvasType | null>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [renderer, setRenderer] = useState<WrappedRenderer | null>(null)
  const [mainRiveFile, setMainRiveFile] = useState<any>(null)
  const [context2d, setContext2d] = useState<CanvasRenderingContext2D | null>(
    null
  )

  const canvasRef = useRef(null)

  useEffect(() => {
    async function loadRive() {
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
    }

    loadRive()
  }, [])

  return {
    context2d,
    canvasRef,
    rive,
    canvas,
    renderer,
    riveFile: mainRiveFile,
    InputType,
  }
}

export default useRiveCanvas
