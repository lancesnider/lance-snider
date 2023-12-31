import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/kraken.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Kraken' />
      <Details subheading='Charcoal' heading='Kraken'></Details>
    </div>
  )
}
