import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from '@rive-app/react-canvas'
import { useEffect } from 'react'

interface Props {
  boost: boolean
}

// Wrapper component to isolate useRive logic that
// renders the <RiveComponent />
const Rocket = ({ boost }: Props) => {
  const { rive, RiveComponent } = useRive({
    src: '/rive/rocketship.riv',
    stateMachines: 'Race',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  })

  const boostInput = useStateMachineInput(rive, 'Race', 'boost')

  useEffect(() => {
    if (!boostInput) return

    boostInput.value = boost
  }, [boost, boostInput])

  return <RiveComponent />
}

export default Rocket
