import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

import { getLocalizedSubpageSlugs } from '../getLocalizedSlugs'

export type GetHashtagsQuery = { hashtags?: IHashtag[] }

export const GET_HASHTAG = gql`
  query ($locale: String!, $slug: String) {
    hashtags(locale: $locale, sort: "date:desc", where: { slug: $slug }) {
      id
      slug
      title
      content
      date
      tweets
      image {
        url
        size
        mime
        width
        height
      }
      locale
      page {
        slug
      }
      localizations {
        slug
        locale
        page {
          slug
        }
      }
    }
  }
`

export const getHashtag = async (
  locale: CommonLocale,
  slug: string,
): Promise<IHashtag | null> => {
  const data = await graphQLClient.request<GetHashtagsQuery, BaseVariables>(
    GET_HASHTAG,
    {
      locale,
      slug,
    },
  )

  const hashtags = data?.hashtags?.[0]

  if (!hashtags) return null

  const slugs = getLocalizedSubpageSlugs(hashtags)

  return { ...hashtags, slugs }
}

export const getHashtags = async (
  locale: CommonLocale,
): Promise<IHashtag[] | null> => {
  const data = await graphQLClient.request<GetHashtagsQuery, BaseVariables>(
    GET_HASHTAG,
    {
      locale,
    },
  )

  return data.hashtags ?? null
}

export const useHashtagQuery = (
  locale: CommonLocale,
  slug: string,
): UseQueryResult<IHashtag> =>
  useQuery({
    queryKey: ['hashtags', [locale, slug]],
    queryFn: () => getHashtag(locale, slug),
  })

export const useHashtagsQuery = (
  locale: CommonLocale,
): UseQueryResult<IHashtag[]> =>
  useQuery({
    queryKey: ['hashtags', [locale]],
    queryFn: () => getHashtags(locale),
  })
