
export const $fetch = (url: string, init: RequestInit = {}) => {
  return fetch(url, Object.assign({ mode: 'no-cors' }, init))
  .then(r => {
    console.log(r)
    return r.text()
  })
}

export const isRelativeURL = (path: string) => {
  return path.startsWith('./') || path.startsWith('..')
}

export const makeResourceReg = (str: string): RegExp => {
  return {
    script: /\<script\s+\S?src\=\"([^"]*)\"/g,
    style: /\<link\s+\S?\s?href\=\"([^"]*.css)\"/,
  }[str]
}
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
