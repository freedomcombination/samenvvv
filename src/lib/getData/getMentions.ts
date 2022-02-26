import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetMentionsDataQueryVariables = {
  locale: CommonLocale
}

export type GetMentionsDataQuery = {
  __typename?: 'Query'
  mentions?: {
    __typename?: 'MentionEntityResponseCollection'
    data: Array<{
      __typename?: 'MentionEntity'
      attributes?: {
        __typename?: 'Mention'
        username: string
        data?: any | null
        category?: string | null
      } | null
    }>
  } | null
}

export const GetMentionsDataDocument = gql`
  query getMentionsData($locale: I18NLocaleCode) {
    mentions(locale: $locale) {
      data {
        attributes {
          username
          data
          category
        }
      }
    }
  }
`

export const getMentions = async (variables?: GetMentionsDataQueryVariables) =>
  fetcher<GetMentionsDataQuery, GetMentionsDataQueryVariables>(
    GetMentionsDataDocument,
    variables,
  )

export const useGetMentionsDataQuery = <
  TData = GetMentionsDataQuery,
  TError = unknown,
>() => {
  const { locale } = useRouter()
  return useQuery<GetMentionsDataQuery, TError, TData>(
    ['getMentionsData', locale],
    () => getMentions({ locale: locale as CommonLocale }),
  )
}
