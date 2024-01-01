import Details from '@/components/Details/Details'

import { allImages } from '@/utils/images'
import Grid from '@/components/Grid/Grid'

const images = [
  allImages.cassowary,
  allImages.cassowary2,
  allImages.cassowary3,
  allImages.platypus1,
  allImages.platypus2,
  allImages.platypus3,
  allImages.platypus4,
  allImages.platypus5,
]

export default function Page() {
  return (
    <div>
      <Grid images={images} />
      <Details
        subheading='Digital (Procreate)'
        heading='Cassowary (Murder Chicken) & Platypus'
      >
        <p>This one was just a fun series of doodles.</p>
      </Details>
    </div>
  )
}
