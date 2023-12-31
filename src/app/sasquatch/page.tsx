import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/sasquatch.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Sasquatch' />
      <Details subheading='Charcoal then Digital' heading='Sasquatch'>
        <p>Not a big fan of having their picture taken.</p>
      </Details>
    </div>
  )
}
