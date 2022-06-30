import { useMemo } from 'react'

import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'

import { request } from '../request'

export const getPost = async (locale: StrapiLocale, id: number) => {
  const response = await request<Post>({
    url: `api/posts/${id}`,
    locale,
  })

  return response.result || null
}

export const usePost = (id: number) => {
  const { locale } = useRouter()

  const postQuery = useQuery({
    queryKey: ['post', locale, id],
    queryFn: () => getPost(locale as StrapiLocale, id),
  })

  if (id) return postQuery
}

export const useCurrentPost = () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  const queryKey = ['post', locale, slug]

  const { data } = useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData<Post>(queryKey),
  })

  return useMemo(() => data, [data])
}
