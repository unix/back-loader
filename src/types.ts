
export type LoaderOptions = {
  pages?: string[]
  scripts?: string[]
  styles?: string[]
}

export type LoaderEvent = {
  source: string,
  type: string,
  success: boolean,
  insertScripts?: Function,
}
