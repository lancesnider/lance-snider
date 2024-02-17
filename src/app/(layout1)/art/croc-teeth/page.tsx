import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/croc-teeth.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Croc Teeth' />
      <Details subheading='Charcoal' heading='Croc Teeth'></Details>
    </div>
  )
}
