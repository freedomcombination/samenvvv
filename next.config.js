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
}
