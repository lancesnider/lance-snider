import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/humpback.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Kraken' />
      <Details
        subheading='Charcoal then Digital (Procreate)'
        heading='Humpback Whale'
      ></Details>
    </div>
  )
}
