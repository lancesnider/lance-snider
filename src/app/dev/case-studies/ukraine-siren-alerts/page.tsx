import BlogContent from '@/components/BlogContent/BlogContent'
import Image from '@/components/Image/Image'

import ukraineSirenAlerts from '@/assets/dev/ukraine-siren-alerts.jpg'

export default function Page() {
  return (
    <BlogContent>
      <h2>Case Study</h2>
      <h1>Ukraine Siren Alerts: Shelter Map</h1>
      <p>
        When Russia invaded Ukraine, the Ukraninan government didn't have an
        alerts system that worked across different regions. Ukraine Siren Alerts
        (UASA) was created to fill that gap until a more official solution could
        be implemented.
      </p>
      <p>
        I was brought on to lead a small team of fellow volunteers to replace
        the v1 website with a more permanent solution.
      </p>
      <p>
        Just before our launch, UASA became redundant. Though it's always
        disappointing to see your work go unused, this was the best possible
        outcome and I'm still proud of what we created.
      </p>
      <p>I'm most proud of is the shelters map that I designed and built.</p>
      <Image image={ukraineSirenAlerts} alt='Ukraine Siren Alerts' />

      <h3>Challenges:</h3>
      <ul>
        <li>
          There are over 20k shelters (the v1 site loaded the data for all of
          them at once)
        </li>
        <li>
          Internet in Ukraine is slow and unreliable, especially during attacks
        </li>
        <li>
          Between the Ukrainian citizens and foreign volunteers, there are a lot
          of languages to support
        </li>
      </ul>

      <h3>Solution:</h3>
      <p>WiP</p>
    </BlogContent>
  )
}
