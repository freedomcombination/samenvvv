import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetApplicationQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
  slug?: InputMaybe<Scalars['String']>
}>

export type GetApplicationQuery = {
  __typename?: 'Query'
  applications?: {
    __typename?: 'ApplicationEntityResponseCollection'
    data: Array<{
      __typename?: 'ApplicationEntity'
      attributes?: {
        __typename?: 'Application'
        title: string
        slug: string
        content: string
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
        applicant?: {
          __typename?: 'UsersPermissionsUserEntityResponse'
          data?: {
            __typename?: 'UsersPermissionsUserEntity'
            attributes?: {
              __typename?: 'UsersPermissionsUser'
              fullname?: string | null
              username: string
              avatar?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: { __typename?: 'UploadFile'; url: string } | null
                } | null
              } | null
            } | null
          } | null
        } | null
        votes?: {
          __typename?: 'VoteRelationResponseCollection'
          data: Array<{
            __typename?: 'VoteEntity'
            attributes?: { __typename?: 'Vote'; value: number } | null
          }>
        } | null
        competition?: {
          __typename?: 'CompetitionEntityResponse'
          data?: {
            __typename?: 'CompetitionEntity'
            attributes?: { __typename?: 'Competition'; slug: string } | null
          } | null
        } | null
        localizations?: {
          __typename?: 'ApplicationRelationResponseCollection'
          data: Array<{
            __typename?: 'ApplicationEntity'
            attributes?: {
              __typename?: 'Application'
              slug: string
              locale?: string | null
              competition?: {
                __typename?: 'CompetitionEntityResponse'
                data?: {
                  __typename?: 'CompetitionEntity'
                  attributes?: {
                    __typename?: 'Competition'
                    slug: string
                  } | null
                } | null
              } | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export const GetApplicationDocument = gql`
  query getApplication($locale: I18NLocaleCode!, $slug: String) {
    applications(locale: $locale, filters: { slug: { eq: $slug } }) {
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
          locale
          applicant {
            data {
              attributes {
                fullname
                username
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
          votes {
            data {
              attributes {
                value
              }
            }
          }
          competition {
            data {
              attributes {
                slug
              }
            }
          }
          localizations {
            data {
              attributes {
                slug
                locale
                competition {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const getApplication = async (variables: GetApplicationQueryVariables) =>
  fetcher<GetApplicationQuery, GetApplicationQueryVariables>(
    GetApplicationDocument,
    variables,
  )

export const useGetApplicationQuery = <
  TData = GetApplicationQuery,
  TError = unknown,
>(
  variables: GetApplicationQueryVariables,
) =>
  useQuery<GetApplicationQuery, TError, TData>(
    ['getApplication', variables],
    () => getApplication(variables),
  )
