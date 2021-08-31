export type RouteLabelType =
  | 'event'
  | 'announcement'
  | 'club'
  | 'about'
  | 'news'
  | 'competition'
  | 'hashtag'

type InternalLinksType = Record<
  RouteLabelType,
  Record<string, { name: string; link: string }>
>

export const ROUTES: InternalLinksType = {
  event: {
    en: {
      name: 'Events',
      link: '/events',
    },
    nl: {
      name: 'Evenementen',
      link: '/evenementen',
    },
    tr: {
      name: 'Etkinlikler',
      link: '/etkinlikler',
    },
  },
  announcement: {
    en: {
      name: 'Announcements',
      link: '/announcements',
    },
    nl: {
      name: 'Aankondigingen',
      link: '/aankondigingen',
    },
    tr: {
      name: 'Duyurular',
      link: '/duyurular',
    },
  },
  club: {
    en: {
      name: 'Club',
      link: '/club',
    },
    nl: {
      name: 'Club',
      link: '/club',
    },
    tr: {
      name: 'Club',
      link: '/kulup',
    },
  },
  about: {
    en: {
      name: 'About Us',
      link: '/about-us',
    },
    nl: {
      name: 'Over Ons',
      link: '/over-ons',
    },
    tr: {
      name: 'Hakkimizda',
      link: '/hakkimizda',
    },
  },
  news: {
    en: {
      name: 'News',
      link: '/news',
    },
    nl: {
      name: 'Nieuws',
      link: '/nieuws',
    },
    tr: {
      name: 'Haberler',
      link: '/haberler',
    },
  },
  competition: {
    en: {
      name: 'Competitions',
      link: '/competitions',
    },
    nl: {
      name: 'Wedstrijden',
      link: '/wedstrijden',
    },
    tr: {
      name: 'Yarismalar',
      link: '/yarismalar',
    },
  },
  hashtag: {
    en: {
      name: 'Hashtag Events',
      link: '/hashtag-events',
    },
    nl: {
      name: 'Hashtag Evenementen',
      link: '/hashtag-evenementen',
    },
    tr: {
      name: 'Hashtag Etkinlikleri',
      link: '/etiket-etkinlikleri',
    },
  },
}

export const HEADER_MENU: Record<string, { name: string; link: string }>[] = [
  ROUTES.announcement,
  ROUTES.news,
  ROUTES.event,
  ROUTES.competition,
  ROUTES.hashtag,
  ROUTES.club,
  ROUTES.about,
]
