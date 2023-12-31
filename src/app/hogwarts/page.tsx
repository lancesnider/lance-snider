import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'

import image from '@/assets/art/hogwarts.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Hogwarts Castle' />
      <Details subheading='Charcoal & digital' heading='Hogwarts Castle'>
        <p>
          This intricate cross section depicts a typical day at post-books
          Hogwarts. I spent 7 months drawing, re-reading the books, rewatching
          the movies, and scouring the Harry Potter Wiki to pack in as many
          details as possible. This version (not to mention the freebie) exists
          because of the amazing support and encouragement from{' '}
          <a href=''>r/harrypotter</a>.
        </p>

        <p>
          <a href='https://www.dropbox.com/s/sd6nhvi8pmr1zol/11x14-free-download.pdf?dl=0'>
            Free download
          </a>{' '}
          (up to 11x14 print) <br />
          <a href='https://www.paypal.com/donate?hosted_button_id=AP34YBLDQ4BN8'>
            Donate
          </a>{' '}
          to support more art
        </p>
      </Details>
    </div>
  )
}
