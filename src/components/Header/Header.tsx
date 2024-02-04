import React from 'react'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faEtsy } from '@fortawesome/free-brands-svg-icons'

import logo from '../../assets/logo.png'

import './Header.scss'

const Header = () => {
  return (
    <header className='header'>
      <Link href='/' className='header__left'>
        <img src={logo.src} alt='Lance Snider Logo' />
        <div className='header__name'>
          <div>lance</div>
          <div className='header__last-name'>snider</div>
        </div>
      </Link>
      <div className='header__links'>
        <div className='header__text-links'>
          <Link href='/'>
            <div className='header__link-text'>art</div>
          </Link>
          <Link href='/dev'>
            <div className='header__link-text'>dev</div>
          </Link>
        </div>
        <div className='header__icons'>
          <a
            target='_blank'
            href='https://www.etsy.com/shop/artbylance'
            aria-label='Etsy'
          >
            <FontAwesomeIcon icon={faEtsy} height={16} />
          </a>
          <a
            target='_blank'
            href='https://www.instagram.com/lances_art/'
            aria-label='Instagram'
          >
            <FontAwesomeIcon icon={faInstagram} height={16} />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
