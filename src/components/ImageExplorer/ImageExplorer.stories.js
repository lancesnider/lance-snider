import ImageExplorer from './ImageExplorer'

import imgWorkCover from '../../assets/jan6/capitol-riot.jpg'
import imageExplorerConfig from './ImageExplorerCapitolConfig'

const capitolRiot = {
  image: imgWorkCover.src,
  alt: 'Jan 6 - Riot at the Capitol',
  pins: imageExplorerConfig,
}

export default {
  title: 'Experiments/Image Width Pins (desktop)',
  component: ImageExplorer,
  args: capitolRiot,
}

const Template = args => <div
  style={{ backgroundColor: '#161c2d', minHeight: '100%', padding: 16 }}
>
  <ImageExplorer {...args} />
</div>

export const Jan6 = Template.bind({})


