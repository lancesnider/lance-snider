import React from 'react'

import Masonry from './Masonry'
import { imagesGrouped } from '../../utils/images'

export default {
  title: 'Components/Masonry',
  component: Masonry,
  args: {
    images: imagesGrouped,
  },
}

const Template = (args: any) => (
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
