import React, { useEffect } from 'react'

import { createScene } from './GamePhysics'

const OffroadRally = () => {
  useEffect(() => {
    const { testbed, world } = createScene()

    testbed.start(world)
  }, [])

  return (
    <div>
      <span id='testbed-info'></span>
      <span id='testbed-status'></span>
      <button id='testbed-play'>Play</button>
    </div>
  )
}

export default OffroadRally
