import React from 'react'

import Header from './Header'

export default {
  title: 'Website Components/Header',
  component: Header,
  args: {},
}

const Template = (args: any) => <Header {...args} />

export const Default = Template.bind({})
