import Columns from '@/components/Columns/Columns'

import milkshake from '@/assets/dev/milkshake.jpg'
import mathMonsters from '@/assets/dev/math-monsters.webp'
import ukraineSirenAlerts from '@/assets/dev/ukraine-siren-alerts.jpg'
import built from '@/assets/dev/built.jpg'
import zyft from '@/assets/dev/zyft.jpg'
import lanceSnider from '@/assets/dev/lance-snider.jpg'
import untsLogo from '@/assets/dev/unts-logo.gif'
import geographyGame from '@/assets/dev/geography-game.jpg'

import offroad from '@/assets/dev/offroad.jpg'
import rightGuard from '@/assets/dev/right-guard.jpg'
import utahMovingAds from '@/assets/dev/utah-moving-ads.png'

export default function Page() {
  return (
    <div>
      <Columns
        heading='Portfolio'
        subheading={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl id luctus '
        }
        defaultColumns={3}
        columns={[
          {
            heading: 'Zyft Browser Extension',
            body: 'Chrome, Safari (desktop/mobile) extension & snapshot testing for XPath & Metadata Logic that Needs to Work across 40k+ Domains.',
            image: zyft,
            link: '/dev/case-studies/zyft-xpath-metadata',
            linkText: 'Learn more',
            tags: 'React, Typescript, NodeJS',
          },
          {
            heading: 'Milkshake Website Builder',
            body: "Envato's Milkshake let's you build a website right from your phone. Along with 10 other devs, I helped build the mobile site buider and website themes.",
            image: milkshake,
            link: '/dev/case-studies/zyft-xpath-metadata',
            linkText: 'Learn more',
            tags: 'React Native, Typescript, Design',
          },
          {
            heading: 'Ukraine Siren Alerts',
            body: 'I was lead dev on UASA, a website with real-time missile alerts and a shelter locator for citizens of Ukraine.',
            image: ukraineSirenAlerts,
            link: '/dev/case-studies/zyft-xpath-metadata',
            linkText: 'Learn more',
            tags: 'React, Typescript, Design',
          },
          {
            heading: 'Math Monsters',
            body: 'With over 200k downloads, Math Monsters is a fun way for kids to practice their math skills. I did everything, including the illustration and animation.',
            image: mathMonsters,
            link: '/dev/case-studies/zyft-xpath-metadata',
            linkText: 'Learn more',
            tags: 'Unity, C#, Illustration',
          },
          {
            heading: 'Built For Teams',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl id luctus ',
            image: built,
            link: '/dev/case-studies/zyft-xpath-metadata',
            linkText: 'Learn more',
            tags: 'React, React Native, Typescript, Rails',
          },
          {
            heading: 'Cheeky *unts',
            body: "An NFT project where we raised $50,000 for Australian wildlife charities, including the Australian Koala Foundation and Steve Irwin's Wildlife Warriors.",
            image: untsLogo,
            link: '/dev/case-studies/zyft-xpath-metadata',
            linkText: 'Learn more',
            tags: 'React, Gatsby',
          },
          {
            heading: "Lance's Art",
            body: "I don't just make pretty code - I also make pretty pictures. Regardless of medium, I'm a little obsessed with the art of storytelling.",
            image: lanceSnider,
            link: '/dev/case-studies/zyft-xpath-metadata',
            linkText: 'Learn more',
            tags: 'React, NextJS',
          },
          {
            heading: 'VR Geography Game (Prototype)',
            body: "I don't just make code, I make 2d and 3d art too.",
            image: geographyGame,
            link: '/dev/case-studies/zyft-xpath-metadata',
            linkText: 'Learn more',
            tags: 'Unity, C#',
          },
        ]}
      />

      <Columns
        heading={'Oldies but Goodies'}
        subheading={
          "Is it weird to put 15-year-old projects in my portfolio? Not if I was makin' cool ass shit 15 years ago."
        }
        defaultColumns={4}
        columns={[
          {
            heading: 'Right Guard / NBA',
            body: 'I built the promo site, with plenty of easter eggs, for the Right Guard/Chris Paul partnership.',
            image: rightGuard,
          },
          {
            heading: 'Offroad Rally',
            body: 'Racing game using the Box2D physics engine.',
            image: offroad,
          },
          {
            heading: 'Utah Moving Ads',
            body: 'This little scene included animated charcters that, when clicked, would explode.',
            image: utahMovingAds,
          },
        ]}
      />
    </div>
  )
}
