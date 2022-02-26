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
      'api.samenvvv.nl',
      'samenvvv.nl',
      'media.istockphoto.com',
      'pbs.twimg.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/tr/duyurular',
        destination: '/tr/announcements',
        locale: false,
      },
      {
        source: '/nl/aankondigingen',
        destination: '/nl/announcements',
        locale: false,
      },
      {
        source: '/tr/duyurular/:path*',
        destination: '/tr/announcements/:path*',
        locale: false,
      },
      {
        source: '/nl/aankondigingen/:path*',
        destination: '/nl/announcements/:path*',
        locale: false,
      },
      {
        source: '/tr/hashtag-etkinlikleri',
        destination: '/tr/hashtag-events',
        locale: false,
      },
      {
        source: '/nl/hashtag-evenementen',
        destination: '/nl/hashtag-events',
        locale: false,
      },
      {
        source: '/tr/hashtag-etkinlikleri/:path*',
        destination: '/tr/hashtag-events/:path*',
        locale: false,
      },
      {
        source: '/nl/hashtag-evenementen/:path*',
        destination: '/nl/hashtag-events/:path*',
        locale: false,
      },
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
    ]
  },
}
