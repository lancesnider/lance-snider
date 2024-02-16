import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Seagulls from '@/components/Seagulls/Seagulls'

import image from '@/assets/gallery-sm/birds-are-real.jpg'

export default function Page() {
  return (
    <div>
      <Seagulls />
      <Image image={image} alt='Just Seagull Stuff' />
      <Details
        subheading='Pen & watercolor then digital (Procreate)'
        heading='Just Seagull Stuff'
      ></Details>
    </div>
  )
}
