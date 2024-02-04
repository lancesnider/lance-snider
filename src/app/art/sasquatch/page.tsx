import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Button from '@/components/Button/Button'

import image from '@/assets/gallery-sm/sasquatch.jpg'

export default function Page() {
  return (
    <div className='page'>
      <Image image={image} alt='Sasquatch' />
      <Details subheading='Charcoal then Digital' heading='Sasquatch'>
        <p>Not a big fan of having their picture taken.</p>
        <div className='page__buttons'>
          <Button
            href='https://www.etsy.com/listing/1198676414/bigfoot-sasquatch-doesnt-like-his'
            target='_blank'
            rel='noopener noreferrer'
          >
            Buy Prints
          </Button>
        </div>
      </Details>
    </div>
  )
}
