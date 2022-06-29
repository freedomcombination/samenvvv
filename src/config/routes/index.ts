import ROUTES from './routes.json'

export type RouteKeys = keyof typeof ROUTES | 'post'

const { hashtag, foundation, about, contact, terms, privacy } = ROUTES

export const HEADER_MENU: Array<ChildMenuType> = [
  hashtag,
  about,
  contact,
  foundation,
]

export const FOOTER_MENU: Array<ChildMenuType & { children: ChildMenuType[] }> =
  [
    {
      children: [foundation, about, contact],
      link: '#',
      en: foundation.en,
      tr: foundation.tr,
      nl: foundation.nl,
    },
    {
      children: [hashtag],
      link: '#',
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [terms, privacy],
      link: '#',
      en: 'Support',
      nl: 'Steun',
      tr: 'Destek',
    },
  ]
