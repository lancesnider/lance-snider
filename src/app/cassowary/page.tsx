import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/cassowary.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Cassowary' />
      <Details subheading='Digital (Procreate)' heading='Cassowary'></Details>
    </div>
  )
}
