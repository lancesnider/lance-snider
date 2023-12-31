import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/dumptruck-heart.gif'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Dumptruck Heart' />
      <Details
        subheading='Digital (Procreate)'
        heading="You've Got an Absolute Dumptruck Heart"
      >
        <p>A GIFt for my lovely wife. Doodled and animated in Procreate.</p>
      </Details>
    </div>
  )
}
