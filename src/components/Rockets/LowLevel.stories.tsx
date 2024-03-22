import React from 'react'

import LowLevel from './LowLevel'

const raceData = {
  users: [
    {
      id: '1',
      name: 'Jason',
      ship: 'fighter',
      place: 1,
      alive: true,
      race: [
        { time: 0.1, x: 100, y: 140 },
        { time: 0.3, x: 1200, y: 240 },
        { time: 0.2, x: 300, y: 1300 },
        { time: 0.15, x: 300, y: 300 },
        { time: 0.1, x: 100, y: 140 },
      ],
    },
    {
      id: '2',
      name: 'Lance',
      ship: 'frigate',
      alive: true,
      race: [{ time: 0.2, x: 1220, y: 1240, onCompleteTrigger: 'destroy' }],
    },
    {
      id: '3',
      name: 'Brad',
      ship: 'bomber',
      alive: true,
      race: [
        { time: 0.15, x: 420, y: 740 },
        { time: 0.1, x: 0, y: 0 },
        { time: 0.1, x: 900, y: 440 },
        { time: 0.2, x: 900, y: 200 },
        { time: 0.15, x: 660, y: 600 },
      ],
    },
    {
      id: '5',
      name: 'Jessie',
      ship: 'scout',
      place: 1,
      alive: true,
      race: [
        { time: 0.15, x: 300, y: 300 },
        { time: 0.1, x: 100, y: 140 },
        { time: 0.15, x: 900, y: 300, onCompleteTrigger: 'destroy' },
      ],
    },
    {
      id: '6',
      name: 'Lucious',
      ship: 'support',
      place: 1,
      alive: true,
      race: [
        { time: 0.3, x: 1200, y: 240 },
        { time: 0.1, x: 780, y: 140 },
        { time: 0.1, x: 700, y: 740 },
        { time: 0.15, x: 300, y: 300 },
        { time: 0.2, x: 390, y: 400 },
      ],
    },
    {
      id: '7',
      name: 'Flavio',
      ship: 'gunner',
      place: 1,
      alive: true,
      race: [
        { time: 0.15, x: 300, y: 140 },
        { time: 0.3, x: 1200, y: 1240 },
        { time: 0.2, x: 50, y: 500 },
        { time: 0.1, x: 300, y: 0 },
        { time: 0.1, x: 550, y: 1140 },
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
