import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

type PathsType = {
  params: { slug: string[] }
  locale: string
}

type PagePathQuery = {
  slug: string
  locale: string
  localizations: PagePathQuery[]
}

type SubpagePathQuery = {
  slug: string
  locale: string
  page: { slug: string }
  localizations: SubpagePathQuery[]
}

type ChildpagePathQuery = {
  slug: string
  locale: string
  subpage: { slug: string; page: { slug: string } }
  localizations: ChildpagePathQuery[]
}

type GetPathsQuery = {
  pages: PagePathQuery[]
  subpages: SubpagePathQuery[]
  competitions: SubpagePathQuery[]
  hashtags: SubpagePathQuery[]
  applications: ChildpagePathQuery[]
  hashtagPosts: ChildpagePathQuery[]
}

const GET_ALL_DATA = gql`
  query getAllData {
    pages {
      slug
      locale
      localizations {
        slug
        locale
      }
    }
    subpages {
      slug
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
    competitions {
      slug
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
    applications {
      slug
      locale
      subpage: competition {
        slug
        page {
          slug
        }
      }
      localizations {
        slug
        locale
        subpage: competition {
          slug
          page {
            slug
          }
        }
      }
    }
    hashtags {
      slug
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
    hashtagPosts {
      slug
      locale
      subpage: hashtag {
        slug
        page {
          slug
        }
      }
      localizations {
        slug
        locale
        subpage: hashtag {
          slug
          page {
            slug
          }
        }
      }
    }
  }
`

const pagesToParams = (pages: PagePathQuery[]) =>
  pages.flatMap(page => [
    { params: { slug: [page.slug, '', ''] }, locale: page.locale },
    ...page.localizations.flatMap(page => [
      { params: { slug: [page.slug, '', ''] }, locale: page.locale },
    ]),
  ])

const subpagesToParams = (subpages: SubpagePathQuery[]) =>
  subpages.flatMap(subpage => [
    {
      params: { slug: [subpage.page.slug, subpage.slug, ''] },
      locale: subpage.locale,
    },
    ...subpage.localizations.flatMap(subpage => [
      {
        params: { slug: [subpage.page.slug, subpage.slug, ''] },
        locale: subpage.locale,
      },
    ]),
  ])

const childpagesToParams = (applications: ChildpagePathQuery[]) =>
  applications.flatMap(application => [
    {
      params: {
        slug: [
          application.subpage.page.slug,
          application.subpage.slug,
          application.slug,
        ],
      },
      locale: application.locale,
    },
    ...application.localizations.flatMap(application => [
      {
        params: {
          slug: [
            application.subpage.page.slug,
            application.subpage.slug,
            application.slug,
          ],
        },
        locale: application.locale,
      },
    ]),
  ])

export const getAllPagePaths = async (): Promise<PathsType[]> => {
  const data = await graphQLClient.request<GetPathsQuery>(GET_ALL_DATA)

  const pages = pagesToParams(data.pages)
  const subpages = subpagesToParams(data.subpages)
  const competitions = subpagesToParams(data.competitions)
  const hashtags = subpagesToParams(data.hashtags)
  const applications = childpagesToParams(data.applications)
  const hashtagPosts = childpagesToParams(data.hashtagPosts)

  return [
    ...pages,
    ...subpages,
    ...competitions,
    ...hashtags,
    ...applications,
    ...hashtagPosts,
  ]
}
