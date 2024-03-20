// import RiveCanvas, { File } from '@rive-app/canvas-advanced'
// import './styles.css'

// async function main() {
//   const rive = await RiveCanvas({
//     // Loads Wasm bundle
//     locateFile: (_) =>
//       `https://unpkg.com/@rive-app/canvas-advanced@2.7.3/rive.wasm`,
//   })
//   const canvas = document.getElementById('rive-canvas') as HTMLCanvasElement
//   canvas.height = 400
//   canvas.width = 500

//   const renderer = rive.makeRenderer(canvas)
//   const bytes = await (await fetch(new Request('basketball.riv'))).arrayBuffer()
//   const file = (await rive.load(new Uint8Array(bytes))) as File
//   const artboard = file.defaultArtboard()
//   let animation = new rive.LinearAnimationInstance(
//     artboard.animationByIndex(0),
//     artboard
//   )

//   let lastTime = 0

//   function renderLoop(time) {
//     if (!lastTime) {
//       lastTime = time
//     }
//     const elapsedTimeMs = time - lastTime
//     const elapsedTimeSec = elapsedTimeMs / 1000
//     lastTime = time

//     renderer.clear()
//     if (artboard) {
//       if (animation) {
//         animation.advance(elapsedTimeSec)
//         animation.apply(1)
//       }
//       artboard.advance(elapsedTimeSec)
//       renderer.save()
//       renderer.align(
//         rive.Fit.contain,
//         rive.Alignment.center,
//         {
//           minX: 0,
//           minY: 0,
//           maxX: canvas.width,
//           maxY: canvas.height,
//         },
//         artboard.bounds
//       )
//       artboard.draw(renderer)
//       renderer.restore()
//     }
//     rive.requestAnimationFrame(renderLoop)
//   }
//   rive.requestAnimationFrame(renderLoop)
// }

// main()
