import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

export type GetTermsQuery = { term?: IStaticPage }

export const GET_TERMS_PAGE = gql`
  query getTerms($locale: String!) {
    term(locale: $locale) {
      slug
      title
      content
    }
  }
`

export const getTermsPage = async (
  locale: CommonLocale,
): Promise<IStaticPage | null> => {
  const data = await graphQLClient.request<GetTermsQuery, BaseVariables>(
    GET_TERMS_PAGE,
    {
      locale,
    },
  )
  return data.term ?? null
}
