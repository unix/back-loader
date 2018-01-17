import * as Log from './log'
import { LoaderOptions } from '../types'

const regs = {
  page: /^http|^\/\//,
  js: /(^http|^\/\/)\S+\.js$/,
}

export const pages = (pages: string[]): boolean => {
  if (!Array.isArray(pages)) return Log.options.pagesError()
  const unnormalLinks = pages.filter(page => !regs.page.test(page))
  if (unnormalLinks && unnormalLinks.length) return Log.options.pagesError()
  return true
}

export const scripts = (scripts: string[]): boolean => {
  if (!Array.isArray(scripts)) return Log.options.scriptsError()
  const unnormalLinks = scripts.filter(s => !regs.js.test(s))
  if (unnormalLinks && unnormalLinks.length) return Log.options.scriptsError()
  return true
}


export const options = (ops: LoaderOptions): boolean => {
  const checkResults: boolean[] = []
  ops.pages && checkResults.push(pages(ops.pages))
  ops.scripts && checkResults.push(scripts(ops.scripts))
  
  if (!checkResults.length) return Log.options.isEmpty()
  return !`${checkResults}`.includes('false')
}

