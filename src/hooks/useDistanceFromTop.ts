import { useEffect, useState, useRef } from 'react'

function useDistanceFromTop(): {
  ref: React.RefObject<HTMLDivElement>
  distanceFromTop: number | null
} {
  const [distanceFromTop, setDistanceFromTop] = useState<null | number>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('useEffect')
    const handleScroll = () => {
      console.log('scroll')
      if (ref.current) {
        const { top } = ref.current.getBoundingClientRect()
        setDistanceFromTop(top)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      console.log('end')
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { ref, distanceFromTop }
}

export default useDistanceFromTop
