import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/glass-orca.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Hogwarts Castle' />
      <Details subheading='Charcoal & digital' heading='Glass Orca'></Details>
    </div>
  )
}
