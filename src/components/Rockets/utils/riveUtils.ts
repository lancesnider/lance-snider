import { SMIInput, StateMachineInstance } from '@rive-app/canvas-advanced'

enum InputType {
  Number = 'number',
  Bool = 'bool',
  Trigger = 'trigger',
}

const getInputType = (inputType: InputType, input: SMIInput) => {
  switch (inputType) {
    case InputType.Number:
      return input.asNumber()
    case InputType.Bool:
      return input.asBool()
    case InputType.Trigger:
      return input.asTrigger()
    default:
      return null
  }
}

const getInput = (
  animationMachine: StateMachineInstance,
  inputType: InputType,
  inputName: string
) => {
  // This low level portion of the API requires iterating the inputs
  // to find the one you want.
  let groundSoloInput

  for (let i = 0, l = animationMachine.inputCount(); i < l; i++) {
    const input = animationMachine.input(i)
    switch (input.name) {
      case inputName:
        groundSoloInput = getInputType(inputType, input)
        break
      default:
        break
    }
  }

  return groundSoloInput
}

const getArtboardByName = (riveFile: any, name: string) => {
  return riveFile.artboardByName(name)
}

const getStateMachineByName = (rive: any, artboard: any, name: string) => {
  return new rive.StateMachineInstance(
    artboard.stateMachineByName(name),
    artboard
  )
}

export { getInput, InputType, getArtboardByName, getStateMachineByName }
