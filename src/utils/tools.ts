

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
