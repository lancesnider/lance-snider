'use client'
import React from 'react'
import Link from 'next/link'

import Button from '../Button/Button'

import './Footer.scss'

interface Props {
  devLink: string
}

const Footer = ({ devLink }: Props) => {
  const [copySuccess, setCopySuccess] = React.useState(false)

  const copyContact = () => {
    setCopySuccess(true)
    navigator.clipboard.writeText('lance@lancesnider.com')
  }

  return (
    <>
      <hr />
      <div className='footer'>
        <h2>God I love coloring</h2>
        <div className='footer__heading'>
          Let's chat about doing art.
          <br />
          Or dev&hellip; or artsy dev.
        </div>

        <Button onClick={copyContact} primary width={200}>
          {copySuccess ? 'Copied!' : 'Copy My Email'}
        </Button>

        <div className='footer__links'>
          <Link href='https://www.instagram.com/lances_art/'>art</Link>
          <Link href='https://www.instagram.com/lances_art/'>instagram</Link>
          <Link href='https://www.etsy.com/shop/artbylance'>etsy</Link>
        </div>
        <div className='footer__copyright'>
          {/* display the current year thatn copyright */}
          &copy; {new Date().getFullYear()} Blah, blah - legal stuff
        </div>
      </div>
    </>
  )
}

export default Footer
