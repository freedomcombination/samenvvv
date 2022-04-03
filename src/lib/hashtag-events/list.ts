import { request } from '../request'

export const getHashtags = async (
  locale: StrapiLocale,
  populate?: string[],
) => {
  const response = await request<Hashtag[]>({
    url: 'api/hashtags',
    locale,
    populate: populate || ['image'],
    sort: ['date:desc'],
  })

  return response.result || []
}
