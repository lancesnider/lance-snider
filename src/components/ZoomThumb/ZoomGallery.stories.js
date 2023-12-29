import {images} from '../../utils/images'
import ZoomGallery from './ZoomGallery'

export default {
  title: 'Experiments/ZoomGallery',
  header: 'ser',
  component: ZoomGallery,
  args: {
    zoomForever: false,
    defaultZoom: 1.5,
    images: images
  },
}

const Template = (args) => (
  <div style={{ padding: 50, minHeight: '100vh', backgroundColor: '#171c2c' }}>
    <ZoomGallery {...args} />

    <div className='storybook__description'>
      <h1>Zoom Thumbnail Gallery</h1>
      <p>
        My art tends to be pretty detailed so I wanted some way to show some of it in the Thumbnail. The idea was to let people do a little bit of exploring just through hover.
      </p>

      <p>
        Unfortunately, as a gallery it kind of confused some test users. Also, I wasn't able to come up with a decent mobile experience.
      </p>

    </div>
  </div>
)

export const ZoomOnHover = Template.bind({})

export const StayZoomed = Template.bind({})
StayZoomed.args = {
  zoomForever: true,
}
