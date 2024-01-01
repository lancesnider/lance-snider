import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Link from 'next/link'

import image from '@/assets/art/verticAlley.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Vertic Alley' />
      <Details subheading='Pen, watercolor & digital' heading='Vertical Alley'>
        <p>
          One more from the magical world to go with my{' '}
          <Link href='/hogwarts'>Magical Castle</Link> cross section.
        </p>
      </Details>
    </div>
  )
}
