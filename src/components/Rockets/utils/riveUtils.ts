import {
  SMIInput,
  StateMachineInstance,
  Artboard,
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

const getInput = (inputName: string, stateMachine?: StateMachineInstance) => {
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

export { getInput, advanceStateMachine, advanceArtboard }
