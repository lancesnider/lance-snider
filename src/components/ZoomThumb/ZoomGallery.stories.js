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
  </div>
)

export const ZoomOnHover = Template.bind({})

export const StayZoomed = Template.bind({})
StayZoomed.args = {
  zoomForever: true,
}
