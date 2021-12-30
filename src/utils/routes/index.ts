export type RouteLabelType =
  | 'event'
  | 'announcement'
  | 'club'
  | 'about'
  | 'news'
  | 'competition'
  | 'hashtag'
  | 'terms'
  | 'privacy'
  | 'contact'
  | 'blog'

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
      name: 'Hakkımızda',
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
      name: 'Yarışmalar',
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
      link: '/hashtag-etkinlikleri',
    },
  },
  terms: {
    en: {
      name: 'Terms of service',
      link: '/terms',
    },
    nl: {
      name: 'Algemene Voorwaarden ',
      link: '/voorwaarden',
    },
    tr: {
      name: 'Kullanım Şartları',
      link: '/kullanim-sartlari',
    },
  },
  privacy: {
    en: {
      name: 'Privacy Policy',
      link: '/privacy',
    },
    nl: {
      name: 'Privacybeleid',
      link: '/privacy',
    },
    tr: {
      name: 'Gizlilik Politikası',
      link: '/gizlilik',
    },
  },

  contact: {
    en: {
      name: 'Contact',
      link: '/contact',
    },
    nl: {
      name: 'Contact',
      link: '/contact',
    },
    tr: {
      name: 'İletişim',
      link: '/iletisim',
    },
  },
  blog: {
    en: {
      name: 'blog',
      link: '/blog',
    },
    nl: {
      name: 'blog',
      link: '/blog',
    },
    tr: {
      name: 'blog',
      link: '/blog',
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
  ROUTES.contact,
  ROUTES.blog,
]

export const FOOTER_MENU: Record<string, { name: string; link: string }>[] = [
  ROUTES.hashtag,
  ROUTES.event,
  ROUTES.blog,
]

export const SUPPORT_MENU: Record<string, { name: string; link: string }>[] = [
  ROUTES.terms,
  ROUTES.privacy,
]

export const SOCIETY_MENU: Record<string, { name: string; link: string }>[] = [
  ROUTES.about,
  ROUTES.contact,
  ROUTES.club,
]
