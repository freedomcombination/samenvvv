import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

import { getLocalizedPageSlugs } from '../getLocalizedSlugs'

export type GetPageQuery = { pages?: IPage[] }

export const GET_PAGE = gql`
  query getPages($locale: String!, $slug: String) {
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
      subpages(limit: 10) {
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
      competitions(limit: 10) {
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
      hashtags(limit: 10) {
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
  locale: string,
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
  locale: string,
  slug: string,
): UseQueryResult<GetPageQuery> =>
  useQuery({
    queryKey: ['pages', [locale, slug]],
    queryFn: () => getPage(locale, slug),
  })
