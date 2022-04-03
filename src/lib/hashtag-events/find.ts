import { request } from '../request'

export const getHashtag = async (locale: StrapiLocale, slug: string) => {
  const response = await request<Hashtag[]>({
    url: 'api/hashtags',
    filters: { slug: { $eq: slug } },
    locale,
    populate: ['image', 'posts.image'],
  })

  return response.result?.[0] || null
}
