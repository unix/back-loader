import * as Check from '../../src/utils/check'
import { expect } from 'chai'

describe('Utils function', () => {
  
  it('pages should return false and print warning', done => {
    const result = Check.pages(['123'])
    expect(result).to.eq(false)
    done()
  })
  
  it('link should return false and print warning', done => {
    const result = Check.scripts(['123'])
    expect(result).to.eq(false)
    done()
  })
  
})

