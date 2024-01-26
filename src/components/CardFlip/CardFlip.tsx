import classNames from 'classnames'

import useDistanceFromTop from '../../hooks/useDistanceFromTop'

import './CardFlip.scss'

export default function CardFlip() {
  const { ref, distanceFromTop } = useDistanceFromTop()
  const flipYPos = window.innerHeight / 2

  return (
    <div ref={ref} className='cardFlip'>
      <div
        ref={ref}
        className={classNames('cardFlipCard', {
          '-closeToTop': distanceFromTop && distanceFromTop < flipYPos,
        })}
      >
        <div className='cardFlipCardFront'>
          <h2>2/3</h2>
          <p>
            of parents say they have a tough time communicating with their
            children.
          </p>
        </div>
        <div className='cardFlipCardBack'>
          <h2>1/10</h2>
          <p>of kids are like, "you're my dad, you're a ghost!"</p>
        </div>
      </div>
    </div>
  )
}
