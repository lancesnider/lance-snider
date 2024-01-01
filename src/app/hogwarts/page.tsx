import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Grid from '@/components/Grid/Grid'

import image from '@/assets/art/hogwarts.jpg'

import detail1 from '@/assets/hogwarts/detail-1.jpg'
import detail2 from '@/assets/hogwarts/detail-2.jpg'
import detail3 from '@/assets/hogwarts/detail-3.jpg'
import detail4 from '@/assets/hogwarts/detail-4.jpg'

const images = [
  {
    image: detail3,
    key: 'detail3',
  },
  {
    image: detail4,
    key: 'detail4',
  },
  {
    image: detail1,
    key: 'detail1',
  },
  {
    image: detail2,
    key: 'detail2',
  },
]

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Magical Castle' />
      <Details subheading='Charcoal & digital' heading='Magical Castle' mb>
        <p>
          This intricate cross section depicts a typical day in a castle that is
          definitely not Hogwarts. No, that's not a grown up Draco visiting
          Myrtle. And that's definitely not the Bloody Baron or super old
          Flitwick. And I definitely did not draw it for the lovely reddit
          community over at <a href=''>r/harrypotter</a>.
        </p>

        <p>
          <a href='https://www.dropbox.com/s/sd6nhvi8pmr1zol/11x14-free-download.pdf?dl=0'>
            Free download
          </a>{' '}
          for prints up to 11x14 (no selling) <br />
          <a href='https://www.paypal.com/donate?hosted_button_id=AP34YBLDQ4BN8'>
            Donate
          </a>{' '}
          to support more art
        </p>
      </Details>
      <Grid images={images} />
    </div>
  )
}
