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
  
  it('should nerve receive any notice', done => {
    hub.listen('test_listen_3', (e, d) => expect.fail(d, null))
    hub.removeAll()
    hub.dispath('test_listen_3', 'once')
    setTimeout(done, 100)
  })
  
  it('get an event and reject an event', done => {
    hub.listen('test_listen_4', () => process.exit(1))
    hub.listen('test_listen_5', () => done())
    hub.remove('test_listen_4')
    hub.dispath('test_listen_4', 'once')
    hub.dispath('test_listen_5', 'once')
  })
  
})
