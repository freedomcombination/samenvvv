import ROUTES from './routes.json'

const {
  announcement,
  news,
  event,
  competition,
  hashtag,
  blog,
  club,
  about,
  contact,
  terms,
  privacy,
} = ROUTES

export type ChildMenuType = { label: string; link: string }
export type ParentMenuType = {
  label: string
  children: ChildMenuType[]
}

export type MenuType = ChildMenuType | ParentMenuType
export type LocalizedMenuType = ILocalize<MenuType>

export const HEADER_MENU: Array<LocalizedMenuType> = [
  {
    en: {
      label: 'Menu',
      children: [announcement.en, news.en, event.en, competition.en],
    },
    nl: {
      label: 'Menu',
      children: [announcement.nl, news.nl, event.nl, competition.nl],
    },
    tr: {
      label: 'Menü',
      children: [announcement.tr, news.tr, event.tr, competition.tr],
    },
  },
  hashtag,
  blog,
  {
    en: {
      label: 'Samenvvv',
      children: [club.en, about.en, contact.en],
    },
    nl: {
      label: 'Samenvvv',
      children: [club.nl, about.nl, contact.nl],
    },
    tr: {
      label: 'Samenvvv',
      children: [club.tr, about.tr, contact.tr],
    },
  },
]

export const FOOTER_MENU: Array<ILocalize<ParentMenuType>> = [
  {
    en: {
      label: 'Foundation',
      children: [club.en, about.en, contact.en],
    },
    nl: {
      label: 'Stichting',
      children: [club.nl, about.nl, contact.nl],
    },
    tr: {
      label: 'Vakıf',
      children: [club.tr, about.tr, contact.tr],
    },
  },
  {
    en: {
      label: 'Menu',
      children: [
        announcement.en,
        news.en,
        event.en,
        competition.en,
        hashtag.en,
      ],
    },
    nl: {
      label: 'Menu',
      children: [
        announcement.nl,
        news.nl,
        event.nl,
        competition.nl,
        hashtag.nl,
      ],
    },
    tr: {
      label: 'Menu',
      children: [
        announcement.tr,
        news.tr,
        event.tr,
        competition.tr,
        hashtag.tr,
      ],
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
