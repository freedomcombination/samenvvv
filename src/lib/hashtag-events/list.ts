import { request } from '../request'

export const getHashtags = async (
  locale: StrapiLocale,
  populate?: string | string[],
  pageSize?: number,
) => {
  const response = await request<Hashtag[]>({
    url: 'api/hashtags',
    locale,
    populate: populate || ['image'],
    sort: ['date:desc'],
    pageSize,
  })

  return response.result || []
}
