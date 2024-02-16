import type { Metadata } from 'next'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import '@/app/page.scss'

export const metadata: Metadata = {
  title: 'Lance Snider - Artist & Dev',
  description: 'I make pretty things.',
}

// const devLink = 'https://main--658df898ec129ee3d5a882ae.chromatic.com'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='layout'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
