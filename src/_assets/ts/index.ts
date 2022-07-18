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
  new NowPlaying(document.querySelector('[data-module="now-playing"]'))
  new VisitorCount(document.querySelector('[data-module="visitor-count"]'), {
    namespace: process.env.VISITOR_COUNT_NAMESPACE,
    key: process.env.VISITOR_COUNT_KEY
  })

  Array.from(document.querySelectorAll('[data-switcher]')).forEach(
    (element) => new Switcher(element)
  )
}
