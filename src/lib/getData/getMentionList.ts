import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

interface IMention {
  username: string
  user_data: ITweetUserData
  country: string
  category: string
}

export const GET_MENTION_LIST = gql`
  query getMentions {
    mentions {
      username
      user_data
      country
      category
    }
  }
`

export const getMentionList = async (): Promise<IMention[]> => {
  const data = await graphQLClient.request<{ mentions: IMention[] }>(
    GET_MENTION_LIST,
  )

  return data.mentions
}

export const useMentionList = (): UseQueryResult<IMention[]> =>
  useQuery('mention-list', getMentionList)
