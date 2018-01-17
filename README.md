<br>
<div align="center" height="500">
<img src="logo.png" width="460" height="220" align="center">
</div>

<br><br><br>
### back-loader
> a easy and steady preload lib, you can use it to load all kinds of resources. use **back-loader** in your project,
> can quickly preload more pictures, styles(.css) or scripts, it will make your website more fluent.


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

#### More

1. the resources of different domain names can be loaded normally.
2. if you use `page`, `back-loader` automatically analyzes every resources included in the page. but domain name needs to be the same as the current page. (of course)

```

#### LICENSE

**MIT**
