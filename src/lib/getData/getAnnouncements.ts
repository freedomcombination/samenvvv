import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetAnnouncementsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
  sort?: InputMaybe<
    Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>
  >
  limit?: InputMaybe<Scalars['Int']>
}>

export type GetAnnouncementsQuery = {
  __typename?: 'Query'
  announcements?: {
    __typename?: 'AnnouncementEntityResponseCollection'
    data: Array<{
      __typename?: 'AnnouncementEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Announcement'
        slug: string
        title: string
        content: string
        date: any
        date_end?: any | null
        views?: number | null
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
          __typename?: 'AnnouncementRelationResponseCollection'
          data: Array<{
            __typename?: 'AnnouncementEntity'
            attributes?: {
              __typename?: 'Announcement'
              slug: string
              locale?: string | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export const GetAnnouncementsDocument = gql`
  query getAnnouncements(
    $locale: I18NLocaleCode!
    $sort: [String]
    $limit: Int
  ) {
    announcements(
      locale: $locale
      sort: $sort
      pagination: { start: 0, limit: $limit }
    ) {
      data {
        id
        attributes {
          slug
          title
          content
          date
          date_end
          views
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

export const getAnnouncements = async (
  variables: GetAnnouncementsQueryVariables,
) =>
  fetcher<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>(
    GetAnnouncementsDocument,
    variables,
  )

export const useGetAnnouncementsQuery = <
  TData = GetAnnouncementsQuery,
  TError = unknown,
>(
  variables: GetAnnouncementsQueryVariables,
) =>
  useQuery<GetAnnouncementsQuery, TError, TData>(
    ['getAnnouncements', variables],
    () => getAnnouncements(variables),
  )
