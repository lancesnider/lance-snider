import {
  World,
  Testbed,
  Vec2,
  Edge,
  Circle,
  Polygon,
  WheelJoint,
} from 'planck/with-testbed'

import { random } from 'lodash'

// wheel spring settings
var HZ = 2.4
var ZETA = 0.5
var SPEED = 80.0

var groundFD = {
  density: 0.0,
  friction: 0.6,
}

const lastTerrainPosition = { x: 20, y: 0 }

// number of times we make new ground
var lap = 0
var segmentsPerLap = 100
const dx = 5.0

const generateGround = (startX: number, hs: number[], ground: any) => {
  var x = lastTerrainPosition.x,
    y1 = lastTerrainPosition.y

  for (var i = 0; i < segmentsPerLap; ++i) {
    var y2 = random(-2.0, 2.0)
    ground.createFixture(new Edge(Vec2(x, y1), Vec2(x + dx, y2)), groundFD)
    y1 = y2
    x += dx

    if (i === 99) {
      lastTerrainPosition.x = x
      lastTerrainPosition.y = y2
    }
  }
}

const createScene = () => {
  let world = new World({
    gravity: new Vec2(0.0, -10.0),
  })

  const testbed = Testbed.mount()
  testbed.x = 0
  testbed.y = 0
  testbed.ratio = 40
  // Viewbox size
  testbed.width = 30
  testbed.height = 20

  /*
    Ground
  */

  var ground = world.createBody()

  ground.createFixture(new Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)), groundFD)

  var hs = [
    0.25, 1.0, 4.0, 0.0, 0.0, -1.0, -2.0, -2.0, -1.25, 0.0, 0.25, 1.0, 4.0, 0.0,
    0.0, -1.0, -2.0, -2.0, -1.25, 0.0, 0.25, 1.0, 4.0, 0.0, 0.0, -1.0, -2.0,
    -2.0, -1.25, 0.0, 0.25, 1.0, 4.0, 0.0, 0.0, -1.0, -2.0, -2.0, -1.25, 0.0,
  ]

  generateGround(20, hs, ground)

  /*
    Truck
  */

  // Truck body
  var car = world.createDynamicBody(Vec2(0.0, 2))
  car.createFixture(
    new Polygon([
      Vec2(-1.5, -0.5),
      Vec2(1.5, -0.5),
      Vec2(1.5, 0.0),
      Vec2(0.0, 0.9),
      Vec2(-1.15, 0.9),
      Vec2(-1.5, 0.2),
    ]),
    1.0
  )

  // Add wheels
  var wheelFD = {
    density: 1.0,
    friction: 0.9,
  }

  var wheelBack = world.createDynamicBody(Vec2(-1.75, 0.5))
  wheelBack.createFixture(new Circle(0.6), wheelFD)

  var wheelFront = world.createDynamicBody(Vec2(1.75, 0.5))
  wheelFront.createFixture(new Circle(0.6), wheelFD)

  // Add shocks
  var springBack = world.createJoint(
    new WheelJoint(
      {
        motorSpeed: 0.0,
        maxMotorTorque: 20.0,
        enableMotor: true,
        frequencyHz: HZ,
        dampingRatio: ZETA,
      },
      car,
      wheelBack,
      wheelBack.getPosition(),
      Vec2(0.0, 1.0)
    )
  )

  var springFront = world.createJoint(
    new WheelJoint(
      {
        motorSpeed: 0.0,
        maxMotorTorque: 20.0,
        enableMotor: false,
        frequencyHz: HZ,
        dampingRatio: ZETA,
      },
      car,
      wheelFront,
      wheelFront.getPosition(),
      Vec2(0.0, 1.0)
    )
  )

  /*
    Controls
  */

  testbed.step = function () {
    if (!springBack || !springFront) return

    if (testbed.activeKeys.left) {
      // Apply torque for left turn (counter-clockwise)
      car.applyTorque(100, true)
    } else if (testbed.activeKeys.right) {
      // Apply torque for right turn (clockwise)
      car.applyTorque(-100, true)
    }

    if (testbed.activeKeys.up && testbed.activeKeys.down) {
      springBack.setMotorSpeed(0)
      springBack.enableMotor(false)
      springFront.setMotorSpeed(0)
      springFront.enableMotor(false)
    } else if (testbed.activeKeys.up) {
      const speed = -SPEED

      springBack.setMotorSpeed(speed)
      springBack.enableMotor(true)
      springFront.setMotorSpeed(speed)
      springFront.enableMotor(true)
    } else if (testbed.activeKeys.down) {
      const speed = +SPEED

      springBack.setMotorSpeed(speed)
      springBack.enableMotor(true)
      springFront.setMotorSpeed(speed)
      springFront.enableMotor(true)
    } else {
      springBack.setMotorSpeed(0)
      springBack.enableMotor(false)
      springFront.setMotorSpeed(0)
      springFront.enableMotor(false)
    }

    var cp = car.getPosition()
    testbed.x = cp.x + 10
    testbed.y = -cp.y

    if (cp.x > lap * dx * segmentsPerLap) {
      // generateGround(20, hs, ground)
      generateGround(0, [], ground)
      console.log('lap!!!', lap)
      lap += 1
    }
  }

  return { world, testbed }
}

export { createScene }
