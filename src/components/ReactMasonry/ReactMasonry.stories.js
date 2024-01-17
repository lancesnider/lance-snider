import React from 'react'

import ReactMasonry from './ReactMasonry'
import { imagesGrouped2 } from '../../utils/images'

export default {
  title: 'Experiments/Masonry/Masonry (react-photo-gallery)',
  component: ReactMasonry,
  args: {
    images: imagesGrouped2
  },
}

const Template = (args) => <ReactMasonry {...args} />

export const Default = Template.bind({})
