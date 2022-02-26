import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { getRoute } from '@utils'

import { fetcher } from '../graphql-client'

export type GetLatestHashtagQueryVariables = {
  locale: CommonLocale
}

export type GetLatestHashtagQuery = {
  __typename?: 'Query'
  hashtags?: {
    __typename?: 'HashtagEntityResponseCollection'
    data: Array<{
      __typename?: 'HashtagEntity'
      attributes?: {
        __typename?: 'Hashtag'
        slug: string
        date: any
        locale?: string | null
      } | null
    }>
  } | null
}

export const GetLatestHashtagDocument = gql`
  query getLatestHashtag($locale: I18NLocaleCode!) {
    hashtags(
      locale: $locale
      sort: "date:desc"
      pagination: { start: 0, limit: 1 }
    ) {
      data {
        attributes {
          slug
          date
          locale
        }
      }
    }
  }
`

export const getHashtagLatest = async (
  variables: GetLatestHashtagQueryVariables,
) => {
  const data = await fetcher<
    GetLatestHashtagQuery,
    GetLatestHashtagQueryVariables
  >(GetLatestHashtagDocument, variables)

  const hashtagData = data.hashtags?.data?.[0]?.attributes

  const hashtag = {
    ...hashtagData,
    link: `${getRoute('hashtag', hashtagData?.locale as CommonLocale)}/${
      hashtagData?.slug
    }`,
  }

  return hashtag
}

export const useGetLatestHashtagQuery = <
  TData = GetLatestHashtagQuery,
  TError = unknown,
>(
  variables: GetLatestHashtagQueryVariables,
) =>
  useQuery<Partial<Hashtag> & { link: string }, TError, TData>(
    ['getLatestHashtag', variables],
    () => getHashtagLatest(variables),
  )
