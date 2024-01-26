import React from 'react'

import CardFlip from './CardFlip'

export default {
  title: 'CardFlip',
  component: CardFlip,
  args: {
    href: 'https://www.google.com',
    primary: true,
  },
}

const Template = (args: any) => (
  <div
    style={{
      padding: '500px 24px 1000px',
      display: 'grid',
      gap: 24,
      background: 'white',
      color: 'black',
    }}
  >
    Hey Eric. Try this one out with a mobile (scroll to see flip) and
    desktop-width (hover) screen.
    <CardFlip {...args} primary>
      CardFlip with href
    </CardFlip>
    <CardFlip {...args} primary>
      CardFlip with href
    </CardFlip>
    <CardFlip {...args} primary>
      CardFlip with href
    </CardFlip>
  </div>
)

export const Default = Template.bind({})
