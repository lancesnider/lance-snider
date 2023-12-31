import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/dead-bird.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Repurposed Bird' />
      <Details
        subheading='Digital (Procreate)'
        heading='Repurposed Bird'
      ></Details>
    </div>
  )
}
