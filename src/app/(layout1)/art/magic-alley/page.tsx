import Image from '@/components/Image/Image'
import Details from '@/components/Details/Details'
import Link from 'next/link'

import image from '@/assets/art/verticAlley.jpg'

export default function Page() {
  return (
    <div>
      <Image image={image} alt='Magic Alley' />
      <Details subheading='Pen, watercolor & digital' heading='Magic Alley'>
        <p>
          One more from the magical world to go with my{' '}
          <Link href='/hogwarts'>Magical Castle</Link> cross section.
        </p>

        <h3>Case Study</h3>
        <p>
          All my favorite art comes from working within limitations. Here are
          the parameters that I gave myself on this one:
        </p>
        <ul>
          <li>
            <strong>2.5D "dollhouse" Perspective</strong> - all perspective
            lines are parallel. Represent distance by using size (far thing
            small) and fog (far thing muted and simple).
          </li>
          <li>
            Every region must work as its own{' '}
            <strong>independant composition</strong>.
          </li>
          <li>
            Even though there are tons of mini stories, it must have a{' '}
            <strong>focal point</strong>. The main focal point will be defined
            by lack of detail (contrast to the excess detail everywhere else),
            strong lighting, and a subtle spiral.
          </li>
          <li>
            <strong>Connect all regions</strong> to each other, ideally by
            having characters transition from one region to another (snake in
            the window), or by having characters from different regions interact
            with each other (sea monster). Light and air spill from one region
            to the next. Windows and doors are bisected by the cross section.
          </li>
          <li>
            <strong>Physics</strong> rules like weight still apply, but they're
            flexible (not all gravity has to point downward).
          </li>
          <li>
            <strong>Simple characters</strong> with simple expressions that can
            be read from a distance. No eyebrows!
          </li>
          <li>
            <strong>Limited, muted, somber color palette</strong> to contrast
            with the chaos of... everything else.
          </li>
        </ul>
      </Details>
    </div>
  )
}
