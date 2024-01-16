import React from 'react'

import ReactMasonry from './ReactMasonry'

export default {
  title: 'Experiments/Masonry (react-photo-gallery)',
  component: ReactMasonry,
  args: {},
}

const Template = (args) => <ReactMasonry {...args} />

export const Default = Template.bind({})
