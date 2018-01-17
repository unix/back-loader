import * as Log from './log'
import { LoaderOptions } from '../types'

const regs = {
  page: /^http|^\/\//,
  js: /(^http|^\/\/)\S+\.js$/,
  css: /(^http|^\/\/)\S+\.css$/,
  img: /^http|^\/\//,
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

export const styles = (styles: string[]): boolean => {
  if (!Array.isArray(styles)) return Log.options.stylesError()
  const unnormalLinks = styles.filter(s => !regs.css.test(s))
  if (unnormalLinks && unnormalLinks.length) return Log.options.stylesError()
  return true
}

export const images = (images: string[]): boolean => {
  if (!Array.isArray(images)) return Log.options.imagesError()
  const unnormalLinks = images.filter(s => !regs.img.test(s))
  if (unnormalLinks && unnormalLinks.length) return Log.options.imagesError()
  return true
}

export const options = (ops: LoaderOptions): boolean => {
  const checkResults: boolean[] = []
  ops.pages && checkResults.push(pages(ops.pages))
  ops.scripts && checkResults.push(scripts(ops.scripts))
  ops.styles && checkResults.push(styles(ops.styles))
  ops.images && checkResults.push(images(ops.images))
  
  if (!checkResults.length) return Log.options.isEmpty()
  return !`${checkResults}`.includes('false')
}

