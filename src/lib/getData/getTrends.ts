import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

export const GET_TRENDS_LIST = gql`
  query getTrendsDataData {
    trend {
      en
      tr
      nl
    }
  }
`

export const getTrendsData = async (): Promise<{ trend: ITrendsData }> =>
  graphQLClient.request<{ trend: ITrendsData }>(GET_TRENDS_LIST)

export const getTrends = async (locale: string): Promise<ITrends[] | null> => {
  const trendsData = await getTrendsData()

  const { nl, tr, en } = trendsData.trend
  let trend: ITrends[]

  if (!nl || !tr || !en) return null

  if (locale === 'tr') {
    trend = [...en.slice(0, 3), ...tr]
  } else {
    trend = [...en.slice(0, 3), ...nl]
  }

  return trend
}

export const useTrendsData = (): UseQueryResult<{ trend: ITrendsData }> => {
  return useQuery('trends-data', () => getTrendsData())
}

export const useTrends = (): UseQueryResult<ITrends[] | null> => {
  const { locale } = useRouter()
  return useQuery('trends', () => getTrends(locale as string))
}

export const useFindHashtagInTrends = (
  hashtag?: string,
): (ITrends & { index: number }) | undefined => {
  const { locale } = useRouter()
  const { data: trendsData } = useTrendsData()

  if (!hashtag) return

  const trends = trendsData?.trend[locale as 'tr' | 'nl' | 'en']
  const index = trends?.findIndex((trend: ITrends) => trend.name === hashtag)

  if (!trends || !index) return

  return { ...trends[index], index }
}
