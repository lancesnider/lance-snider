import {
  Artboard,
  RiveCanvas as RiveCanvasType,
  SMIInput,
  StateMachineInstance,
} from '@rive-app/canvas-advanced'
import { StateMachineInputType } from '@rive-app/react-canvas'

const getStateMachineByName = (
  rive: RiveCanvasType,
  name: string,
  artboard?: Artboard
) => {
  if (!rive || !artboard) return null

  return new rive.StateMachineInstance(
    artboard.stateMachineByName(name),
    artboard
  )
}

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

export { getStateMachineByName, getInput }
