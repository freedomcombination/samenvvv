import { addDays, isPast } from 'date-fns'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { request } from '../request'

export type HashtagReturnType = Hashtag & {
  hasPassed: boolean
  hasStarted: boolean
  defaultHashtags: string[]
}

export const getHashtag = async (
  locale: StrapiLocale,
  slug: string,
): Promise<HashtagReturnType | null> => {
  const response = await request<Hashtag[]>({
    url: 'api/hashtags',
    filters: { slug: { $eq: slug } },
    locale,
    populate: ['image', 'mentions', 'posts.image'],
  })

  const hashtag = response.result?.[0] || null

  if (!hashtag) return null

  const hasPassed = isPast(addDays(new Date(hashtag.date as string), 1))
  const hasStarted = isPast(new Date(hashtag.date as string))
  const defaultHashtags = [hashtag?.hashtag, hashtag?.hashtag_extra].filter(
    h => !!h,
  )

  const posts = hashtag?.posts
    .filter(p => p.image)
    .map(p => ({ ...p, hashtag }))

  return { ...hashtag, posts, hasPassed, hasStarted, defaultHashtags }
}

export const useHashtag = () => {
  const {
    locale,
    query: { slug },
  } = useRouter()

  return useQuery({
    queryKey: ['hashtag', locale, slug],
    queryFn: () => getHashtag(locale as StrapiLocale, slug as string),
  })
}
