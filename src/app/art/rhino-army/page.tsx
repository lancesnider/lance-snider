import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/art/rhinoArmy.jpg'

export default function Page() {
  return (
    <div className='page'>
      <Image image={image} alt='Hogwarts Castle' />
      <Details subheading='Charcoal & digital' heading='Rhino Caravan'>
        <p>I'm very proud of this one. Still my favorite art ever.</p>
      </Details>
    </div>
  )
}
