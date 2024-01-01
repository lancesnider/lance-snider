import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/glass-orca.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Hogwarts Castle' />
      <Details
        subheading='Charcoal & digital'
        heading='Glass Orca (aka. Ghost Orca)'
      >
        <p>
          The glass frog is probably the weirdest shit I've seen in real life.
          You can see it's heart beat! From the outside! Wild, wild stuff.{' '}
        </p>
      </Details>
    </div>
  )
}
