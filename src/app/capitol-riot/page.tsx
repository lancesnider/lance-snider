import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/capitol-riot-preview.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Jan 6' />
      <Details
        subheading='Charcoal'
        heading='Jan 6 - The Dumbest Failed Coup'
      ></Details>
    </div>
  )
}
