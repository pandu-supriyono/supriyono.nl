import gsap from 'gsap'

export default class Hero {
  private image: HTMLImageElement

  constructor (private hero: HTMLElement, private button: HTMLElement, private reveal: HTMLElement) {
    if (!hero || !button || !reveal) return

    this.image = reveal.querySelector('img')

    if (!this.image) return

    this.initialize()
  }

  private initialize () {
    window.addEventListener('resize', this.reset.bind(this))
    this.button.addEventListener('click', () => {
      this.positionElement()
      this.showImage()
    })
    this.button.addEventListener('blur', this.hideImage.bind(this))
    this.button.addEventListener('mouseenter', this.showImage.bind(this))
    this.button.addEventListener('mouseleave', this.hideImage.bind(this))
    this.button.addEventListener('mousemove', this.positionElement.bind(this))
    this.hero.addEventListener('mouseenter', this.unsetLazyLoad.bind(this))
  }

  private reset () {
    this.reveal.style.removeProperty('transform')
    this.image.style.removeProperty('transform')
    this.reveal.style.removeProperty('display')
    this.reveal.style.removeProperty('visibility')
  }

  private unsetLazyLoad () {
    this.image.removeAttribute('loading')
  }

  private getMousePos (e: MouseEvent) {
    if (e.pageX || e.pageY) {
      return {
        x: e.pageX,
        y: e.pageY
      }
    }

    if (e.clientX || e.clientY) {
      const x =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft

      const y =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop

      return { x, y }
    }

    return { x: 0, y: 0 }
  }

  private positionElement (e?: MouseEvent) {
    return requestAnimationFrame(() => {
      const mousePos = this.getMousePos(e)
      const docScrolls = {
        left: document.body.scrollLeft + document.documentElement.scrollLeft,
        top: document.body.scrollTop + document.documentElement.scrollTop
      }
      const x = mousePos.x + 20 - docScrolls.left
      const y = mousePos.y + 20 - docScrolls.top

      this.reveal.style.transform = `translate3d(${x}px, ${y}px, 0)`
    })
  }

  private showImage () {
    gsap.killTweensOf(this.image)
    this.reveal.style.display = 'block'
    this.reveal.style.visibility = 'visible'

    gsap.fromTo(
      this.image,
      {
        x: '-100%',
        y: '-100%'
      },
      {
        x: '0%',
        y: '0%',
        duration: 0.3,
        ease: 'expo'
      }
    )
  }

  private hideImage () {
    gsap.to(
      this.image,
      {
        x: '100%',
        y: '100%',
        duration: 0.3,
        ease: 'expo'
      }
    ).then(() => {
      this.reveal.style.display = 'none'
      this.reveal.style.visibility = 'hidden'
    })
  }
}
