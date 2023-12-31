import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/witch.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='The Witch' />
      <Details
        subheading='Charcoal, Pastel & Digital'
        heading='The Witch'
      ></Details>
    </div>
  )
}
