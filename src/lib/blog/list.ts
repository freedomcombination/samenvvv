import { request } from '../request'

export const getBlogs = async (locale: StrapiLocale) =>
  await request<Blog[]>({
    url: 'api/blogs',
    locale,
    sort: ['publishedAt:desc'],
  })
