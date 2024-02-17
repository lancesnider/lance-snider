import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/zombies.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Zom-be-Gone' />
      <Details
        subheading='Pen, watercolor & digital (Procreate)'
        heading='Zom-be-Gone'
      ></Details>
    </div>
  )
}
