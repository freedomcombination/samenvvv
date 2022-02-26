import { gql } from 'graphql-request'

import { getRoute } from '@utils'

import { fetcher } from '../graphql-client'

export type GetAllDataQuery = {
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
  competitions?: {
    __typename?: 'CompetitionEntityResponseCollection'
    data: Array<{
      __typename?: 'CompetitionEntity'
      attributes?: {
        __typename?: 'Competition'
        slug: string
        locale?: string | null
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
  applications?: {
    __typename?: 'ApplicationEntityResponseCollection'
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
  hashtags?: {
    __typename?: 'HashtagEntityResponseCollection'
    data: Array<{
      __typename?: 'HashtagEntity'
      attributes?: {
        __typename?: 'Hashtag'
        slug: string
        locale?: string | null
        localizations?: {
          __typename?: 'HashtagRelationResponseCollection'
          data: Array<{
            __typename?: 'HashtagEntity'
            attributes?: {
              __typename?: 'Hashtag'
              slug: string
              locale?: string | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
  hashtagPosts?: {
    __typename?: 'HashtagPostEntityResponseCollection'
    data: Array<{
      __typename?: 'HashtagPostEntity'
      attributes?: {
        __typename?: 'HashtagPost'
        slug: string
        locale?: string | null
        hashtag?: {
          __typename?: 'HashtagEntityResponse'
          data?: {
            __typename?: 'HashtagEntity'
            attributes?: { __typename?: 'Hashtag'; slug: string } | null
          } | null
        } | null
        localizations?: {
          __typename?: 'HashtagPostRelationResponseCollection'
          data: Array<{
            __typename?: 'HashtagPostEntity'
            attributes?: {
              __typename?: 'HashtagPost'
              slug: string
              locale?: string | null
              hashtag?: {
                __typename?: 'HashtagEntityResponse'
                data?: {
                  __typename?: 'HashtagEntity'
                  attributes?: { __typename?: 'Hashtag'; slug: string } | null
                } | null
              } | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export const GetAllDataDocument = gql`
  query getAllData {
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
    competitions {
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
    applications {
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
    hashtags {
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
    hashtagPosts {
      data {
        attributes {
          slug
          locale
          hashtag {
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
                hashtag {
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

export const getAllData = async () =>
  fetcher<GetAllDataQuery, null>(GetAllDataDocument)

const announcementsToParams = (
  announcements: GetAllDataQuery['announcements'],
) => {
  return announcements?.data.flatMap(({ attributes: subpage }) => {
    const localizations = subpage?.localizations?.data || [{ attributes: null }]
    return [
      {
        params: {
          slug: [
            getRoute('announcement', subpage?.locale as CommonLocale) || '',
            subpage?.slug || '',
            '',
          ],
        },
        locale: subpage?.locale,
      },
      ...localizations.flatMap(({ attributes: announcement }) => [
        {
          params: {
            slug: announcement
              ? [
                  getRoute(
                    'announcement',
                    announcement.locale as CommonLocale,
                  ) || '',
                  (announcement.slug as string) || '',
                  '',
                ]
              : ['', '', ''],
          },
          locale: announcement?.locale as CommonLocale,
        },
      ]),
    ]
  })
}

const hashtagsToParams = (hashtags: GetAllDataQuery['hashtags']) => {
  return hashtags?.data.flatMap(({ attributes: hashtag }) => {
    const localizations = hashtag?.localizations?.data || [{ attributes: null }]
    return [
      {
        params: {
          slug: [
            getRoute('hashtag', hashtag?.locale as CommonLocale) || '',
            hashtag?.slug || '',
            '',
          ],
        },
        locale: hashtag?.locale,
      },
      ...localizations.flatMap(({ attributes: subpage }) => [
        {
          params: {
            slug: subpage
              ? [
                  getRoute('hashtag', subpage.locale as CommonLocale) || '',
                  (subpage.slug as string) || '',
                  '',
                ]
              : ['', '', ''],
          },
          locale: subpage?.locale as CommonLocale,
        },
      ]),
    ]
  })
}

const competitionsToParams = (
  competitions: GetAllDataQuery['competitions'],
) => {
  return competitions?.data.flatMap(({ attributes: competition }) => {
    const localizations = competition?.localizations?.data || [
      { attributes: null },
    ]
    return [
      {
        params: {
          slug: [
            getRoute('competition', competition?.locale as CommonLocale) || '',
            competition?.slug || '',
            '',
          ],
        },
        locale: competition?.locale,
      },
      ...localizations.flatMap(({ attributes: competition }) => [
        {
          params: {
            slug: competition
              ? [
                  getRoute('competition', competition.locale as CommonLocale) ||
                    '',
                  (competition.slug as string) || '',
                  '',
                ]
              : ['', '', ''],
          },
          locale: competition?.locale as CommonLocale,
        },
      ]),
    ]
  })
}

const hashtagPostToParams = (hashtagPosts: GetAllDataQuery['hashtagPosts']) =>
  hashtagPosts?.data.flatMap(({ attributes: post }) => {
    const localizations = post?.localizations?.data || [{ attributes: null }]
    return [
      {
        params: {
          slug: post
            ? [
                getRoute('hashtag', post.locale as CommonLocale) || '',
                post?.hashtag?.data?.attributes?.slug || '',
                post.slug || '',
              ]
            : ['', '', ''],
        },
        locale: post?.locale,
      },
      ...localizations.flatMap(({ attributes: post }) => [
        {
          params: {
            slug: post
              ? [
                  getRoute('hashtag', post.locale as CommonLocale) || '',
                  post?.hashtag?.data?.attributes?.slug || '',
                  post.slug || '',
                ]
              : ['', '', ''],
          },
          locale: post?.locale,
        },
      ]),
    ]
  })

const applicationsToParams = (applications: GetAllDataQuery['applications']) =>
  applications?.data.flatMap(({ attributes: application }) => {
    const localizations = application?.localizations?.data || [
      { attributes: null },
    ]
    return [
      {
        params: {
          slug: application
            ? [
                getRoute('competition', application.locale as CommonLocale) ||
                  '',
                application?.competition?.data?.attributes?.slug || '',
                application.slug || '',
              ]
            : ['', '', ''],
        },
        locale: application?.locale,
      },
      ...localizations.flatMap(({ attributes: application }) => [
        {
          params: {
            slug: application
              ? [
                  getRoute('competition', application.locale as CommonLocale) ||
                    '',
                  application?.competition?.data?.attributes?.slug || '',
                  application.slug || '',
                ]
              : ['', '', ''],
          },
          locale: application?.locale,
        },
      ]),
    ]
  })

export const getAllPagePaths = async (): Promise<any> => {
  const data = await fetcher<GetAllDataQuery, null>(GetAllDataDocument)

  const announcements = announcementsToParams(data.announcements)!
  const competitions = competitionsToParams(data.competitions)!
  const hashtags = hashtagsToParams(data.hashtags)!
  const applications = applicationsToParams(data.applications)!
  const hashtagPosts = hashtagPostToParams(data.hashtagPosts)!

  return [
    ...announcements,
    ...competitions,
    ...hashtags,
    ...applications,
    ...hashtagPosts,
  ]
}
