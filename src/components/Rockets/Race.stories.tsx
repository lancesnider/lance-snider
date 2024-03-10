import React from 'react'

import Race from './Race'

export default {
  title: 'Animations/Race',
  component: Race,
  args: {
    totalDuration: 10,
    users: [
      {
        id: '1',
        name: 'John Doe',
        race: [
          {
            duration: 0.4,
            x: 200,
            y: -150,
          },
          {
            duration: 0.3,
            x: 100,
            y: -250,
          },
          {
            duration: 0.3,
            x: 200,
            y: -350,
          },
        ],
      },
      {
        id: '2',
        name: 'Jane Doe',
        race: [
          {
            duration: 0.2,
            x: 300,
            y: -250,
          },
          {
            duration: 0.3,
            x: 250,
            y: -200,
          },
          {
            duration: 0.5,
            x: 250,
            y: -150,
          },
        ],
      },
      // {
      //   id: '3',
      //   name: 'John Smith',
      // },
      // {
      //   id: '4',
      //   name: 'Jane Smith',
      // },
      // {
      //   id: '5',
      //   name: 'John Johnson',
      // },
      // {
      //   id: '6',
      //   name: 'Jane Johnson',
      // },
      // {
      //   id: '7',
      //   name: 'John Brown',
      // },
      // {
      //   id: '8',
      //   name: 'Jane Brown',
      // },
    ],
  },
}

const Template = (args: any) => (
  <div style={{ height: '100vh' }}>
    <Race {...args} />
  </div>
)

export const Default = Template.bind({})
