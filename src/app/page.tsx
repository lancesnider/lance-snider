'use client'

import ReactMasonry from '@/components/ReactMasonry/ReactMasonry'
import { imagesGrouped2 } from '@/utils/images'

export default function Home() {
  return <ReactMasonry images={imagesGrouped2} />
}
