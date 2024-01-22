import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/octopus-cave.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Cave Octopus' />
      <Details subheading='Charcoal' heading='Cave Octopus' sold></Details>
    </div>
  )
}
