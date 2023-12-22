import { useEffect, useState } from 'react'

interface MousePosition {
  mouseX: number | null
  mouseY: number | null
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    mouseX: null,
    mouseY: null,
  })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ mouseX: e.clientX, mouseY: e.clientY })
    }

    const updateTouchPosition = (e: TouchEvent) => {
      setMousePosition({
        mouseX: e.touches[0].clientX,
        mouseY: e.touches[0].clientY,
      })
    }

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
