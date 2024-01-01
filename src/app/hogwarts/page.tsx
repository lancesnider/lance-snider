import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/art/hogwarts.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Magical Castle' />
      <Details subheading='Charcoal & digital' heading='Magical Castle'>
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
    </div>
  )
}
