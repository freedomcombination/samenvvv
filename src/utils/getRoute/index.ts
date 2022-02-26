import { ROUTES } from '@config'

export const getRoute = (
  type: 'announcement' | 'competition' | 'hashtag',
  locale: CommonLocale,
) => ROUTES[type][locale].link.replace('/', '')
