import { RouteKeys, ROUTES } from '@config'

export const getMainPageLink = (type: RouteKeys): string =>
  (ROUTES as Record<RouteKeys, ChildMenuType>)[type].link.replace('/', '')
