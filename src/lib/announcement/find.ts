import { request } from '../request'

export const getAnnouncement = async (locale: StrapiLocale, slug: string) => {
  const response = await request<Announcement[]>({
    url: 'api/announcements',
    filters: { slug: { $eq: slug } },
    locale,
  })

  return response.result?.[0] || null
}
