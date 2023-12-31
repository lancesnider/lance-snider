import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/glines-canyon-dam.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Hogwarts Castle' />
      <Details
        subheading='Charcoal'
        heading='Glines Canyon Dam Removal'
      ></Details>
    </div>
  )
}
