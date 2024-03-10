import React from 'react'

import Flags from './Flags'

export default {
  title: 'Animations/Flags',
  component: Flags,
  args: {},
}

const Template = (args: any) => (
  <div style={{ height: '100vh', paddingTop: 32 }}>
    <Flags {...args} />
  </div>
)

export const Default = Template.bind({})
