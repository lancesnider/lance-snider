import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import { allImages } from '@/utils/images'
import Grid from '@/components/Grid/Grid'

import image from '@/assets/gallery-sm/cassowary.jpg'

const images = [
  allImages.cassowary,
  allImages.cassowary,
  allImages.cassowary,
  allImages.cassowary,
]

export default function Page() {
  return (
    <div>
      <Grid images={images} />
      <Details
        subheading='Digital (Procreate)'
        heading='Cassowary (Murder Chicken)'
      >
        <p>This one was just a fun series of doodles.</p>
      </Details>
    </div>
  )
}
