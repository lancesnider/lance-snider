'use client'

import MasonryCSS from '@/components/MasonryCSS/MasonryCSS'
import { masonryOrder } from '@/utils/images'

export default function Home() {
  return <MasonryCSS order={masonryOrder} />
}
