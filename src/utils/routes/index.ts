export type RouteLabelType =
  | 'event'
  | 'announcement'
  | 'club'
  | 'about'
  | 'news'
  | 'competition'
  | 'hashtag'
  | 'helpCenter'
  | 'termsOfService'
  | 'legal'
  | 'privacyPolicy'
  | 'status'
  | 'contactUs'

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
  helpCenter: {
    en: {
      name: 'Help Center',
      link: '/help-center',
    },
    nl: {
      name: 'Helpcentrum',
      link: '/help-centrum',
    },
    tr: {
      name: 'Yardım Merkezi',
      link: '/yardim-merkezi',
    },
  },
  termsOfService: {
    en: {
      name: 'Terms of service',
      link: '/terms-of-service',
    },
    nl: {
      name: 'Aankondigingen',
      link: '/aankondigingen',
    },
    tr: {
      name: 'Kullanım Şartları',
      link: '/kullanım-sartları',
    },
  },
  legal: {
    en: {
      name: 'Legal',
      link: '/legal',
    },
    nl: {
      name: 'Legaal',
      link: '/legaal',
    },
    tr: {
      name: 'Yasal',
      link: '/yasal',
    },
  },
  privacyPolicy: {
    en: {
      name: 'Privacy Policy',
      link: '/privacy-policy',
    },
    nl: {
      name: 'Wedstrijden',
      link: '/wedstrijden',
    },
    tr: {
      name: 'Gizlilik Politikası',
      link: '/gizlilik-politikası',
    },
  },
  status: {
    en: {
      name: 'Status',
      link: '/status',
    },
    nl: {
      name: 'Toestand',
      link: '/toestand',
    },
    tr: {
      name: 'Durum',
      link: '/durum',
    },
  },
  contactUs: {
    en: {
      name: 'Contact Us',
      link: '/contact-us',
    },
    nl: {
      name: 'Neem contact op',
      link: '/neem-contact-op',
    },
    tr: {
      name: 'Bize Ulaşın',
      link: '/bize-ulasin',
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

export const FOOTER_MENU: Record<string, { name: string; link: string }>[] = [
  ROUTES.announcement,
  ROUTES.news,
  ROUTES.event,
  ROUTES.competition,
  ROUTES.hashtag,
]

export const SUPPORT_MENU: Record<string, { name: string; link: string }>[] = [
  ROUTES.helpCenter,
  ROUTES.termsOfService,
  ROUTES.legal,
  ROUTES.privacyPolicy,
  ROUTES.status,
]

export const SOCIETY_MENU: Record<string, { name: string; link: string }>[] = [
  ROUTES.club,
  ROUTES.about,
  ROUTES.contactUs,
]
