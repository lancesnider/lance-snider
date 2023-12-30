import React from 'react'
import Link from 'next/link'

import logo from '../../assets/logo.png'

import './Header.scss'

const Header = () => {
  return (
    <div className='header'>
      <Link href='/' className='header__left'>
        <img src={logo.src} alt='logo' />
        lances_art
      </Link>
      <div className='header__links'>
        <a href='https://www.etsy.com/shop/artbylance'>Store</a>
        <a href='https://www.instagram.com/lances_art/'>Insta</a>
      </div>
    </div>
  )
}

export default Header
