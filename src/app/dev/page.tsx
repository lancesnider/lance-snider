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
// import zicam from '@/assets/dev/zicam.jpg'
import rightGuard from '@/assets/dev/right-guard.jpg'
import utahMovingAds from '@/assets/dev/utah-moving-ads.png'
import skywest from '@/assets/dev/skywest-mba.jpg'

import BrokeBot from '@/components/BrokeBot/BrokeBot'

export default function Page() {
  return (
    <div>
      <Columns
        heading='My Portfolio'
        subheading="Hi, I'm Lance! I'm a mobile, web, game, and extension developer with over 20 years of experience and a particular focus on interactive experiences. I've done work for major brands like the NBA, Right Guard, Estee Lauder, and Zicam and am here for your next project."
        defaultColumns={3}
        columns={[
          {
            heading: 'Zyft Browser Extension',
            body: 'I built the Chrome, Safari (desktop/mobile) extension, plus snapshot testing for XPath & Metadata Logic that needs to work across 40k+ Domains.',
            image: zyft,
            link: '/dev/case-studies/zyft-xpath-metadata',
            linkText: 'Case Study',
            tags: 'React, Typescript, NodeJS',
          },
          {
            heading: 'Milkshake Website Builder',
            body: "Envato's Milkshake let's you build a website right from your phone. Along with 10 other devs, I helped build the mobile site buider and website themes.",
            image: milkshake,
            tags: 'React Native, Typescript, Design',
          },
          {
            heading: 'Ukraine Siren Alerts',
            body: 'I was lead dev on UASA, a website with real-time missile alerts and a shelter locator for citizens of Ukraine.',
            image: ukraineSirenAlerts,
            link: '/dev/case-studies/ukraine-siren-alerts',
            linkText: 'Case Study',
            tags: 'React, Typescript, Design',
          },
          {
            heading: 'Math Monsters',
            body: 'With over 200k downloads, Math Monsters is a fun way for kids to practice their math skills. I did everything, including the illustration and animation.',
            image: mathMonsters,
            link: 'https://apps.apple.com/us/app/math-monsters/id499455175',
            linkText: 'App Store',
            target: '_blank',
            tags: 'iOS, Unity, C#, Illustration',
          },
          {
            heading: 'Built For Teams',
            body: 'I worked on everything from the mobile app to the browser extension to the website.',
            image: built,
            tags: 'React, React Native, Typescript',
          },
          {
            heading: 'Cheeky #unts',
            body: "An NFT project where we raised $50,000 for Australian wildlife charities, including the Australian Koala Foundation and Steve Irwin's Wildlife Warriors.",
            image: untsLogo,
            tags: 'React, Gatsby',
          },
          {
            heading: "Lance's Art",
            body: "I don't just make pretty code - I also make pretty pictures. Regardless of medium, I'm a little obsessed with the art of storytelling.",
            image: lanceSnider,
            link: '/',
            linkText: "Lance's Art",
            tags: 'React, NextJS',
          },
          {
            heading: 'VR Geography Game',
            body: "Standing at the center of an inverted globe, you don't just need to find the country, you need great aim.",
            image: geographyGame,
            tags: 'Unity, C#, VR',
          },
          {
            heading: 'Pure CSS 404 Page',
            body: "There are good reasons to avoid using Javascript on error pages, but that doesn't mean you can't have an adorable animation.",
            component: () => <BrokeBot />,
            tags: 'CSS, Illustration',
          },
        ]}
      />

      <Columns
        heading={'Oldies but Goodies'}
        subheading={
          "Is it weird to put 15-year-old projects in my portfolio? Maybe, but I'm really proud of what I was able to achieve back when my experience and the tech were so limited."
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
          // {
          //   heading: 'Zicam Ad',
          //   body: 'I loved this dumb little animation with its punchy arms, bounching around like a boxer.',
          //   image: zicam,
          // },
          {
            heading: 'SkyWest Airlines',
            body: 'Interactive 3D (actually rendered & 2.5D) training modules for all kinds of airline equipment.',
            image: skywest,
          },
        ]}
      />
    </div>
  )
}
