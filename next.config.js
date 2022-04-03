const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  images: {
    loader: 'default',
    domains: [
      'localhost',
      '127.0.0.1',
      'picsum.photos',
      'images.unsplash.com',
      'admin.samenvvv.nl',
      'samenvvv.nl',
      'media.istockphoto.com',
      'pbs.twimg.com',
      'api.samenvvv.nl',
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/tr/hakkimizda',
          destination: '/tr/about-us',
          locale: false,
        },
        {
          source: '/nl/over-ons',
          destination: '/nl/about-us',
          locale: false,
        },
        {
          source: '/tr/kulup',
          destination: '/tr/club',
          locale: false,
        },
        {
          source: '/tr/gizlilik',
          destination: '/tr/privacy',
          locale: false,
        },
        {
          source: '/tr/kullanim-sartlari',
          destination: '/tr/terms',
          locale: false,
        },
        {
          source: '/nl/voorwaarden',
          destination: '/nl/terms',
          locale: false,
        },
        {
          source: '/tr/iletisim',
          destination: '/tr/contact',
          locale: false,
        },
        // Announcements
        {
          source: '/tr/duyurular',
          destination: '/en/announcements',
          locale: false,
        },
        {
          source: '/nl/aankondigingen',
          destination: '/en/announcements',
          locale: false,
        },
        {
          source: '/tr/duyurular/:slug',
          destination: '/tr/announcements/:slug',
          locale: false,
        },
        {
          source: '/nl/aankondigingen/:slug',
          destination: '/nl/announcements/:slug',
          locale: false,
        },
        // Hashtag Events
        {
          source: '/tr/hashtag-etkinlikleri',
          destination: '/en/hashtag-events',
          locale: false,
        },
        {
          source: '/nl/hashtag-evenementen',
          destination: '/en/hashtag-events',
          locale: false,
        },
        {
          source: '/tr/hashtag-etkinlikleri/:slug*',
          destination: '/tr/hashtag-events/:slug*',
          locale: false,
        },
        {
          source: '/nl/hashtag-evenementen/:slug*',
          destination: '/nl/hashtag-events/:slug*',
          locale: false,
        },
      ],
    }
  },
}
