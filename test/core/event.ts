import { EventHub } from '../../src/core/event'
import { expect } from 'chai'
import { install } from '../dom.nyc'

describe('Core function test', () => {
  
  let hub: EventHub
  before(() => {
    install('<html><body></body></html>')
    hub = new EventHub()
  })
  
  it('get an event notice', done => {
    hub.listen('test_listen', () => done())
    hub.dispath('test_listen')
  })
  
  it('get an event notice and same data', done => {
    hub.listen('test_listen_2', (e, d) => {
      expect(d).to.be.eq('once')
      done()
    })
    hub.dispath('test_listen_2', 'once')
  })
  
})