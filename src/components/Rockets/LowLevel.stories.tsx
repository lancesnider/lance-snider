import React from 'react'

import LowLevel from './LowLevel'

const raceData = {
  users: [
    {
      id: '1',
      name: 'Jason',
      avatar:
        'https://converted-media.jpgstoreapis.com/bafybeiauv2cqxcnp43xhfehbensppwhr2zmbl3uvs6ziqfwijn5oiy3ifa.sz_1658.dims_100x100.anim_0.webp',
      ship: 'fighter',
      place: 1,
      alive: true,
      race: [
        { time: 0.1, x: 100, y: 140 },
        { time: 0.3, x: 1200, y: 240 },
        { time: 0.25, x: 300, y: 1300 },
        { time: 0.15, x: 300, y: 300 },
        { time: 0.2, x: 100, y: 140 },
      ],
    },
    {
      id: '2',
      name: 'Lance',
      avatar:
        'https://converted-media.jpgstoreapis.com/QmRP2NML23BBJQd8C6HTyqTSxz1RgFrMeVPSiQm437ewWt.sz_2368.dims_100x100.anim_0.webp',
      ship: 'frigate',
      alive: true,
      destructionType: 1,
      race: [{ time: 0.2, x: 800, y: 1240, onCompleteTrigger: 'destroy' }],
    },
    {
      id: '3',
      name: 'Brad',
      avatar:
        'https://converted-media.jpgstoreapis.com/QmdLiN1XRFStiCS2MsfWhXdt7BiBbjMxEuE3zm5TwG5fsy.sz_10206.dims_100x100.anim_0.webp',
      ship: 'bomber',
      place: 3,
      alive: true,
      race: [
        { time: 0.25, x: 420, y: 740 },
        { time: 0.2, x: 0, y: 0 },
        { time: 0.1, x: 900, y: 440 },
        { time: 0.15, x: 900, y: 200 },
        { time: 0.15, x: 900, y: 300 },
        { time: 0.15, x: 660, y: 600 },
      ],
    },
    {
      id: '5',
      name: 'Jessie',
      avatar:
        'https://converted-media.jpgstoreapis.com/Qme1g965BZcVwzWaVqYJtYhz7cLcuSdNFRBuwXcQHj2Bnu.sz_1242.dims_100x100.anim_0.webp',
      ship: 'scout',
      alive: true,
      destructionType: 1,
      race: [
        { time: 0.15, x: 300, y: 300 },
        { time: 0.1, x: 100, y: 140 },
        { time: 0.15, x: 900, y: 300, onCompleteTrigger: 'destroy' },
      ],
    },
    {
      id: '6',
      name: 'Lucious',
      avatar:
        'https://converted-media.jpgstoreapis.com/QmNggaPXACZJi7bcsNscdqMuHTT56C4YnNRcVUnVEpEdTg.sz_1946.dims_100x100.anim_0.webp',
      ship: 'support',
      place: 2,
      alive: true,
      race: [
        { time: 0.3, x: 1200, y: 240 },
        { time: 0.1, x: 780, y: 140 },
        { time: 0.1, x: 700, y: 740 },
        { time: 0.15, x: 300, y: 300 },
        { time: 0.2, x: 200, y: 800 },
        { time: 0.15, x: 390, y: 400 },
      ],
    },
    {
      id: '7',
      name: 'Flavio',
      avatar:
        'https://converted-media.jpgstoreapis.com/KeU2KhX48znCkdxcx3ftFD_JOAU9rhycQRP_etL4MfU.sz_816.dims_100x100.anim_0.webp',
      ship: 'gunner',
      alive: true,
      race: [
        { time: 0.15, x: 300, y: 140 },
        { time: 0.2, x: 1200, y: 1240 },
        { time: 0.2, x: 50, y: 500 },
        { time: 0.1, x: 300, y: 300 },
        { time: 0.2, x: 300, y: 0 },
        { time: 0.15, x: 550, y: 1140 },
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
