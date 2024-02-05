import { Children, useEffect, useState } from 'react'
import { EVENTS } from './consts'
import { match } from 'path-to-regexp'
import Page404 from './pages/404'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = Page404 }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}
  const routeFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    if (!isRoute) return null

    return props
  })

  const routesToUse = routes.concat(routeFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    const matcheUrl = match(path, { decode: decodeURIComponent })
    const matched = matcheUrl(currentPath)
    if (!matched) return false

    routeParams = matched.params
    return true
  })?.Component

  return (Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />)
}
