import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'
import { useAppSelector } from '@store'

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

export const useFindHashtagInTrends = () => {
  const { defaultHashtags } = useAppSelector(state => state.postShare)
  const { data: trendsData } = useTrendsData()

  return defaultHashtags.map(hashtag => {
    const { nl, tr, en } = trendsData ?? {}

    if (!hashtag || !nl || !tr || !en) return null

    const indexEn = en?.findIndex((trend: ITrend) => trend.name === hashtag)
    const indexNl = nl?.findIndex((trend: ITrend) => trend.name === hashtag)
    const indexTr = tr?.findIndex((trend: ITrend) => trend.name === hashtag)

    if (!indexEn || !indexNl || !indexTr) return null

    return {
      nl: { ...nl[indexNl], indexNl },
      tr: { ...tr[indexTr], indexTr },
      en: { ...en[indexEn], indexEn },
    }
  })
}
