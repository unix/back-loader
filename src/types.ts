
export type LoaderOptions = {
  pages?: string[]
  scripts?: string[]
}

export type LoaderEvent = {
  source: string,
  type: string,
  success: boolean,
  insertScripts?: Function,
}
