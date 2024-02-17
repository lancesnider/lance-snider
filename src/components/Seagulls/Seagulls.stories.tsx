import React from 'react'

import Seagulls from './Seagulls'

export default {
  title: 'Components/Seagulls',
  component: Seagulls,
  args: {},
}

const Template = (args: any) => (
  <div style={{ height: '100vh' }}>
    <Seagulls {...args} />
  </div>
)

export const Default = Template.bind({})
