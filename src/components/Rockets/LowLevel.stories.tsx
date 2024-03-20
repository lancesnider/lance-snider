import React from 'react'

import LowLevel from './LowLevel'

export default {
  title: 'Animations/LowLevel',
  component: LowLevel,
  args: {},
}

const Template = (args: any) => (
  <div style={{ height: '100vh' }}>
    <LowLevel {...args} />
  </div>
)

export const Default = Template.bind({})
