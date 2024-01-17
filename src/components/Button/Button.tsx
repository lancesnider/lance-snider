'use client'
import React, { ReactNode } from 'react'

import Link from 'next/link'
import classNames from 'classnames'
import { Url } from 'next/dist/shared/lib/router/router'

import './Button.scss'

/**
 * Renders a button, or a link if `href` is given, with default styling.
 *
 * @public
 */
interface Props {
  active?: boolean
  icon?: boolean
  primary?: boolean
  href?: Url
  className?: string
  children: ReactNode
  target?: string
  rel?: string
  role?: string
  onClick?: () => void
  onMouseDown?: () => void
  disabled?: boolean
  width?: number
}

function Button({
  active,
  className,
  primary,
  href,
  icon,
  disabled,
  width,
  ...restOfProps
}: Props) {
  const Component = href ? Link : 'button'
  const buttonClassName = classNames('button', className, {
    'button--primary': primary,
    'button--active': active,
    'button--icon': icon,
    'button--disabled': disabled,
  })

  return (
    <Component
      disabled={disabled}
      className={buttonClassName}
      // @ts-ignore
      href={href}
      style={{ width: width }}
      {...restOfProps}
    />
  )
}

export default Button
