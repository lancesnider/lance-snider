import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/hiking.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Hiking' />
      <Details subheading='Digital (Procreate)' heading='Speed drawing'>
        <p>
          I almost didn't add it to the portfolio because it's so simple, but I
          just like it.
        </p>
      </Details>
    </div>
  )
}
