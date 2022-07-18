import '../scss/index.scss'
import '../fonts/PPNeueMontreal-Regular.otf'
import '../fonts/PPNeueMontreal-Regular.woff'
import '../fonts/PPNeueMontreal-Regular.woff2'
import '../fonts/PPNeueMontreal-Regular.ttf'
import '../fonts/PPNeueMontreal-Medium.otf'
import '../fonts/PPNeueMontreal-Medium.woff'
import '../fonts/PPNeueMontreal-Medium.woff2'
import '../fonts/PPNeueMontreal-Medium.ttf'
import '../fonts/PPNeueMontreal-Bold.otf'
import '../fonts/PPNeueMontreal-Bold.woff'
import '../fonts/PPNeueMontreal-Bold.woff2'
import '../fonts/PPNeueMontreal-Bold.ttf'
import '../images/pandu-portrait.jpeg'
import DarkModeToggle from './DarkModeToggle'
import UtrechtTime from './UtrechtTime'
import PortraitReveal from './PortraitReveal'
import NowPlaying from './NowPlaying'
import VisitorCount from './VisitorCount'
import Switcher from './Switcher'

export function init () {
  new DarkModeToggle(
    document.querySelector('[data-module="dark-mode-toggle-button"]')
  )
  new UtrechtTime(document.querySelector('[data-module="utrecht-time"]'))
  new PortraitReveal(
    document.querySelector('[data-module="portrait-reveal-button"]'),
    document.querySelector('[data-module="portrait-reveal"]')
  )
  new NowPlaying(document.querySelector('[data-module="now-playing"]'), {
    apiKey: process.env.LAST_FM_API_KEY,
    user: process.env.LAST_FM_USER
  })
  new VisitorCount(document.querySelector('[data-module="visitor-count"]'), {
    namespace: process.env.VISITOR_COUNT_NAMESPACE,
    key: process.env.VISITOR_COUNT_KEY
  })

  Array.from(document.querySelectorAll('[data-switcher]')).forEach(
    (element) => new Switcher(element)
  )
}
