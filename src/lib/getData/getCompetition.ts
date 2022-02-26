import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetCompetitionQueryVariables = {
  locale: CommonLocale
  slug: string
}

export type GetCompetitionQuery = {
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
        applications?: {
          __typename?: 'ApplicationRelationResponseCollection'
          data: Array<{
            __typename?: 'ApplicationEntity'
            attributes?: {
              __typename?: 'Application'
              title: string
              slug: string
              content: string
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
              applicant?: {
                __typename?: 'UsersPermissionsUserEntityResponse'
                data?: {
                  __typename?: 'UsersPermissionsUserEntity'
                  attributes?: {
                    __typename?: 'UsersPermissionsUser'
                    username: string
                    fullname?: string | null
                    avatar?: {
                      __typename?: 'UploadFileEntityResponse'
                      data?: {
                        __typename?: 'UploadFileEntity'
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          }>
        } | null
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

export const GetCompetitionDocument = gql`
  query getCompetition($locale: I18NLocaleCode!, $slug: String) {
    competitions(locale: $locale, filters: { slug: { eq: $slug } }) {
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
          applications(pagination: { start: 0, limit: 10 }) {
            data {
              attributes {
                title
                slug
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
                applicant {
                  data {
                    attributes {
                      username
                      fullname
                      avatar {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
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

export const getCompetition = (variables: GetCompetitionQueryVariables) =>
  fetcher<GetCompetitionQuery, GetCompetitionQueryVariables>(
    GetCompetitionDocument,
    variables,
  )

export const useGetCompetitionQuery = async <
  TData = GetCompetitionQuery,
  TError = unknown,
>(
  variables: GetCompetitionQueryVariables,
) =>
  useQuery<GetCompetitionQuery, TError, TData>(
    ['getCompetition', variables],
    () => getCompetition(variables),
  )
