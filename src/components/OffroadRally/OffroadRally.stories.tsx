import React from 'react'

import OffroadRally from './OffroadRally'

export default {
  title: 'Games/OffroadRally',
  component: OffroadRally,
}

const Template = () => (
  <div style={{ maxWidth: 500 }}>
    <OffroadRally />
  </div>
)

export const Default = Template.bind({})
