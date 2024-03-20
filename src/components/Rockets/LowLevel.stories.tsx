import React from 'react'

import LowLevel from './LowLevel'

const raceData = {
  users: [
    {
      id: '1',
      name: 'Jason',
      ship: 'fighter',
      place: 1,
      race: [
        { time: 0.1, x: 100, y: 140 },
        { time: 0.3, x: 1200, y: 240 },
        { time: 0.2, x: 300, y: 1300 },
        { time: 0.15, x: 300, y: 300 },
        { time: 0.1, x: 100, y: 140 },
        { time: 0.15, x: 900, y: 300 },
      ],
    },
    {
      id: '2',
      name: 'Lance',
      ship: 'frigate',
      race: [{ time: 0.3, x: 1220, y: 1240, onCompleteTrigger: 'destroy' }],
    },
    {
      id: '3',
      name: 'Brad',
      ship: 'bomber',
      race: [
        { time: 0.1, x: 420, y: 740 },
        { time: 0.3, x: 0, y: 0, onCompleteTrigger: 'destroy' },
      ],
    },
  ],
  duration: 20,
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
