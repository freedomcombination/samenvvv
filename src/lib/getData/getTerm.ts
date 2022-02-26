import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetTermQueryVariables = {
  locale: CommonLocale
}

export type GetTermQuery = {
  __typename?: 'Query'
  term?: {
    __typename?: 'TermEntityResponse'
    data?: {
      __typename?: 'TermEntity'
      attributes?: {
        __typename?: 'Term'
        slug?: string | null
        title?: string | null
        content: string
      } | null
    } | null
  } | null
}

export const GetTermDocument = gql`
  query getTerm($locale: I18NLocaleCode!) {
    term(locale: $locale) {
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

export const getTerm = async (variables: GetTermQueryVariables) =>
  fetcher<GetTermQuery, GetTermQueryVariables>(GetTermDocument, variables)

export const useGetTermQuery = <TData = GetTermQuery, TError = unknown>() => {
  const { locale } = useRouter()
  return useQuery<GetTermQuery, TError, TData>(['getTerm', locale], () =>
    getTerm({ locale: locale as CommonLocale }),
  )
}
