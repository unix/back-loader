<br>
<div align="center" height="500">
<img src="logo.png" width="460" height="220" align="center">
</div>

<br><br><br>
### back-loader (~ 1.2kb gzipped)
> a easy and steady preload lib, you can use it to load all kinds of resources. 

>use **back-loader** in your project, you can quickly preload more pictures, styles(.css) or scripts, it will make your website more fluent.

According to my data，use `back-loader` preload all page in production project, DomReadyTime < 200 ms !!!
the user experience of each page can be greatly improved.
<br>

#### Usage

1. install: `npm i back-loader --save`

2. use:
```ts
import { BackLoader } from 'back-loader'

const backHandler = new BackLoader({
  pages?: string[],
  scripts?: string[],
  styles?: string[],
  images?: string[],
})

// at the right time:
backHandler.start()
backHandler.onload = (event: loadEvent) => {
  console.log(event)
}

type loadEvent = {
  source: string,           // resource url, like: 'host.com/a.js'
  type: string,             // resource type, like: 'script' / 'style' / 'image'
  success: boolean,
  insertScripts?: Function,
}
```

For example, i want preload `google.com/new-product.html` page,  then append the above code on the home page (or any other pages),
like `setTimeout(() => backHandler.start(), 1000)`, browser will load all resources and caching to memory or disk,
waiting for the user to browse `google.com/new-product.html`，just need few millisecond!

<br>


#### LICENSE

**MIT**
