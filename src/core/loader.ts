import { EventHub } from './event'
import { LoaderEvent } from '../types'
import { $fetch, isRelativeURL } from '../utils/tools'


export class Loader {
  
  hub: EventHub
  readonly baseEvent: LoaderEvent = { source: '', type: 'none', success: true, insertScripts: () => {} }
  
  static resourceReg(str: string): RegExp {
    return {
      script: /\<script\s+\S?src\=\"([^"]*)\"/g,
    }[str]
  }
  
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
        console.log(html)
        this.scripts(this.filterResources(html, 'script'))
      })
      .catch((e) => {
        console.log(e)
      })
    })
  }
  
  private filterResources(source: string, type: string): string[] {
    const reg: RegExp = Loader.resourceReg(type), arr: string[] = []
    let result: string[], num = 10
    while ((result = reg.exec(source)) && num --) {
      if (result[1] && !isRelativeURL(result[1])) {
        arr.push(result[1])
      }
    }
    return arr
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
