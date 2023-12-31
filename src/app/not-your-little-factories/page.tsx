import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/gallery-sm/little-factories.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Not Your Little Factories' />
      <Details
        subheading='Pen, Marker and Watercolor'
        heading='Not Your Little Factories (Sold)'
      >
        <p>Got a little fired up when Rov v Wade got overturned. </p>
      </Details>
    </div>
  )
}
