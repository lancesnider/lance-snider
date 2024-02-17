import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/octopus-large.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Giant Pacific Octopus' />
      <Details
        subheading='Charcoal'
        heading='Giant Pacific Octopus'
        sold
      ></Details>
    </div>
  )
}
