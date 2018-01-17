### back-loader


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
