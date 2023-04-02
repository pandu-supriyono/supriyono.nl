import DarkModeToggle from './DarkModeToggle'
import AmsterdamTime from './AmsterdamTime'
import Hero from './Hero'
import NowPlaying from './NowPlaying'
import Switcher from './Switcher'

export function init () {
  new DarkModeToggle(
    document.querySelector('[data-module="dark-mode-toggle-button"]')
  )
  new AmsterdamTime(document.querySelector('[data-module="amsterdam-time"]'))
  new Hero(
    document.querySelector('[data-module="hero"]'),
    document.querySelector('[data-module="portrait-reveal-button"]'),
    document.querySelector('[data-module="portrait-reveal"]')
  )
  new NowPlaying(document.querySelector('[data-module="now-playing"]'))

  Array.from(document.querySelectorAll('[data-switcher]')).forEach(
    (element) => new Switcher(element)
  )
}
