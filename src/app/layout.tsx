import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import './globals.scss'
import '@/app/page.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lance Snider - Artist & Dev',
  description: 'I make pretty things.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
