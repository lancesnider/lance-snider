import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Video from '@/components/Video/Video'

import image from '@/assets/jan6/capitol-riot.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Jan 6' />
      <Details subheading='Charcoal' heading='Jan 6 - The Dumbest Coup'>
        <p>An attempted coup anyway.</p>
        <p>
          Every single character in this drawing is a real person. You can see
          Kevin Seefried carrying the confederate flag through the Rotunda,
          Peter Stager beating an unconscious police officer with a flagpole,
          and Riley June Williams stealing Nancy Pelosi's laptop. Others are as
          yet unidentified, like the cop waving people through the gate or the
          man screaming "kill him [capitol police officer] with his own gun".
        </p>
      </Details>

      <Video>
        <h2>Timelapse Drawing:</h2>
        <iframe
          src='https://www.youtube.com/embed/ptjpaeRVCn0?si=-z-K7B0pVR7E33WE'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen
        ></iframe>
      </Video>
    </div>
  )
}
