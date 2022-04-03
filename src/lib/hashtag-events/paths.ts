import { request } from '../request'

export const getHashtagPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await request<Hashtag[]>({
          url: 'api/hashtags',
          locale,
        })
        const hashtags = responses?.result as Hashtag[]
        return hashtags.map(({ slug }) => ({
          params: { slug },
          locale,
        }))
      }),
    )
  ).flat()
