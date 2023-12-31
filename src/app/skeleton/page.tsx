import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/skeleton.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Skeleton Woman' />
      <Details subheading='Charcoal' heading='Boney Lady'></Details>
    </div>
  )
}
