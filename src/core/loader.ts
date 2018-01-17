import { EventHub } from './event'
import { LoaderEvent } from '../types'
import { $fetch, filterResources, listenImageLoad } from '../utils/tools'


export class Loader {
  
  hub: EventHub
  readonly baseEvent: LoaderEvent = { source: '', type: 'none', success: true, insertScripts: () => {} }
  
  constructor(hub: EventHub) {
    this.hub = hub
  }
  
  scripts(urls: string[]): void {
    this.loadURL(urls, 'script')
  }
  
  styles(urls: string[]): void {
    this.loadURL(urls, 'style')
  }
  
  pages(urls: string[]): void {
    urls.forEach(url => {
      $fetch(url, { mode: 'cors' })
      .then(html => {
        this.scripts(filterResources(html, 'script'))
        this.styles(filterResources(html, 'style'))
      })
      .catch(() => {
        this.emit(Object.assign({}, this.baseEvent, {
          type: 'page', source: url, success: false,
        }))
      })
    })
  }
  
  images(urls: string[]): void {
    const imageElements: HTMLImageElement[] = urls
    .map(url => Object.assign(new Image(), { src: url }))
    listenImageLoad(imageElements, (url: string) => {
      this.emit(Object.assign({}, this.baseEvent, {
        type: 'image', source: url,
      }))
    })
  }
  
  private loadURL(urls: string[], type: string): void {
    urls.forEach(url => {
      const scriptEvent = Object.assign({}, this.baseEvent, {
        type: type, source: url,
      })
      $fetch(url)
      .then(() => this.emit(scriptEvent))
      .catch(() => this.emit(Object.assign({}, scriptEvent, { success: false })))
    })
  }
  
  private makeInsertScripts(url: string): Function {
    return () => {
      const s: HTMLElement = document.createElement('script')
      s.setAttribute('src', url)
      document.body.appendChild(s)
    }
  }
  
  private emit(event: LoaderEvent): void {
    const next: LoaderEvent = Object.assign({}, event, event.type === 'script' ? {
      insertScripts: this.makeInsertScripts(event.source),
    } : {})
    this.hub.dispath('back_load_completed', next)
  }
  
}
