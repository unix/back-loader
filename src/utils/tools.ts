// resource load use no-cors mode default
// html load must use cors
export const $fetch = (url: string, init: RequestInit = {}) => {
  return fetch(url, Object.assign({ mode: 'no-cors' }, init))
  .then(r => r.text())
}

// like './images/xxx' or '../images'
export const isRelativeURL = (path: string) => {
  return path.startsWith('./') || path.startsWith('..')
}


export const makeResourceReg = (str: string): RegExp => {
  return {
    script: /\<script\s+\S?src\=\"([^"]*)\"/g,
    style: /\<link\s+\S?\s?href\=\"([^"]*.css)\"/g,
  }[str]
}

// find scripts and styles in html string
export const filterResources = (source: string, type: string): string[] => {
  const reg: RegExp = makeResourceReg(type), arr: string[] = []
  let result: string[], num = 10
  while ((result = reg.exec(source)) && num --) {
    if (result[1] && !isRelativeURL(result[1])) {
      arr.push(result[1])
    }
  }
  return arr
}

export const listenImageLoad = (images: HTMLImageElement[], done: (url: string) => void)
: void => {
  images.forEach(img => img.onload = () => done(img.src))
  // const isCompleted = (imgs: HTMLImageElement[]) => !imgs.length
  // const timer: number = window.setInterval(() => {
  //
  //   // images = images.map(img => {
  //   //   console.log(img)
  //   //   if (!img.complete) return img
  //   //   done(img.src)
  //   //   return null
  //   // })
  //   // .filter(v => !!v)
  //   isCompleted(images) && clearInterval(timer)
  // }, 300)
}
