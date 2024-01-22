import Columns from '@/components/Columns/Columns'

import cassowary from '@/assets/gallery-sm/cassowary.jpg'
import cassowary2 from '@/assets/gallery-sm/cassowary2.jpg'
import cassowary3 from '@/assets/gallery-sm/cassowary3.jpg'
import verticAlley from '@/assets/gallery-sm/verticAlley.jpg'

export default function Page() {
  return (
    <div>
      <Columns
        heading={'Coming Soon!'}
        subheading={
          "Because Storybook works separately from your app, you'll need to configure it for your specific stack and setup. Below, explore guides for configuring Storybook with popular frameworks and tools. If you get stuck, learn how you can ask for help from our community."
        }
        defaultColumns={3}
        columns={[
          {
            heading: 'Add styling and CSS',
            subheading:
              'Like with web applications, there are many ways to include CSS within Storybook. Learn more about setting up styling within Storybook.',
            image: verticAlley,
            link: '/dead-bird',
            linkText: 'Learn more',
          },
          {
            heading: 'Add styling and CSS',
            subheading:
              'Like with web applications, there are many ways to include CSS within Storybook. Learn more about setting up styling within Storybook.',
            image: verticAlley,
            link: '/dead-bird',
            linkText: 'Learn more',
          },
          {
            heading: 'Add styling and CSS',
            subheading:
              'Like with web applications, there are many ways to include CSS within Storybook. Learn more about setting up styling within Storybook.',
            image: verticAlley,
            link: '/dead-bird',
            linkText: 'Learn more',
          },
        ]}
      />
      <Columns
        heading={'Configure Your Project'}
        subheading={
          "Because Storybook works separately from your app, you'll need to configure it for your specific stack and setup. Below, explore guides for configuring Storybook with popular frameworks and tools. If you get stuck, learn how you can ask for help from our community."
        }
        defaultColumns={2}
        columns={[
          {
            heading: 'Add styling and CSS',
            subheading:
              'Like with web applications, there are many ways to include CSS within Storybook. Learn more about setting up styling within Storybook.',
            image: verticAlley,
            link: '/dead-bird',
            linkText: 'Learn more',
          },
          {
            heading: 'Add styling and CSS',
            subheading:
              'Like with web applications, there are many ways to include CSS within Storybook. Learn more about setting up styling within Storybook.',
            image: verticAlley,
            link: '/dead-bird',
            linkText: 'Learn more',
          },
          {
            heading: 'Add styling and CSS',
            subheading:
              'Like with web applications, there are many ways to include CSS within Storybook. Learn more about setting up styling within Storybook.',
            image: verticAlley,
            link: '/dead-bird',
            linkText: 'Learn more',
          },
          {
            heading: 'Add styling and CSS',
            subheading:
              'Like with web applications, there are many ways to include CSS within Storybook. Learn more about setting up styling within Storybook.',
            image: verticAlley,
            link: '/dead-bird',
            linkText: 'Learn more',
          },
        ]}
      />
    </div>
  )
}
