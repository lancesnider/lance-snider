import React from 'react'

import Footer from './Footer'

export default {
  title: 'lances_art site/Footer',
  component: Footer,
  args: {
    devLink: '#',
  },
}

const Template = (args: any) => <Footer {...args} />

export const Default = Template.bind({})
