import * as Check from '../../src/utils/check'
import { expect } from 'chai'

describe('Check function test', () => {
  
  let _warn: (msg?: any, ...p: any[]) => void
  before(() => {
    // hack warn func, utils function maybe use it
    _warn = global.console.warn
    global.console.warn = () => {}
  })
  
  after(() => {
    global.console.warn = _warn
  })
  
  it('should return boolean and identify page url', () => {
    expect(Check.pages(['http://baidu.com'])).to.be.eq(true)
    expect(Check.pages(['https://baidu.com'])).to.be.eq(true)
    expect(Check.pages(['//baidu.com'])).to.be.eq(true)
    expect(Check.pages(['baidu.com'])).to.be.eq(false)
    expect(Check.pages(['www.baidu.com'])).to.be.eq(false)
    expect(Check.pages([''])).to.be.eq(false)
  })
  
  it('should return boolean and identify script url', () => {
    expect(Check.scripts(['http://npm.some.js'])).to.be.eq(true)
    expect(Check.scripts(['https://npm.some.js'])).to.be.eq(true)
    expect(Check.scripts(['//npm.some.js'])).to.be.eq(true)
    expect(Check.scripts(['https://npm.some.css'])).to.be.eq(false)
    expect(Check.scripts(['https://npm.some.com/'])).to.be.eq(false)
    expect(Check.scripts(['hello.npm.some.com'])).to.be.eq(false)
    expect(Check.scripts([''])).to.be.eq(false)
  })
  
  it('should return boolean and identify all options', () => {
  })
  
})

