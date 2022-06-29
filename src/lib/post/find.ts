import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'

import { request } from '../request'

export const getPost = async (locale: StrapiLocale, id: string) => {
  const response = await request<Post>({
    url: `api/posts/${id}`,
    locale,
  })

  return response.result || null
}

export const usePost = (id: string) => {
  const { locale } = useRouter()

  const postQuery = useQuery({
    queryKey: ['post', locale, id],
    queryFn: () => getPost(locale as StrapiLocale, id),
  })

  if (id) return postQuery
}

export const useRandomPost = () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()
  return queryClient.getQueryData<Post>(['post', locale, slug])
}
