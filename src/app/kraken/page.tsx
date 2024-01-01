import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/kraken.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Kraken' />
      <Details subheading='Digital (Procreate)' heading='Kraken'>
        They're more curious than malicious, but that doesn't mean they won't
        sink ya.
      </Details>
    </div>
  )
}
