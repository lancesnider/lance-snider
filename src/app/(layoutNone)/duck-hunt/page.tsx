'use client'

import DuckHunt from '@/components/DuckHunt/DuckHunt'

import './duckHunt.scss'

export default function Page() {
  return (
    <div className='duck-hunt'>
      <div className='duck-hunt__container'>
        {typeof window !== 'undefined' && window.innerWidth < 768 ? (
          <div className='duck-hunt__desktop'>Sorry, this is desktop only</div>
        ) : (
          <DuckHunt />
        )}
      </div>
    </div>
  )
}
