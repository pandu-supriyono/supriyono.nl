export interface VisitorCountOptions {
  namespace: string
  key: string
}

export default class VisitorCount {
  constructor (private element: HTMLElement, private options: VisitorCountOptions) {
    if (!element || !options) return

    this.initialize()
  }

  private initialize () {
    document.addEventListener('DOMContentLoaded', this.setData.bind(this))
  }

  private async setData () {
    const value = await this.fetchData()

    if (!value) return

    const valueString = value.toString()

    const remaining = Math.max(0, 5 - valueString.length)

    const toAppend = remaining >= 1 ? '0'.repeat(remaining) : ''

    this.element.innerHTML = toAppend + (value + 1).toString()
  }

  private async fetchData () {
    try {
      const response = await fetch(`https://api.countapi.xyz/get/${this.options.namespace}/${this.options.key}`)
      if (response.ok) {
        const payload = await response.json()

        if (payload.value && !isNaN(parseInt(payload.value))) {
          return parseInt(payload.value)
        }
      }
    } catch (err) {
      return null
    }
  }
}
