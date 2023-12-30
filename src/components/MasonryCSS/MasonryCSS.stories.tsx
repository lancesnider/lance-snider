import React from 'react'

import { masonryOrder } from '../../utils/images'
import MasonryCSS from './MasonryCSS'

export default {
  title: 'Website Components/Masonry (CSS)',
  component: MasonryCSS,
  args: {
    order: masonryOrder,
  },
}

const Template = (args: any) => <MasonryCSS {...args} />

export const Default = Template.bind({})
