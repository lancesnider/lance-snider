import React from 'react'

import Footer from './Footer'

export default {
  title: 'Website Components/Footer',
  component: Footer,
  args: {
    devLink: '#',
  },
}

const Template = (args: any) => <Footer {...args} />

export const Default = Template.bind({})
