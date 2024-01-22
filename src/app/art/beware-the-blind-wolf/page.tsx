import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/art/blindWolf.jpg'
import bw from '@/assets/art/beware-blind-wolf-bw.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Beware, the Blind Wolf' />
      <Details
        subheading='Charcoal then digital'
        heading='Beware, the Blind Wolf'
      ></Details>
      <Image sm image={bw} alt='Beware, the Blind Wolf - Charcoal' />
    </div>
  )
}
