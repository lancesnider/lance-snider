import React from 'react'

import Masonry from './Masonry'
import { imagesGrouped } from '../../utils/storybook'

export default {
  title: 'Components/Masonry',
  component: Masonry,
  args: {
    images: imagesGrouped,
  },
}

const Template = (args) => (
  <div
    style={{
      backgroundColor: '#1A2027',
      padding: 16,
    }}
  >
    <Masonry {...args} />
  </div>
)

export const Default = Template.bind({})
