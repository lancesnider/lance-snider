import React from 'react'

import LowLevel from './LowLevel'

const raceData = {
  users: [
    {
      id: '1',
      name: 'Jason',
      ship: 'frigate',
      place: 1,
      race: [
        { time: 0.1, x: 100, y: 140 },
        { time: 0.3, x: 200, y: 240 },
        { time: 0.2, x: 300, y: 300 },
        { time: 0.15, x: 300, y: 300 },
        { time: 0.1, x: 100, y: 140 },
        { time: 0.15, x: 300, y: 300 },
      ],
    },
    {
      id: '2',
      name: 'Lance',
      ship: 'gunner',
      race: [{ time: 0.3, x: 220, y: 240, onCompleteTrigger: 'destroy' }],
    },
  ],
  duration: 60,
}

export default {
  title: 'Animations/LowLevel',
  component: LowLevel,
  args: {
    raceData,
  },
}

const Template = (args: any) => (
  <div style={{ height: '100vh' }}>
    <LowLevel {...args} />
  </div>
)

export const Default = Template.bind({})
