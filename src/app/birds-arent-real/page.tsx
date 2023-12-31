import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/birds-are-real.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt="Birds aren't real" />
      <Details subheading='Charcoal' heading="Birds aren't real"></Details>
    </div>
  )
}
