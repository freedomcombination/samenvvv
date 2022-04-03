import { request } from '../request'

export const getPost = async (locale: StrapiLocale, id: string) => {
  const response = await request<Post>({
    url: `api/posts/${id}`,
    locale,
  })

  return response.result || null
}
