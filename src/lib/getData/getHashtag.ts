import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

import { getLocalizedSubpageSlugs } from '../getLocalizedSlugs'

export type GetHashtagQuery = { hashtags?: IHashtag[] }

export const GET_HASHTAG = gql`
  query getHashtags($locale: String!, $slug: String) {
    hashtags(locale: $locale, where: { slug: $slug }) {
      id
      slug
      title
      content
      hashtag
      image {
        url
      }
      date
      locale
      page {
        slug
      }
      metadata {
        metaTitle
        metaDescription
      }
      posts(limit: 10) {
        slug
        text
        image {
          url
        }
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
  locale: string,
  slug: string,
): Promise<IHashtag | null> => {
  const data = await graphQLClient.request<GetHashtagQuery, BaseVariables>(
    GET_HASHTAG,
    {
      locale,
      slug,
    },
  )

  const hashtag = data.hashtags?.[0]

  if (!hashtag) return null

  const slugs = getLocalizedSubpageSlugs(hashtag as unknown as ISubpage)

  return { ...hashtag, slugs }
}

export const getHashtags = async (
  locale: string,
): Promise<IHashtag[] | null> => {
  const data = await graphQLClient.request<GetHashtagQuery, { locale: string }>(
    GET_HASHTAG,
    {
      locale,
    },
  )

  return data.hashtags ?? null
}

export const useHashtagQuery = (
  locale: string,
  slug: string,
): UseQueryResult<GetHashtagQuery> =>
  useQuery({
    queryKey: ['hashtags', [locale, slug]],
    queryFn: () => getHashtag(locale, slug),
  })

export const useHashtagsQuery = (
  locale: string,
): UseQueryResult<GetHashtagQuery> =>
  useQuery({
    queryKey: ['hashtags', [locale]],
    queryFn: () => getHashtags(locale),
  })
