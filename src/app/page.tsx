'use client'

import Image from 'next/image'

import Masonry from '@/components/Masonry/Masonry'
import { imagesGrouped } from '@/utils/images'

// import styles from './page.module.scss'
import './page.scss'
import Header from '@/components/Header/Header'

export default function Home() {
  return (
    <main className='page'>
      <Header />
      <Masonry images={imagesGrouped} />
    </main>
  )
}
