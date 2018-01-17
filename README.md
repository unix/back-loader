<div align="center" height="500">
<img src="logo.png" width="350" height="220" align="center">
</div>

<br><br>
### back-loader
> a easy and steady preload lib, you can use it to load all kinds of resources. use **back-loader** in your project,
> can quickly preload more pictures, styles(.css) or scripts, it will make your website more fluent.


#### Usage

1. install: `npm i back-loader --save`

2. use:
```ts
import { BackLoader } from 'back-loader'

const backHandler = new BackLoader({
  urls: string[],
  scripts: string[],
  styles: string[],
  images: string[],
})

// at the right time:
backHandler.start()
backHandler.onload = (event: any) => {
  console.log(event)
}
```

#### LICENSE

**MIT**
