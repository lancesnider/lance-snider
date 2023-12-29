import React from 'react'

import { allImages, masonryOrder } from '../../utils/images'
import MasonryCSS from './MasonryCSS'

export default {
  title: 'Website Components/Masonry (CSS)',
  component: MasonryCSS,
  args: {
    images: allImages,
    order: masonryOrder,
  },
}

const Template = (args) => <MasonryCSS {...args} />

export const Default = Template.bind({})
