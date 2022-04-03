import { RouteKeys, ROUTES } from '@config'

export const getMainPageLink = (
  type: RouteKeys,
  locale: StrapiLocale,
): string => ROUTES[type][locale].link.replace('/', '')
