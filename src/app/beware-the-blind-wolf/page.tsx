import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/art/blindWolf.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Beware, the Blind Wolf' />
      <Details subheading='Charcoal' heading='Beware, the Blind Wolf'></Details>
    </div>
  )
}
