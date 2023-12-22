

import ZoomGallery from './ZoomGallery'

import rhinoArmy from '../../assets/gallery-sm/rhinoArmy.jpg'
import verticAlley from '../../assets/gallery-sm/verticAlley.jpg'
import blindWolf from '../../assets/gallery-sm/blindWolf.jpg'
import kraken from '../../assets/gallery-sm/kraken.jpg'
import deadBird from '../../assets/gallery-sm/dead-bird.jpg'
import hermit from '../../assets/gallery-sm/hermit.jpg'
import birdsReal from '../../assets/gallery-sm/birds-are-real.jpg'
import hogwarts from '../../assets/gallery-sm/hogwarts.jpg'
import humpback from '../../assets/gallery-sm/humpback.jpg'
import sasquatch from '../../assets/gallery-sm/sasquatch.jpg'
import glassOrca from '../../assets/gallery-sm/glass-orca.jpg'
import capitolRiot from '../../assets/gallery-sm/capitol-riot-preview.jpg'
import octopusCave from '../../assets/gallery-sm/octopus-cave.jpg'
import octopus from '../../assets/gallery-sm/octopus.jpg'
import witch from '../../assets/gallery-sm/witch.jpg'
import skeleton from '../../assets/gallery-sm/skeleton.jpg'
import crocTeeth from '../../assets/gallery-sm/croc-teeth.jpg'
import glinesCanyonDam from '../../assets/gallery-sm/glines-canyon-dam.jpg'
import heart from '../../assets/gallery-sm/heart.jpg'
import littleFactories from '../../assets/gallery-sm/little-factories.jpg'
import hogwartsBw from '../../assets/gallery-sm/hogwarts-bw.jpg'

export default {
  title: 'Experiments/ZoomGallery',
  header: 'ser',
  component: ZoomGallery,
  args: {
    zoomForever: false,
    defaultZoom: 1.5,
    images: [
      { image: rhinoArmy, alt: 'Rhino Army' },
      { image: birdsReal, alt: '' },
      { image: verticAlley, alt: 'Vertic Alley' },
      { image: glassOrca, alt: '' },
      { image: sasquatch, alt: '' },
      { image: blindWolf, alt: 'Blind Wolf' },

      { image: witch, alt: '' },
      { image: kraken, alt: 'Kraken' },
      { image: hogwarts, alt: '' },

      { image: deadBird, alt: '' },
      { image: hermit, alt: '' },
      { image: glinesCanyonDam, alt: '' },
      { image: humpback, alt: '' },

      { image: hogwartsBw, alt: '' },
      { image: skeleton, alt: '' },
      { image: heart, alt: '' },
      { image: crocTeeth, alt: '' },
      // { image: octopus, alt: '' },
      { image: octopusCave, alt: '' },
      { image: capitolRiot, alt: 'Jan 6' },
      { image: littleFactories, alt: '' },
    ],
  },
}

const Template = (args) => (
  <div style={{ padding: 50, minHeight: '100vh', backgroundColor: '#171c2c' }}>
    <ZoomGallery {...args} />
  </div>
)

export const ZoomOnHover = Template.bind({})

export const StayZoomed = Template.bind({})
StayZoomed.args = {
  zoomForever: true,
}
