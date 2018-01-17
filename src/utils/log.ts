
export const warning = (msg: string) => {
  console.warn(`BackLoader: ${msg}`)
  return false
}

export const options = {
  pagesError: () => warning('options [pages] error.'),
  scriptsError: () => warning('options [scripts] error.'),
  isEmpty: () => warning('options is empty!'),
}
