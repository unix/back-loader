import { EventHub } from './event'
import { LoaderEvent } from '../types'


export class Loader {
  
  readonly baseEvent: LoaderEvent = { source: '', type: 'none', success: true, insertScripts: () => {} }
  hub: EventHub
  constructor(hub: EventHub) {
    this.hub = hub
  }
  
  scripts(urls: string[]): void {
    const scriptEvent = Object.assign({}, this.baseEvent, { type: 'script' })
    urls.forEach(url => {
      fetch(url)
      .then(() => {
        this.hub.dispath('back_load_completed', Object.assign({},
          scriptEvent, { source: url, insertScripts: this.makeInsertScripts(url) }))
      })
      .catch(() => {
        this.hub.dispath('back_load_completed', Object.assign({},
          scriptEvent, { source: url, success: false }))
      })
    })
  }
  
  private makeInsertScripts(url: string): Function {
    return () => {
      const s: HTMLElement = document.createElement('script')
      s.setAttribute('src', url)
      document.body.appendChild(s)
    }
  }
}
