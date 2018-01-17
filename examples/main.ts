import { BackLoader } from '../src/index'
document.title = 'hello'

const handler = async() => {
   const backLoader = new BackLoader({
     // scripts: ['https://code.jquery.com/jquery-3.2.1.slim.min.js'],
     // pages: ['https://google.com'],
     images: ['https://cn.bing.com/az/hprichbg/rb/BarHarborCave_ZH-CN8055769470_1920x1080.jpg'],
   })
  backLoader.start().on(event => {
    console.log(event)
  })
}

;(() => window.onload = () => handler().then())()
