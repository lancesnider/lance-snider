import React from 'react'

import DuckHunt from './DuckHunt'

export default {
  title: 'Components/DuckHunt',
  component: DuckHunt,
  args: {},
}

const Template = (args: any) => <DuckHunt {...args} />

export const Default = Template.bind({})
