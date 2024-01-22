import React from 'react'

import Header from './Header'

export default {
  title: 'lances_art site/Header',
  component: Header,
  args: {},
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
  </div>
)

export const Default = Template.bind({})
