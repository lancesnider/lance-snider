import React from 'react'

import PetRock from './PetRock'

export default {
  title: 'Animations/PetRock',
  component: PetRock,
  args: {},
}

const Template = (args: any) => (
  <div style={{ height: '100vh' }}>
    <PetRock {...args} />
  </div>
)

export const Default = Template.bind({})
