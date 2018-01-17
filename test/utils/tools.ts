import { expect } from 'chai'
import { filterResources, isRelativeURL } from '../../src/utils/tools'

const scriptMock = `
<body>
<script src="host.com/static/hello.js"></script>
<script src="../static/hello.js"></script>
<scrip src="../static/error.js"></scrip>
<script link="../static/error.js"></script>
</body>
`
const scriptResult = 'host.com/static/hello.js'

const styleMock = `
<head>
<link href="host.com/static/hello.css">
<link href="host.com/static/hello.js">
<link src="host.com/static/hello.css">
<lin src="../static/error.css">
<link link="../static/error.css">
</head>
`
const styleResult = 'host.com/static/hello.css'

describe('Tool function test', () => {
  
  it('should inspect relative url and return boolean', () => {
    expect(isRelativeURL('./static/a.html')).to.be.eq(true)
    expect(isRelativeURL('../static/a.html')).to.be.eq(true)
    expect(isRelativeURL('.../static/a.html')).to.be.eq(true)
    expect(isRelativeURL('/static/a.html')).to.be.eq(false)
    expect(isRelativeURL('www.host.com/static/a.html')).to.be.eq(false)
  })
  
  it('should filter and find scripts', () => {
    expect(filterResources(scriptMock, 'script'))
      .to.be.lengthOf(1)
      .to.be.eqls([scriptResult])
  })
  
  it('should filter and find styles', () => {
    expect(filterResources(styleMock, 'style'))
      .to.be.lengthOf(1)
      .to.be.eqls([styleResult])
  })
  
})
