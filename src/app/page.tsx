'use client'

import MasonryCSS from '@/components/MasonryCSS/MasonryCSS'
import { masonryOrder } from '@/utils/images'

import './page.scss'
import Header from '@/components/Header/Header'

export default function Home() {
  return (
    <main className='page'>
      <Header />
      <MasonryCSS order={masonryOrder} />
    </main>
  )
}
