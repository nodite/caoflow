import * as edgePath from 'edge-paths'

const isProd = (): boolean => {
  return !['development', 'test'].includes(process.env.NODE_ENV ?? '')
}

const getBrowserPath = (): string | undefined => {
  let path: string | undefined

  try {
    path = edgePath.getEdgePath()
  } catch {}

  return path
}

export default {getBrowserPath, isProd}
