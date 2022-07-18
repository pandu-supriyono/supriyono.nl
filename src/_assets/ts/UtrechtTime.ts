export default class UtrechtTime {
  constructor (private element: HTMLElement) {
    if (!element) return

    this.initialize()
  }

  private initialize () {
    setInterval(() => {
      this.element.innerHTML = 'Utrecht, NL ' + this.getCurrentTime()
    }, 1000)
  }

  private getCurrentTime () {
    return new Intl.DateTimeFormat([], {
      timeZone: 'Europe/Amsterdam',
      timeStyle: 'medium'
    }).format(new Date())
  }
}
