import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import type { ReadonlyURLSearchParams } from 'next/navigation'

interface RouterStuff {
  pathname: string
  router: AppRouterInstance
  searchParams: ReadonlyURLSearchParams
  searchParamsObj: Record<string, string>
  queryParams: (options: {
    set?: Record<string, string | string[]>
    del?: string | string[]
    replace?: boolean
    scroll?: boolean
    getNewPath?: boolean
    arrayDelimiter?: string
  }) => string | undefined
  getQueryString: (
    kv?: Record<string, string | number | boolean>,
    opts?: {
      ignore?: string[]
    }
  ) => string
}

export function useRouterStuff(): RouterStuff {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchParamsObj = Object.fromEntries(searchParams)

  const getQueryString = (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    kv?: Record<string, any>,
    opts?: {
      ignore?: string[]
    }
  ) => {
    const newParams = new URLSearchParams(searchParams)
    if (kv) {
      for (const [k, v] of Object.entries(kv)) {
        newParams.set(k, v)
      }
    }
    if (opts?.ignore) {
      for (const k of opts.ignore) {
        newParams.delete(k)
      }
    }
    const queryString = newParams.toString()
    return queryString.length > 0 ? `?${queryString}` : ''
  }

  const queryParams = ({
    set,
    del,
    replace,
    scroll = true,
    getNewPath,
    arrayDelimiter = ',',
  }: {
    set?: Record<string, string | string[]>
    del?: string | string[]
    replace?: boolean
    scroll?: boolean
    getNewPath?: boolean
    arrayDelimiter?: string
  }) => {
    const newParams = new URLSearchParams(searchParams)
    if (set) {
      for (const [k, v] of Object.entries(set)) {
        newParams.set(k, Array.isArray(v) ? v.join(arrayDelimiter) : v)
      }
    }
    if (del) {
      if (Array.isArray(del)) {
        for (const k of del) {
          newParams.delete(k)
        }
      } else {
        newParams.delete(del)
      }
    }
    const queryString = newParams.toString()
    const newPath = `${pathname}${
      queryString.length > 0 ? `?${queryString}` : ''
    }`
    if (getNewPath) return newPath
    if (replace) {
      router.replace(newPath, { scroll: false })
    } else {
      router.push(newPath, { scroll })
    }
  }

  return {
    pathname,
    router,
    searchParams,
    searchParamsObj,
    queryParams,
    getQueryString,
  }
}
