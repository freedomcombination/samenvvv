import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

export const GET_TRENDS_LIST = gql`
  query getTrendsDataData {
    trend {
      en
      tr
      nl
      updated_at
    }
  }
`

export const getTrendsData = async (): Promise<ITrendsData> => {
  const result = await graphQLClient.request<{ trend: ITrendsData }>(
    GET_TRENDS_LIST,
  )

  return result.trend
}

export const useTrendsData = (): UseQueryResult<ITrendsData> => {
  return useQuery('trends-data', () => getTrendsData())
}

export const useFindHashtagInTrends = (hashtag?: string) => {
  const { data: trendsData } = useTrendsData()
  const { nl, tr, en } = trendsData ?? {}

  if (!hashtag || !nl || !tr || !en) return null

  const indexEn = en?.findIndex((trend: ITrends) => trend.name === hashtag)
  const indexNl = nl?.findIndex((trend: ITrends) => trend.name === hashtag)
  const indexTr = tr?.findIndex((trend: ITrends) => trend.name === hashtag)

  if (!indexEn || !indexNl || !indexTr) return null

  return {
    nl: { ...nl[indexNl], indexNl },
    tr: { ...tr[indexTr], indexTr },
    en: { ...en[indexEn], indexEn },
  }
}
