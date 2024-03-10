import React from 'react'

import Arcade from './Arcade'

export default {
  title: 'Animations/Arcade',
  component: Arcade,
  args: {},
}

const Template = (args: any) => (
  <div style={{ height: '100vh', padding: 32 }}>
    <Arcade {...args} />
  </div>
)

export const Default = Template.bind({})
