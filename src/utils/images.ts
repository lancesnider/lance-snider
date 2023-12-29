import rhinoArmy from '../assets/gallery-sm/rhinoArmy.jpg'
import verticAlley from '../assets/gallery-sm/verticAlley.jpg'
import blindWolf from '../assets/gallery-sm/blindWolf.jpg'
import kraken from '../assets/gallery-sm/kraken.jpg'
import deadBird from '../assets/gallery-sm/dead-bird.jpg'
import hermit from '../assets/gallery-sm/hermit.jpg'
import birdsReal from '../assets/gallery-sm/birds-are-real.jpg'
import hogwarts from '../assets/gallery-sm/hogwarts.jpg'
import humpback from '../assets/gallery-sm/humpback.jpg'
import sasquatch from '../assets/gallery-sm/sasquatch.jpg'
import glassOrca from '../assets/gallery-sm/glass-orca.jpg'
// import capitolRiot from '../assets/gallery-sm/capitol-riot-preview.jpg'
import capitolRiot from '../assets/gallery-sm/jan6-2.jpg'
import octopusCave from '../assets/gallery-sm/octopus-cave.jpg'
import octopusCharcoal from '../assets/gallery-sm/octopus-large.jpg'
import octopus from '../assets/gallery-sm/octopus.jpg'
import witch from '../assets/gallery-sm/witch.jpg'
import skeleton from '../assets/gallery-sm/skeleton.jpg'
import crocTeeth from '../assets/gallery-sm/croc-teeth.jpg'
import glinesCanyonDam from '../assets/gallery-sm/glines-canyon-dam.jpg'
// import heart from '../assets/gallery-sm/heart.jpg'
import heart from '../assets/gallery-sm/dumptruck-heart.gif'
import littleFactories from '../assets/gallery-sm/little-factories.jpg'
// import hogwartsBw from '../assets/gallery-sm/hogwarts-bw.jpg'
import hogwartsBw from '../assets/gallery-sm/hogwarts-wip.jpg'
import cassowary from '../assets/gallery-sm/cassowary.jpg'
import zombies from '../assets/gallery-sm/zombies.jpg'
import orcaExploded from '../assets/gallery-sm/orca-exploded.jpg'
import hiking from '../assets/gallery-sm/hiking.jpg'

const allImages = {
  rhinoArmy: {
    image: rhinoArmy,
    key: 'rhinoArmy',
  },
  verticAlley: {
    image: verticAlley,
    key: 'verticAlley',
  },
  blindWolf: {
    image: blindWolf,
    key: 'blindWolf',
  },
  kraken: {
    image: kraken,
    key: 'kraken',
  },
  deadBird: {
    image: deadBird,
    key: 'deadBird',
  },
  hermit: {
    image: hermit,
    key: 'hermit',
  },
  birdsReal: {
    image: birdsReal,
    key: 'birdsReal',
  },
  hogwarts: {
    image: hogwarts,
    key: 'hogwarts',
  },
  humpback: {
    image: humpback,
    key: 'humpback',
  },
  sasquatch: {
    image: sasquatch,
    key: 'sasquatch',
  },
  glassOrca: {
    image: glassOrca,
    key: 'glassOrca',
  },
  capitolRiot: {
    image: capitolRiot,
    key: 'capitolRiot',
  },
  octopusCave: {
    image: octopusCave,
    key: 'octopusCave',
  },
  octopusCharcoal: {
    image: octopusCharcoal,
    key: 'octopusCharcoal',
  },
  octopus: {
    image: octopus,
    key: 'octopus',
  },
  witch: {
    image: witch,
    key: 'witch',
  },
  skeleton: {
    image: skeleton,
    key: 'skeleton',
  },
  crocTeeth: {
    image: crocTeeth,
    key: 'crocTeeth',
  },
  glinesCanyonDam: {
    image: glinesCanyonDam,
    key: 'glinesCanyonDam',
  },
  heart: {
    image: heart,
    key: 'heart',
  },
  littleFactories: {
    image: littleFactories,
    key: 'littleFactories',
  },
  hogwartsBw: {
    image: hogwartsBw,
    key: 'hogwartsBw',
  },
  cassowary: {
    image: cassowary,
    key: 'cassowary',
  },
  zombies: {
    image: zombies,
    key: 'zombies',
  },
  orcaExploded: {
    image: orcaExploded,
    key: 'orcaExploded',
  },
  hiking: {
    image: hiking,
    key: 'hiking',
  },
}

const images = [
  { image: rhinoArmy, alt: 'Rhino Army' },
  { image: verticAlley, alt: 'Vertic Alley' },
  { image: birdsReal, alt: '' },
]

const imagesGrouped = [
  { image: rhinoArmy, alt: 'Rhino Army' },
  { image: verticAlley, alt: 'Vertic Alley' },
  {
    imageGroup: [
      { image: glassOrca, alt: '' },
      { image: glinesCanyonDam, alt: '' },
    ],
  },
  { image: hogwartsBw, alt: '' },
  { image: birdsReal, alt: '' },
  {
    imageGroup: [
      { image: deadBird, alt: '' },
      { image: hiking, alt: '' },
    ],
  },
  { image: blindWolf, alt: 'Blind Wolf' },
  { image: kraken, alt: 'Kraken' },
  { image: witch, alt: '' },
  { image: sasquatch, alt: '' },
  { image: octopusCharcoal, alt: '' },
  { image: hermit, alt: '' },
  { image: hogwarts, alt: '' },
  { image: humpback, alt: '' },
  {
    imageGroup: [
      { image: skeleton, alt: '' },
      { image: octopus, alt: '' },
    ],
  },
  { image: crocTeeth, alt: '' },
  { image: zombies, alt: '' },
  { image: orcaExploded, alt: '' },
  { image: octopusCave, alt: '' },
  {
    imageGroup: [
      { image: heart, alt: '' },
      { image: littleFactories, alt: '' },
    ],
  },
  { image: capitolRiot, alt: 'Jan 6' },
  { image: cassowary, alt: '' },
]

export { images, imagesGrouped, allImages }
