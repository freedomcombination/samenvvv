const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['nl', 'tr', 'en'],
    localePath: path.resolve('./public/locales'),
  },
}
