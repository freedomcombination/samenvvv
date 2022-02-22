import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

export type GetPageTypeQuery = { pages?: IPage[] }

export const GET_PAGE_TYPE = gql`
  query getPageType($locale: String!, $slug: String) {
    pages(locale: $locale, where: { slug: $slug }) {
      type
    }
  }
`

export const getPageType = async (
  locale: CommonLocale,
  slug: string,
): Promise<Page_Type | null> => {
  const data = await graphQLClient.request<GetPageTypeQuery, BaseVariables>(
    GET_PAGE_TYPE,
    {
      locale,
      slug,
    },
  )

  const page = data.pages?.[0]

  if (!page) return null

  return page.type as Page_Type
}

export const usePageTypeQuery = (
  locale: CommonLocale,
  slug: string,
): UseQueryResult<GetPageTypeQuery> =>
  useQuery({
    queryKey: ['pages', [locale, slug]],
    queryFn: () => getPageType(locale, slug),
  })
