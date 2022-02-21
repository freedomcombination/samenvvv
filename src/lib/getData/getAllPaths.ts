import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

type PathsType = {
  params: { slug: string[] }
  locale: CommonLocale
}

type PagePathQuery = {
  slug: string
  locale: CommonLocale
  localizations: PagePathQuery[]
}

type SubpagePathQuery = {
  slug: string
  locale: CommonLocale
  page: { slug: string }
  localizations: SubpagePathQuery[]
}

type ChildpagePathQuery = {
  slug: string
  locale: CommonLocale
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
    { params: { slug: [page.slug || '', '', ''] }, locale: page.locale },
    ...page.localizations
      .filter(page => page?.slug)
      .flatMap(page => [
        { params: { slug: [page.slug || '', '', ''] }, locale: page.locale },
      ]),
  ])

const subpagesToParams = (subpages: SubpagePathQuery[]) =>
  subpages.flatMap(subpage => [
    {
      params: { slug: [subpage.page.slug || '', subpage.slug || '', ''] },
      locale: subpage.locale,
    },
    ...subpage.localizations
      .filter(subpage => subpage?.page?.slug)
      .flatMap(subpage => [
        {
          params: {
            slug: [subpage.page.slug || '', subpage.slug || '', ''],
          },
          locale: subpage.locale,
        },
      ]),
  ])

const childpagesToParams = (childpages: ChildpagePathQuery[]) =>
  childpages.flatMap(childpage => [
    {
      params: {
        slug: [
          childpage.subpage.page.slug || '',
          childpage.subpage.slug || '',
          childpage.slug || '',
        ],
      },
      locale: childpage.locale,
    },
    ...childpage.localizations
      .filter(childpage => childpage?.subpage?.page?.slug)
      .flatMap(childpage => [
        {
          params: {
            slug: [
              childpage.subpage.page.slug || '',
              childpage.subpage.slug || '',
              childpage.slug || '',
            ],
          },
          locale: childpage.locale,
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
