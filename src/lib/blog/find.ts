import { request } from '../request'

export const getBlog = async (locale: StrapiLocale, slug: string) => {
  const response = await request<Blog[]>({
    url: 'api/blogs',
    filters: { slug: { $eq: slug } },
    locale,
  })

  return response.result?.[0] || null
}
