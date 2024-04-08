import { useEffect, useRef, useState } from 'react'
import { Engine, Bodies, World , Render, Mouse, MouseConstraint} from 'matter-js'

import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from '@rive-app/react-canvas'

function MatterJS() {
  const [ballPos, setBallPos] = useState({ x: 0, y: 0, angle: 0 })
  const scene = useRef()


  const engine = useRef(Engine.create())

  useEffect(() => {
    // Initialize the engine
    Engine.run(engine.current)

    // Add static bodies (walls) around the viewport edges
    const cw = 500
    const ch = 500


    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
      }
    })

    const wallThickness = 20
    const wallCenter = wallThickness / 2

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, wallCenter, cw, wallThickness, { isStatic: true, name: 'topWall' }),
      Bodies.rectangle(wallCenter, ch / 2, wallThickness, ch, { isStatic: true, name: 'leftWall' }),
      Bodies.rectangle(cw / 2, ch -wallCenter, cw, wallThickness, { isStatic: true, name: 'bottomWall' }),
      Bodies.rectangle(cw - wallCenter, ch / 2, wallThickness, ch, { isStatic: true, name: 'rightWall' }),
      Bodies.circle(100, 100, 50, {  mass: 10,
        restitution: 0.9,
        friction: 0.005,
        // isStatic: true,
        name: 'circle',
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent',
        }
      }),
    ])

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine.current, {
      mouse: mouse
    })

    World.add(engine.current.world, mouseConstraint)

    Engine.run(engine.current)
    Render.run(render)

    // Cleanup function
    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const handleAddCircle = e => {
    // random circle size between 30 and 70
    const circleSize = Math.floor(Math.random() * 40) + 30
    const ball = Bodies.circle(
      100,
      100,
      circleSize,
      {
        mass: 10,
        restitution: 0.9,
        friction: 0.005,
        render: {
          fillStyle: '#555'
        },
        // Custom property: name
        name: 'circleWireframe' // You can set any custom name here
      }
    )

    // Add the circle body to the world
    World.add(engine.current.world, [ball])
  }

  // Function to get information about all bodies
  const getBallInfo = () => {


    return engine.current.world.bodies.map(body => {
      if (body.name !== 'circle') return null

      return {
        name: body.name,
        position: { x: body.position.x, y: body.position.y },
        angle: body.angle
      }
    })
  }



  const onAdvance = () => {
    const ballInfo = getBallInfo()

    if (ballInfo.length >= 5) {
      const circleAngle = ballInfo[4].angle

      let positiveAngle = circleAngle % (2 * Math.PI); // Ensure the angle is within [0, 2π]
      if (positiveAngle < 0) {
        positiveAngle += 2 * Math.PI; // Adjust negative angle to positive range
      }
      const angleDegrees = (positiveAngle * 180 / Math.PI) % 360;

      setBallPos({
        x: ballInfo[4].position.x,
        y: ballInfo[4].position.y,
        angle: angleDegrees
      })
    }
  }

  const { rive, RiveComponent } = useRive({
    src: '/rive/matter.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
    width: 500,
    height: 500,
    onAdvance: onAdvance,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  })

  const xInput = useStateMachineInput(rive, 'State Machine 1', 'xPos')
  const yInput = useStateMachineInput(rive, 'State Machine 1', 'yPos')
  const rotationInput = useStateMachineInput(rive, 'State Machine 1', 'rotation')

  useEffect(() => {
    if (!yInput || !rotationInput) return

    xInput.value = ballPos.x
    yInput.value = ballPos.y
    rotationInput.value = ballPos.angle
   }, [yInput, rotationInput, ballPos])

  return (
    <div>
      <button onClick={handleAddCircle}>
        Add Body
      </button>
      <div style={{position:'relative'}}>
        <div style={{ width: 500, height: 500, position: 'relative' }}>
          <RiveComponent />
        </div>
        <div style={{ width: 500, height: 500, position: 'absolute', top: 0, left: 0}}>
          <div ref={scene} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

    </div>
  )
}

export default MatterJS