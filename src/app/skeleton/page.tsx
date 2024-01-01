import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/skeleton.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Skeleton Woman' />
      <Details subheading='Charcoal' heading='Skin and Bones'>
        I'm pretty sure this is the sexiest thing I've drawn. Weird.
      </Details>
    </div>
  )
}
