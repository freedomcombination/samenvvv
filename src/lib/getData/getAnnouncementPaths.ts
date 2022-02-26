import { gql } from 'graphql-request'

import { fetcher } from '../graphql-client'

export type GetAnnouncementPathsQuery = {
  __typename?: 'Query'
  announcements?: {
    __typename?: 'AnnouncementEntityResponseCollection'
    data: Array<{
      __typename?: 'AnnouncementEntity'
      attributes?: {
        __typename?: 'Announcement'
        slug: string
        locale?: string | null
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

export const GetAnnouncementPathsDocument = gql`
  query getAnnouncementPaths {
    announcements {
      data {
        attributes {
          slug
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

const announcementsToParams = (
  announcements: GetAnnouncementPathsQuery['announcements'],
) => {
  if (!announcements?.data)
    return [{ params: { slug: '' }, locale: 'en' as CommonLocale }]

  return announcements?.data.flatMap(({ attributes: announcement }) => {
    const localizations = announcement?.localizations?.data || [
      { attributes: null },
    ]

    return [
      {
        params: {
          slug: announcement?.slug || '',
        },
        locale: announcement?.locale as CommonLocale,
      },
      ...localizations.flatMap(({ attributes: announcement }) => [
        {
          params: {
            slug: announcement?.slug || '',
          },
          locale: announcement?.locale as CommonLocale,
        },
      ]),
    ]
  })
}

export const getAnnouncementPaths = async () => {
  const data = await fetcher<GetAnnouncementPathsQuery, null>(
    GetAnnouncementPathsDocument,
  )

  return announcementsToParams(data.announcements)
}
