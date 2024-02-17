import { useEffect, useState } from 'react'

interface MousePosition {
  mouseX: number | null
  mouseY: number | null
  mouseXPerc: number | null
  mouseYPerc: number | null
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    mouseX: null,
    mouseY: null,
    mouseXPerc: null,
    mouseYPerc: null,
  })

  const setValues = ({
    mouseX,
    mouseY,
  }: {
    mouseX: number
    mouseY: number
  }) => {
    setMousePosition({
      mouseX: mouseX,
      mouseY: mouseY,
      mouseXPerc: (mouseX / window.innerWidth) * 100,
      mouseYPerc: (mouseY / window.innerHeight) * 100,
    })
  }

  const updateMousePosition = (e: MouseEvent) => {
    setValues({ mouseX: e.clientX, mouseY: e.clientY })
  }

  const updateTouchPosition = (e: TouchEvent) => {
    setValues({
      mouseX: e.touches[0].clientX,
      mouseY: e.touches[0].clientY,
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('touchmove', updateTouchPosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('touchmove', updateTouchPosition)
    }
  }, [])

  return {
    ...mousePosition,
  }
}

export default useMousePosition
