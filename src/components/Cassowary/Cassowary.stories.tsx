import React from 'react'

import Cassowary from './Cassowary'

export default {
  title: 'Animations/Cassowary',
  component: Cassowary,
  args: {},
}

const Template = (args: any) => (
  <div style={{ height: '100vh', paddingTop: 32 }}>
    <Cassowary {...args} />
  </div>
)

export const Default = Template.bind({})
