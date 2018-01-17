import * as Check from './utils/check'
import { EventHub } from './core/event'
import { Loader } from './core/loader'
import { LoaderEvent, LoaderOptions } from './types'

export class BackLoader {
  
  options: LoaderOptions
  hub: EventHub
  constructor(ops: LoaderOptions) {
    Check.options(ops)
    this.options = ops
  }
  
  start(): BackLoader {
    this.hub = new EventHub()
    const loader = new Loader(this.hub)
    const { scripts, pages } = this.options
    
    scripts && loader.scripts(scripts)
    return this
  }
  
  on(done: ($event: LoaderEvent) => void ): void {
    this.hub.listen('back_load_completed', (e, $event) => done($event))
  }
  
}
