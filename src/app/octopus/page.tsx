import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Button from '@/components/Button/Button'

import image from '@/assets/gallery-sm/octopus.jpg'

export default function Page() {
  return (
    <div className='page'>
      <Image image={image} alt='Octopus' />
      <Details subheading='Charcoal' heading='Octopus' sold>
        <div className='page__buttons'>
          <Button
            href='https://www.etsy.com/listing/939435722/giant-pacific-octopus-charcoal-digital?click_key=fa710c2a8214c41327fdfb2ce6ed18530242def5%3A939435722&click_sum=d62ab13a&ref=shop_home_recs_9'
            target='_blank'
            rel='noopener noreferrer'
            primary
          >
            Prints
          </Button>
          <Button
            href='https://www.etsy.com/listing/953382613/giant-pacific-octopus-charcoal-digital?click_key=3ff7dcac9633491bc21dc10056bc3b83bd4ee5cf%3A953382613&click_sum=c7f28d7a&ref=shop_home_recs_15'
            target='_blank'
            rel='noopener noreferrer'
          >
            Digital Download
          </Button>
        </div>
      </Details>
    </div>
  )
}
