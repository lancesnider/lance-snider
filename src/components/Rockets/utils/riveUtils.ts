import RiveCanvas, {
  Artboard,
  Renderer,
  File,
  StateMachineInstance,
  SMIInput,
} from '@rive-app/canvas-advanced'
import { StateMachineInputType } from '@rive-app/react-canvas'

// Rather than manually defining the input type, we can get it from the Rive input
const getInputType = (input: SMIInput) => {
  const { type } = input

  switch (type) {
    case StateMachineInputType.Number:
      return input.asNumber()
    case StateMachineInputType.Boolean:
      return input.asBool()
    case StateMachineInputType.Trigger:
      return input.asTrigger()
    default:
      return null
  }
}

const getInput = (
  inputName: string,
  stateMachine: StateMachineInstance | null
) => {
  if (!stateMachine) return

  let newInput

  // Cycle through the inputs to find the one with the specified name
  for (let i = 0, l = stateMachine.inputCount(); i < l; i++) {
    const input = stateMachine.input(i)
    switch (input.name) {
      case inputName:
        newInput = getInputType(input)
        break
      default:
        break
    }
  }

  return newInput
}

const advanceStateMachine = (
  elapsedTimeSec: number,
  artboard?: StateMachineInstance
) => {
  if (!artboard) return
  artboard.advance(elapsedTimeSec)
}

const advanceArtboard = (elapsedTimeSec: number, artboard?: Artboard) => {
  if (!artboard) return
  artboard.advance(elapsedTimeSec)
}

interface RiveCanvasProps {
  riveWasmUrl: string
  riveFile: string
  artboardNames?: string[]
  canvas: HTMLCanvasElement
  inputNames?: string[]
}

const riveCanvas = async ({
  riveWasmUrl,
  riveFile,
  artboardNames,
  canvas,
}: RiveCanvasProps) => {
  const rive = await RiveCanvas({
    locateFile: (_) => riveWasmUrl,
  })

  const renderer = rive.makeRenderer(canvas)

  const bytes = await (await fetch(new Request(riveFile))).arrayBuffer()

  const file = (await rive.load(new Uint8Array(bytes))) as File

  // Get all artboards
  const artboardsByName: { [key: string]: Artboard } = {}
  const artboards: Artboard[] = []

  artboardNames?.map((artboardName: string) => {
    const artboard: Artboard = file.artboardByName(artboardName)
    artboardsByName[artboardName] = artboard
    artboards.push(artboard)
  })

  // Get all inputs

  const unmountAll = () => {
    file.delete()

    // Delete all arboards
    artboards.map((artboard: Artboard) => {
      artboard.delete()
    })
  }

  return { rive, file, unmountAll, artboardsByName, artboards, renderer }
}

export { getInput, advanceStateMachine, advanceArtboard, riveCanvas }
