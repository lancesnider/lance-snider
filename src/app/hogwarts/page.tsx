import Image from 'next/image'

import hogwarts from '@/assets/art/hogwarts.jpg'

export default function Home() {
  return (
    <div>
      <div className='image'>
        <Image src={hogwarts} alt='Hogwarts Castle' />
      </div>
      <div className='text-content'>
        <div className='text-content__centered'>
          <h2>Charcoal & digital</h2>
          <h1>Hogwarts Castle</h1>
          <p>
            This intricate cross section depicts a typical day at post-war
            Hogwarts. I spent 7 months drawing, re-reading the books, rewatching
            the movies, and scouring the Harry Potter Wiki to pack in as many
            details as possible. This version (not to mention the freebie)
            exists because of the amazing support and encouragement
            fromr/harrypotter.
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
        </div>
      </div>
    </div>
  )
}
