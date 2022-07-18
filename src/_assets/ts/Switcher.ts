export default class Switcher {
  private position: string

  constructor (private element: Element) {
    if (!element) return

    const position = element.getAttribute('data-switcher')

    if (!position) return

    this.position = position

    this.initialize()
  }

  private initialize () {
    this.positionChildren()
    window.addEventListener('resize', this.positionChildren.bind(this))
  }

  private positionChildren () {
    if (this.position === 'centered') {
      this.positionCentered()
    }
  }

  private positionCentered () {
    const bounds = this.element.getBoundingClientRect()
    const children = Array.from(this.element.children)
    const centerBound = (bounds.left + bounds.right) / 2

    children.forEach((child, i) => {
      const childBounds = child.getBoundingClientRect()
      const distanceFromLeft = childBounds.left - bounds.left
      const distanceFromCenter = Math.abs(centerBound - childBounds.left)
      const distanceFromRight = Math.abs(bounds.right - childBounds.right)

      child.setAttribute('data-switcher-position', 'left')

      if (distanceFromLeft > distanceFromCenter) {
        child.setAttribute('data-switcher-position', 'center')
      }

      if (distanceFromCenter > distanceFromRight) {
        child.setAttribute('data-switcher-position', 'right')
      }

      if (distanceFromLeft === 0) {
        child.setAttribute('data-switcher-position', 'left')
      }
    })
  }
}
