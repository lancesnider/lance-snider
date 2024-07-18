import React from 'react'

import MagicAlley from './MagicAlley'

export default {
  title: 'Animations/MagicAlley',
  component: MagicAlley,
  args: {},
}

const Template = (args: any) => (
  <div style={{ height: '100vh' }}>
    <MagicAlley {...args} />
  </div>
)

export const Default = Template.bind({})
