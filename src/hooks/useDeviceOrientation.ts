import { useState, useEffect } from 'react'

type DeviceOrientation = {
  alpha: number | null
  beta: number | null
  gamma: number | null
}

function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    alpha: null,
    beta: null,
    gamma: null,
  })
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      console.log(event)
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      })
    }
    window.addEventListener('deviceorientation', handleOrientation)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])
  return orientation
}

export default useDeviceOrientation
