import { JSDOM } from 'jsdom'

declare var global: NodeJS.Global & {
  document?: Document,
  window?: any,
  CustomEvent?: CustomEvent,
}

export const install = (html: string = ''): void => {
  
  if (typeof global.window !== 'undefined') return
  global.window = (new JSDOM(html)).window
  global.document = global.window.document
  global.CustomEvent = global.window.CustomEvent
}
