import React from 'react'

import BrokeBot from './BrokeBot'

export default {
  title: 'Experiments/BrokeBot',
  component: BrokeBot,
  args: {},
}

const Template = (args: any) => (
  <div style={{ backgroundColor: '#4b3641', width: 410, height: 307 }}>
    <BrokeBot {...args} />
  </div>
)

export const Default = Template.bind({})
