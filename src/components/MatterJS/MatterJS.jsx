import { useEffect, useRef } from 'react'
import { Engine, Bodies, World } from 'matter-js'

function Comp (props) {
  const engine = useRef(Engine.create())

  useEffect(() => {
    // Initialize the engine
    Engine.run(engine.current)

    // Add static bodies (walls) around the viewport edges
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true, name: 'topWall' }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true, name: 'leftWall' }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true, name: 'bottomWall' }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true, name: 'rightWall' })
    ])

    // Cleanup function
    return () => {
      World.clear(engine.current.world)
      Engine.clear(engine.current)
    }
  }, [])

  const handleAddCircle = e => {
    // Create a circle body at the mouse position
    const ball = Bodies.circle(
      e.clientX,
      e.clientY,
      10 + Math.random() * 30,
      {
        mass: 10,
        restitution: 0.9,
        friction: 0.005,
        render: {
          fillStyle: '#0000ff'
        },
        // Custom property: name
        name: 'circle' // You can set any custom name here
      }
    )

    // Add the circle body to the world
    World.add(engine.current.world, [ball])
  }

  // Function to get information about all bodies
  const getBodyInfo = () => {
    return engine.current.world.bodies.map(body => {
      return {
        name: body.name, // Accessing the custom 'name' property
        position: { x: body.position.x, y: body.position.y },
        angle: body.angle
        // You can add more properties as needed
      }
    })
  }

  return (
    <div >
      <button onClick={() => {
        console.log(getBodyInfo())
      }}>
        Log Body Info
      </button>
      <button onClick={handleAddCircle}>
        Add Body
      </button>
    </div>
  )
}

export default Comp