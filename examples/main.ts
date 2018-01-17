import { BackLoader } from '../src/index'
document.title = 'hello'

const handler = async() => {
   const backLoader = new BackLoader({
     // scripts: ['https://code.jquery.com/jquery-3.2.1.slim.min.js'],
     pages: ['https://google.com'],
   })
    backLoader.start().on(event => {
      console.log(event)
    })
}

;(() => window.onload = () => handler().then())()
