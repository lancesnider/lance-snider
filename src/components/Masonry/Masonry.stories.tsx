import React from 'react'

import Masonry from './Masonry'
import { imagesGrouped } from '../../utils/images'

export default {
  title: 'Experiments/Masonry (@mui)',
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
    <div className='storybook__description'>
      <h1>Masonry</h1>
      <p>
        This is just the{' '}
        <a href='https://mui.com/material-ui/react-masonry/'>MUI Masonry</a>{' '}
        component with the added benefit of having groups of images in a single
        grid item.
      </p>
      <p>
        It's nice, but currently there's a{' '}
        <a href='https://github.com/mui/material-ui/issues/36673'>
          known, unresolved issue
        </a>
        . When it first renders, it shows a single column for a sec, then splits
        it into multiple columns.
      </p>

      <p>
        The other downside is the lack of control. Changing the order in the 3
        column layout will affect other column widths.
      </p>

      <p>
        For now I'm going to use my own home-spun masonry component, but it's
        nice to keep this one around for testing different layouts. And who
        knows, maybe they'll fix their shit.
      </p>
    </div>

    <Masonry {...args} />
  </div>
)

export const Default = Template.bind({})
