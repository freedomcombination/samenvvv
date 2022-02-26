import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetCompetitionsQueryVariables = {
  locale: CommonLocale
}

export type GetCompetitionsQuery = {
  __typename?: 'Query'
  competitions?: {
    __typename?: 'CompetitionEntityResponseCollection'
    data: Array<{
      __typename?: 'CompetitionEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Competition'
        slug: string
        title: string
        content: string
        date: any
        date_end?: any | null
        locale?: string | null
        image: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              size: number
              mime: string
              width?: number | null
              height?: number | null
            } | null
          } | null
        }
        localizations?: {
          __typename?: 'CompetitionRelationResponseCollection'
          data: Array<{
            __typename?: 'CompetitionEntity'
            attributes?: {
              __typename?: 'Competition'
              slug: string
              locale?: string | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export const GetCompetitionsDocument = gql`
  query getCompetitions($locale: I18NLocaleCode!) {
    competitions(locale: $locale) {
      data {
        id
        attributes {
          slug
          title
          content
          image {
            data {
              attributes {
                url
                size
                mime
                width
                height
              }
            }
          }
          date
          date_end
          locale
          localizations {
            data {
              attributes {
                slug
                locale
              }
            }
          }
        }
      }
    }
  }
`

export const getCompetitions = async (
  variables: GetCompetitionsQueryVariables,
) =>
  fetcher<GetCompetitionsQuery, GetCompetitionsQueryVariables>(
    GetCompetitionsDocument,
    variables,
  )

export const useGetCompetitionsQuery = <
  TData = GetCompetitionsQuery,
  TError = unknown,
>(
  variables: GetCompetitionsQueryVariables,
) =>
  useQuery<GetCompetitionsQuery, TError, TData>(
    ['getCompetitions', variables],
    () => getCompetitions(variables),
  )
