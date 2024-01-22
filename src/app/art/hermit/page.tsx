import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/hermit.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Hermit Army' />
      <Details
        subheading='Charcoal then Digital (Photoshop & Procreate)'
        heading='Hermit Army'
      ></Details>
    </div>
  )
}
