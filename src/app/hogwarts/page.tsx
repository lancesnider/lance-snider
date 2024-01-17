import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Grid from '@/components/Grid/Grid'
import Button from '@/components/Button/Button'

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
    <div className='page'>
      <Image image={image} alt='Magical Castle' />
      <Details subheading='Charcoal & digital' heading='Magical Castle' mb>
        <p>
          This intricate cross section depicts a typical day in a castle that is
          definitely not Hogwarts. No, that's not a grown up Draco visiting
          Myrtle. And that's definitely not the Bloody Baron or super old
          Flitwick. And I definitely did not draw it for the lovely reddit
          community over at <a href=''>r/harrypotter</a>.
        </p>

        <div className='page__buttons'>
          <Button
            href='https://www.etsy.com/listing/1004430653/magical-castle-rising-from-the-ashes?click_key=cdc5912a948eefa871954d28f46a68d53af93ad0%3A1004430653&click_sum=658bc75b&ref=shop_home_recs_2&crt=1'
            target='_blank'
            rel='noopener noreferrer'
            primary
          >
            Color Prints
          </Button>
          <Button
            href='https://www.etsy.com/listing/994617382/magical-castle-rising-from-the-ashes?click_key=e966574c2c8c1ccf589c9d88c3db6155df55c905%3A994617382&click_sum=063b1031&ref=shop_home_recs_3'
            target='_blank'
            rel='noopener noreferrer'
          >
            Digital Download
          </Button>
        </div>
      </Details>
      <Grid images={images} />
    </div>
  )
}
