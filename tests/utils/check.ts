import * as Check from '../../src/utils/check'
import { expect } from 'chai'

describe('utils function', () => {
  
  it('pages should return false and print warning', () => {
    const result = Check.pages(['123'])
    expect(result).to.eq(false)
  })
  
})

