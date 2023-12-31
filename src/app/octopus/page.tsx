import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/octopus.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Octopus' />
      <Details subheading='Charcoal' heading='Octopus'></Details>
    </div>
  )
}
