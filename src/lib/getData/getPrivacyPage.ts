import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

export type GetPrivacyQuery = { privacy?: IStaticPage }

export const GET_PRIVACY_PAGE = gql`
  query getPrivacy($locale: String!) {
    privacy(locale: $locale) {
      slug
      title
      content
    }
  }
`

export const getPrivacyPage = async (
  locale: CommonLocale,
): Promise<IStaticPage | null> => {
  const data = await graphQLClient.request<GetPrivacyQuery, BaseVariables>(
    GET_PRIVACY_PAGE,
    {
      locale,
    },
  )

  return data.privacy ?? null
}
