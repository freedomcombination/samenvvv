import { request } from '../request'

export const getAnnouncements = async (locale: StrapiLocale) =>
  await request<Announcement[]>({
    url: 'api/announcements',
    locale,
  })
