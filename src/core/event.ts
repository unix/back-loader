export type EventHubListener = {
  (evt: Event, detail?: any): void,
}
export type EventRecord = {
  type: string,
  handle: EventHubListener,
  done: EventListener,
}

export class EventHub {
  
  private source: Text
  private eventRecords: EventRecord[] = []
  
  constructor() {
    this.source = document.createTextNode('')
  }
  
  dispath(eventType: string, detail?: any): void {
    const event: CustomEvent = new CustomEvent(eventType,
      Object.assign({
        bubbles: true,
        cancelable: true,
      }, { detail }))
    this.source.dispatchEvent(event)
  }
  
  listen(eventType: string, done: EventHubListener): void {
    const handle = (e: any) => done(e, e.detail)
    const record: EventRecord = this.eventRecords.find(record => {
      return record.type === eventType && record.done === done
    })
    if (!!record) return
    this.source.addEventListener(eventType, handle)
    this.eventRecords.push({ type: eventType, handle, done })
  }
  
  remove(eventType: string, done?: EventHubListener): void {
    // just remove one
    if (done) return this.removeOne(eventType, done)
    // remove this type
    this.eventRecords = this.eventRecords
    .map(re => {
      if (re.type !== eventType) return re
      this.source.removeEventListener(re.type, re.handle)
      return null
    })
    .filter(r => r)
  }
  
  removeAll(): void {
    this.eventRecords
    .forEach(re => this.source.removeEventListener(re.type, re.handle))
    this.eventRecords = []
  }
  
  private removeOne(eventType: string, done?: EventHubListener): void {
    const index: number = this.eventRecords.findIndex(record => {
      return record.type === eventType && record.done === done
    })
    if (index < 0) return
    this.source.removeEventListener(eventType, this.eventRecords[index].handle)
    this.eventRecords.splice(index, 1)
  }
  
}
