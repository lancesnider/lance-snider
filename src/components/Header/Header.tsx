import React from 'react'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faEtsy } from '@fortawesome/free-brands-svg-icons'
import { faCode, faPalette } from '@fortawesome/free-solid-svg-icons'

import logo from '../../assets/logo.png'

import './Header.scss'

interface Props {
  isArt?: boolean
  isDev?: boolean
  devLink: string
}

const Header = ({ isArt, isDev, devLink }: Props) => {
  return (
    <div className='header'>
      <Link href='/' className='header__left'>
        <img src={logo.src} alt='logo' />
        lances_art
      </Link>
      <div className='header__links'>
        <div className='header__icons'>
          {isDev && (
            <a href='/'>
              <FontAwesomeIcon icon={faPalette} height={16} />
            </a>
          )}

          {isArt && (
            <a target='_blank' href='https://www.etsy.com/shop/artbylance'>
              <FontAwesomeIcon icon={faEtsy} height={16} />
            </a>
          )}
          <a target='_blank' href='https://www.instagram.com/lances_art/'>
            <FontAwesomeIcon icon={faInstagram} height={16} />
          </a>

          {isArt && (
            <a target='_blank' href={devLink}>
              <FontAwesomeIcon icon={faCode} height={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
