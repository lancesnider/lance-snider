import React from 'react'

import Header from './Header'

export default {
  title: 'Website Components/Header',
  component: Header,
  args: {
    isArt: true,
    isDev: false,
    devLink: '#',
  },
}

const Template = (args: any) => (
  <div>
    <Header {...args} />
    <div
      style={{
        maxWidth: 768,
      }}
    >
      <Header {...args} />
    </div>
    <div
      style={{
        maxWidth: 360,
      }}
    >
      <Header {...args} />
    </div>
    <Header {...args} isArt={false} isDev />
    <div
      style={{
        maxWidth: 768,
      }}
    >
      <Header {...args} isArt={false} isDev />
    </div>
    <div
      style={{
        maxWidth: 360,
      }}
    >
      <Header {...args} isArt={false} isDev />
    </div>
  </div>
)

export const Default = Template.bind({})
