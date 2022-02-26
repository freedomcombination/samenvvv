import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { useAppSelector } from '@store'

import { fetcher } from '../graphql-client'

export type GetTrendsDataDataQuery = {
  __typename?: 'Query'
  trend?: {
    __typename?: 'TrendEntityResponse'
    data?: {
      __typename?: 'TrendEntity'
      attributes?: {
        __typename?: 'Trend'
        en?: any | null
        tr?: any | null
        nl?: any | null
        updatedAt?: any | null
      } | null
    } | null
  } | null
}

export const GetTrendsDataDataDocument = gql`
  query getTrendsDataData {
    trend {
      data {
        attributes {
          en
          tr
          nl
          updatedAt
        }
      }
    }
  }
`

export const getTrends = async () =>
  fetcher<GetTrendsDataDataQuery, null>(GetTrendsDataDataDocument)

export const useGetTrendsDataDataQuery = <
  TData = GetTrendsDataDataQuery,
  TError = unknown,
>() =>
  useQuery<GetTrendsDataDataQuery, TError, TData>(
    ['getTrendsDataData'],
    getTrends,
  )

export const useFindHashtagInTrends = () => {
  const { defaultHashtags } = useAppSelector(state => state.postShare)
  const { data } = useGetTrendsDataDataQuery()

  const trendsData = data?.trend?.data?.attributes

  return defaultHashtags.map(hashtag => {
    const { nl, tr, en } = trendsData ?? {}

    if (!hashtag || !nl || !tr || !en) return null

    const indexEn = en?.findIndex((trend: TrendData) => trend.name === hashtag)
    const indexNl = nl?.findIndex((trend: TrendData) => trend.name === hashtag)
    const indexTr = tr?.findIndex((trend: TrendData) => trend.name === hashtag)

    if (!indexEn || !indexNl || !indexTr) return null

    return {
      nl: { ...nl[indexNl], indexNl },
      tr: { ...tr[indexTr], indexTr },
      en: { ...en[indexEn], indexEn },
    }
  })
}
