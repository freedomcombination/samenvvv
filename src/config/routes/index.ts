import ROUTES from './routes.json'

export type RouteKeys = keyof typeof ROUTES

const { hashtag, foundation, about, contact, terms, privacy } = ROUTES

export type MenuType = ChildMenuType | ParentMenuType
export type LocalizedMenuType = Localize<MenuType>

export const HEADER_MENU: Array<LocalizedMenuType> = [
  hashtag,
  about,
  contact,
  foundation,
]

export const FOOTER_MENU: Array<Localize<ParentMenuType>> = [
  {
    en: {
      label: 'Foundation',
      children: [foundation.en, about.en, contact.en],
    },
    nl: {
      label: 'Stichting',
      children: [foundation.nl, about.nl, contact.nl],
    },
    tr: {
      label: 'Vakıf',
      children: [foundation.tr, about.tr, contact.tr],
    },
  },
  {
    en: {
      label: 'Menu',
      children: [hashtag.en],
    },
    nl: {
      label: 'Menu',
      children: [hashtag.nl],
    },
    tr: {
      label: 'Menu',
      children: [hashtag.tr],
    },
  },
  {
    en: {
      label: 'Support',
      children: [terms.en, privacy.en],
    },
    nl: {
      label: 'Steun',
      children: [terms.nl, privacy.nl],
    },
    tr: {
      label: 'Destek',
      children: [terms.tr, privacy.tr],
    },
  },
]
