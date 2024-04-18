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

const getInput = (
  inputName: string,
  animationMachine?: StateMachineInstance
) => {
  if (!animationMachine) return

  // This low level portion of the API requires iterating the inputs
  // to find the one you want.
  let groundSoloInput

  // Cycle through the inputs to find the one with the specified name
  for (let i = 0, l = animationMachine.inputCount(); i < l; i++) {
    const input = animationMachine.input(i)
    switch (input.name) {
      case inputName:
        groundSoloInput = getInputType(input)
        break
      default:
        break
    }
  }

  return groundSoloInput
}

const getStateMachineByName = (rive: any, artboard: any, name: string) => {
  return new rive.StateMachineInstance(
    artboard.stateMachineByName(name),
    artboard
  )
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

export { getInput, getStateMachineByName, advanceStateMachine, advanceArtboard }
