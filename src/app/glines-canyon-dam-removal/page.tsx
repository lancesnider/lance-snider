import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Video from '@/components/Video/Video'
import Link from 'next/link'

import image from '@/assets/gallery-sm/glines-canyon-dam.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Glines Canyon Dam Removal - art' />
      <Details subheading='Charcoal' heading='Glines Canyon' sold>
        <h3>Largest dam removal in US history. For the fishies!</h3>
      </Details>
      <Video>
        <iframe
          width='100%'
          height='100%'
          src='https://www.youtube.com/embed/VipVo8zPH0U?si=0iXI4dnclpK5HD-o'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </Video>
      <Details>
        <h2>FAQ</h2>
        <h3>Do you still have the original?</h3>
        <p>Nope, it sold. Yay!</p>
        <h3>Want a print?</h3>
        <p>
          It's pretty niche so don't keep this one in stock, but yeah, I sell
          prints. Hit me up on the{' '}
          <Link href='https://www.instagram.com/lances_art/'>instagram</Link>{' '}
          and we can get it sorted. It's 12x12" and $30 plus shipping.
        </p>
      </Details>
    </div>
  )
}
