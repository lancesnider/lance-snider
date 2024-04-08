import React from 'react'

import MatterJS from './MatterJS'

export default {
  title: 'Experiments/Rive Physics Test',
  component: MatterJS,
  args: {},
}

const Template = (args) => <MatterJS {...args} />

export const Default = Template.bind({})
