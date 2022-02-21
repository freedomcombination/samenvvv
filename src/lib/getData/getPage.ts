import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

import { getLocalizedPageSlugs } from '../getLocalizedSlugs'

export type GetPageQuery = { pages?: IPage[] }

export const GET_PAGE = gql`
  query ($locale: String!, $slug: String) {
    pages(locale: $locale, where: { slug: $slug }) {
      id
      slug
      title
      content
      locale
      image {
        url
        size
        mime
        width
        height
      }
      type
      subpages(sort: "start:desc") {
        slug
        title
        start
        end
        image {
          url
          size
          mime
          width
          height
        }
        content
        page {
          slug
        }
      }
      competitions(sort: "start:desc") {
        slug
        title
        start
        end
        image {
          url
          size
          mime
          width
          height
        }
        content
        page {
          slug
        }
      }
      hashtags(sort: "date:desc") {
        slug
        title
        date
        image {
          url
          size
          mime
          width
          height
        }
        posts {
          slug
          text
          image {
            url
            size
            mime
            width
            height
          }
        }
        content
        page {
          slug
        }
      }
      localizations {
        slug
        locale
      }
    }
  }
`

export const getPage = async (
  locale: CommonLocale,
  slug: string,
): Promise<IPage | null> => {
  const data = await graphQLClient.request<GetPageQuery, BaseVariables>(
    GET_PAGE,
    {
      locale,
      slug,
    },
  )
  const page = data.pages?.[0]

  if (!page) return null

  const slugs = getLocalizedPageSlugs(page)

  return { ...page, slugs }
}

export const usePageQuery = (
  locale: CommonLocale,
  slug: string,
): UseQueryResult<GetPageQuery> =>
  useQuery({
    queryKey: ['pages', [locale, slug]],
    queryFn: () => getPage(locale, slug),
  })
