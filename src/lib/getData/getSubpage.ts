import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

import { getLocalizedSubpageSlugs } from '../getLocalizedSlugs'

export type GetSubpageQuery = { subpages?: ISubpage[] }

export const GET_SUBPAGE = gql`
  query getSubpages(
    $locale: String!
    $slug: String
    $type: String
    $sort: String
    $limit: Int
  ) {
    subpages(
      locale: $locale
      sort: $sort
      limit: $limit
      where: { slug: $slug, type: $type }
    ) {
      id
      slug
      title
      content
      start
      end
      type
      views
      image {
        url
        size
        mime
        width
        height
      }
      locale
      page {
        slug
        subpages {
          slug
          title
          content
          start
          end
          type
          image {
            url
          }
          start
          end
          locale
        }
        type
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

export const getSubpages = async ({
  locale,
  type,
  sort,
  limit,
}: BaseVariables): Promise<ISubpage[] | null> => {
  const data = await graphQLClient.request<GetSubpageQuery, BaseVariables>(
    GET_SUBPAGE,
    {
      locale,
      type,
      sort: sort || 'start:desc',
      limit,
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

export const useSubpagesQuery = (
  args: BaseVariables,
): UseQueryResult<ISubpage[]> => {
  const { locale, type, sort, limit } = args
  return useQuery({
    queryKey: ['subpages', [locale, type, sort || 'start:desc', limit ?? 5]],
    queryFn: () => getSubpages(args),
  })
}
