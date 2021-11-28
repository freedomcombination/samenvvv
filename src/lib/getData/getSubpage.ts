import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

import { getLocalizedSubpageSlugs } from '../getLocalizedSlugs'

export type GetSubpageQuery = { subpages?: ISubpage[] }

export const GET_SUBPAGE = gql`
  query getSubpages($locale: String!, $slug: String) {
    subpages(locale: $locale, where: { slug: $slug }) {
      id
      slug
      title
      content
      image {
        url
      }
      type
      start
      end
      locale
      page {
        slug
        subpages {
          slug
          title
          content
          image {
            url
          }
          start
          end
          locale
        }
        popular: subpages(sort: "slug:desc", limit: 5) {
          slug
          title
          content
          image {
            url
          }
          start
          end
          locale
        }
      }
      metadata {
        metaTitle
        metaDescription
      }
      localizations {
        slug
        locale
        page {
          slug
        }
      }
    }
  }
`

export const getSubpage = async (
  locale: string,
  slug: string,
): Promise<ISubpage | null> => {
  const data = await graphQLClient.request<GetSubpageQuery, BaseVariables>(
    GET_SUBPAGE,
    {
      locale,
      slug,
    },
  )

  const subpage = data?.subpages?.[0]

  if (!subpage) return null

  const slugs = getLocalizedSubpageSlugs(subpage)

  return { ...subpage, slugs }
}

export const getSubpages = async (
  locale: string,
): Promise<ISubpage[] | null> => {
  const data = await graphQLClient.request<GetSubpageQuery, BaseVariables>(
    GET_SUBPAGE,
    {
      locale,
    },
  )

  return data.subpages ?? null
}

export const useSubpageQuery = (
  locale: string,
  slug: string,
): UseQueryResult<ISubpage> =>
  useQuery({
    queryKey: ['subpages', [locale, slug]],
    queryFn: () => getSubpage(locale, slug),
  })

export const useSubpagesQuery = (locale: string): UseQueryResult<ISubpage[]> =>
  useQuery({
    queryKey: ['subpages', [locale]],
    queryFn: () => getSubpages(locale),
  })
