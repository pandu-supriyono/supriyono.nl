export default class DarkModeToggle {
  private readonly LOCAL_STORAGE_KEY = '__SUPRIYONO__MODE__'

  constructor (private button: HTMLButtonElement) {
    if (!button) return

    this.initialize()
  }

  private initialize () {
    this.checkExistingPreference()
    this.toggleText()
    this.button.addEventListener('click', this.onClick.bind(this))
  }

  private checkExistingPreference () {
    const prefersDarkBrowser = window.matchMedia('(prefers-color-scheme: dark)').matches

    const token = window.localStorage.getItem(this.LOCAL_STORAGE_KEY)
    const prefersDark = token ? token === 'dark' : prefersDarkBrowser

    if (prefersDark && !document.body.classList.contains('body--dark')) {
      document.body.classList.add('body--dark')
    }
  }

  private setLocalStoragePreference () {
    if (document.body.classList.contains('body--dark')) {
      window.localStorage.setItem(this.LOCAL_STORAGE_KEY, 'dark')
      return
    }

    window.localStorage.setItem(this.LOCAL_STORAGE_KEY, 'light')
  }

  private onClick () {
    this.toggleClass()
    this.setLocalStoragePreference()
    this.toggleText()
  }

  private toggleClass () {
    document.body.classList.toggle('body--dark')
  }

  private toggleText () {
    if (document.body.classList.contains('body--dark')) {
      this.button.innerHTML = 'Light mode'
      return
    }
    this.button.innerHTML = 'Dark mode'
  }
}
