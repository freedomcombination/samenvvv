import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetPrivacyQueryVariables = {
  locale: CommonLocale
}

export type GetPrivacyQuery = {
  __typename?: 'Query'
  privacy?: {
    __typename?: 'PrivacyEntityResponse'
    data?: {
      __typename?: 'PrivacyEntity'
      attributes?: {
        __typename?: 'Privacy'
        slug?: string | null
        title?: string | null
        content: string
      } | null
    } | null
  } | null
}

export const GetPrivacyDocument = gql`
  query getPrivacy($locale: I18NLocaleCode!) {
    privacy(locale: $locale) {
      data {
        attributes {
          slug
          title
          content
        }
      }
    }
  }
`

export const getPrivacy = async (variables: GetPrivacyQueryVariables) =>
  fetcher<GetPrivacyQuery, GetPrivacyQueryVariables>(
    GetPrivacyDocument,
    variables,
  )

export const useGetPrivacyQuery = <
  TData = GetPrivacyQuery,
  TError = unknown,
>() => {
  const { locale } = useRouter()
  return useQuery<GetPrivacyQuery, TError, TData>(['getPrivacy', locale], () =>
    getPrivacy({ locale: locale as CommonLocale }),
  )
}
