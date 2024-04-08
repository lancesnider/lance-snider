import React from 'react'

import MatterJS from './MatterJS'

export default {
  title: 'Components/MatterJS',
  component: MatterJS,
  args: {},
}

const Template = (args) => <MatterJS {...args} />

export const Default = Template.bind({})
