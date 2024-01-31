import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Grid from '@/components/Grid/Grid'

import image from '@/assets/art/rhinoArmy.jpg'

export default function Page() {
  return (
    <div className='page'>
      <Image image={image} alt='Rhino Caravan' />
      <Details subheading='Charcoal & digital' heading='Rhino Caravan'>
        <p>This one started as a very large charcoal drawing on chipboard. </p>
        <Grid
          columns={3}
          images={[
            {
              image: {
                src: '/rhino-wip-1.jpg',
              },
              alt: 'Rhino Caravan WIP 1',
            },
            {
              image: {
                src: '/rhino-wip-2.jpg',
              },
              alt: 'Rhino Caravan WIP 2',
            },
            {
              image: {
                src: '/rhino-wip-3.jpg',
              },
              alt: 'Rhino Caravan WIP 3',
            },
          ]}
        />
      </Details>
    </div>
  )
}
