import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import './Race.scss'
import classNames from 'classnames'

interface Props {
  totalDuration: number
  users: {
    id: string
    name: string
    race?: { duration: number; x: number; y: number }[]
  }[]
}

const Race = ({ users, totalDuration }: Props) => {
  const raceRef = useRef<HTMLDivElement>(null)

  const spacing = 500 / users.length

  useGSAP(() => {
    users.map(
      (user, index) => {
        gsap.set(`.rocket${index}`, { x: spacing * index, y: 0 })

        const tl = gsap.timeline({ delay: 2 })

        user?.race?.map(({ x, y, duration }) => {
          tl.to(`.rocket${index}`, {
            x: x,
            y: y,
            duration: duration * totalDuration,
            ease: 'back.inOut',
          })
        })
      },
      { scope: raceRef }
    )
  })

  return (
    <div className='race' ref={raceRef}>
      {users.map(({ id }, index) => (
        <div key={id} className={classNames('rocket', `rocket${index}`)}></div>
      ))}
    </div>
  )
}

export default Race
