export interface NowPlayingSettings {
  user: string
  apiKey: string
}

export default class NowPlaying {
  constructor (private element: HTMLElement, private options: NowPlayingSettings) {
    if (!element || !options) return

    this.initialize()
  }

  private initialize () {
    document.addEventListener('DOMContentLoaded', this.setData.bind(this))
  }

  private async setData () {
    const songData = await this.fetchData()

    if (songData) {
      const noteEmoji = document.createElement('span')
      noteEmoji.setAttribute('aria-label', 'Now playing')
      noteEmoji.innerHTML = '&#127925; '
      this.element.appendChild(noteEmoji)

      const nowPlayingText = document.createElement('a')
      nowPlayingText.setAttribute('href', songData.url)
      nowPlayingText.innerHTML = `${songData.artist['#text']} - ${songData.name}`
      this.element.appendChild(nowPlayingText)
      return
    }

    this.element.innerHTML = 'Currently not playing'
  }

  private async fetchData () {
    const apiPath = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.options.user}&api_key=${this.options.apiKey}&format=json`
    try {
      const response = await fetch(apiPath)
      if (response.ok) {
        const payload = await response.json()

        if (payload.recenttracks && payload.recenttracks.track) {
          return payload.recenttracks.track[0] as { name: string; url: string; artist: { '#text': string } }
        }
      }
    } catch (err) {
      return null
    }
  }
}
