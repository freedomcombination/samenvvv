import { NextSeoProps } from 'next-seo'

export const getDefaultSeo = (locale: string): NextSeoProps => {
  const titleTemplate: Record<string, string> = {
    nl: '%s | Samen voor Vrijheid en Verbinding',
    tr: '%s | Birlikte Yaşama ve Özgürlük',
    en: '%s | Together for Freedom and Connection',
  }

  const title = 'SamenVVV'

  const description: Record<string, string> = {
    nl: 'Wij staan voor actieve bijdragen aan Nederlandse samenlevng en besteden aandacht aan mensenrechtenschendngen in Turkije en de wereld',
    tr: 'Insan hakları ihlallerini kamuoyuna duyurmak, topluma katkı amaçlı gündemleri paylaşmak amacıyla platformumuz kurulmuştur',
    en: 'Our platform was established to announce human rights violations to the public and to share agendas to contribute to society',
  }

  const twitter: Record<string, string> = {
    nl: '@samenvvv',
    tr: '@samenvvvTR',
    en: '@samenvvvEN',
  }

  return {
    titleTemplate: titleTemplate[locale],
    description: description[locale],
    openGraph: {
      type: 'website',
      description: description[locale],
      locale: locale,
      url: 'https://samenvvv.nl',
      site_name: 'samenvvv',
      images: [
        {
          url: process.env.NEXT_PUBLIC_SITE_URL + '/images/seo-default.jpeg',
          width: 500,
          height: 1500,
          alt: title,
          type: 'image/jpeg',
          secureUrl:
            process.env.NEXT_PUBLIC_SITE_URL + '/images/seo-default.jpeg',
        },
      ],
    },
    twitter: {
      handle: twitter[locale],
      site: twitter[locale],
      cardType: 'summary_large_image',
    },
  }
}
