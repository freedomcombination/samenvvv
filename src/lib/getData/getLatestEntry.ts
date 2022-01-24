import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

export const GET_LATEST_ENTRY = gql`
  query ($locale: String) {
    posts(where: { locale: $locale }, sort: "published_at:desc", limit: 1) {
      title
      content
      published_at
    }
    subpages(locale: $locale, sort: "start:desc", limit: 1) {
      title
      content
      start
    }
    hashtags(locale: $locale, sort: "date:desc", limit: 1) {
      title
      content
      date
    }
  }
`
export const getLatestEntry = async (locale: string): Promise<any> => {
  const data = await graphQLClient.request<any, any>(GET_LATEST_ENTRY, {
    locale,
  })
  const latestSubpage = data.subpages?.[0]
  const latestHashtag = data.hashtags?.[0]
  const latestBlog = data.posts?.[0]
  let latestEntry: any

  if (
    latestSubpage.start > latestHashtag.date &&
    latestSubpage.start > latestBlog.published_at
  ) {
    latestEntry = latestSubpage
  }

  if (
    latestHashtag.date > latestSubpage.start &&
    latestHashtag.date > latestBlog.published_at
  ) {
    latestEntry = latestHashtag
  }
  if (
    latestBlog.published_at > latestSubpage.start &&
    latestBlog.published_at > latestHashtag.date
  ) {
    latestEntry = latestBlog
  }

  return latestEntry
}
export const useLatestEntry = (): UseQueryResult<any | null> => {
  const { locale } = useRouter()
  return useQuery({
    queryKey: ['posts', [locale]],
    queryFn: () => getLatestEntry(locale as string),
  })
}
