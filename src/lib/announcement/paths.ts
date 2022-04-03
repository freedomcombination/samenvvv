import { request } from '../request'

export const getAnnouncementPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await request<Announcement[]>({
          url: 'api/announcements',
          locale,
        })
        const announcements = responses?.result as Announcement[]
        return announcements.map(({ slug }) => ({
          params: { slug },
          locale,
        }))
      }),
    )
  ).flat()
