import React from 'react'

import Cassowary from './Cassowary'

export default {
  title: 'Components/Cassowary',
  component: Cassowary,
  args: {},
}

const Template = (args: any) => (
  <div style={{ height: '100vh' }}>
    <Cassowary {...args} />
  </div>
)

export const Default = Template.bind({})
