const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  images: {
    domains: ['localhost', '127.0.0.1', 'picsum.photos'],
  },
  async rewrites() {
    return [
      {
        source: '/tr/hakkimizda',
        destination: '/tr/over-ons',
        locale: false,
      },
      {
        source: '/en/about-us',
        destination: '/en/over-ons',
        locale: false,
      },
      {
        source: '/tr/kulup',
        destination: '/tr/club',
        locale: false,
      },
    ]
  },
}
