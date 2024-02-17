import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/orca-exploded.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Orca Exploded' />
      <Details
        subheading='Charcoal then Digital'
        heading='Orca Exploded'
      ></Details>
    </div>
  )
}
