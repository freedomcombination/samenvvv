import { compareAsc } from 'date-fns'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'
import { getItemLink } from '@utils'

type LatestEntryData = {
  posts: IPost[]
  subpages: ISubpage[]
  hashtags: IHashtag[]
}

type LatestEntry = {
  title: string
  link: string
  date: string
  content: string
}

export const GET_LATEST_ENTRY = gql`
  query ($locale: String) {
    posts(where: { locale: $locale }, sort: "published_at:desc", limit: 1) {
      title
      content
      slug
      published_at
    }
    subpages(
      locale: $locale
      sort: "start:desc"
      limit: 1
      where: { type: "announcement" }
    ) {
      title
      content
      start
      slug
      page {
        slug
      }
    }
    hashtags(locale: $locale, sort: "date:desc", limit: 1) {
      title
      content
      date
      slug
      page {
        slug
      }
    }
  }
`
export const getLatestEntry = async (locale: string): Promise<LatestEntry> => {
  const data = await graphQLClient.request<LatestEntryData, BaseVariables>(
    GET_LATEST_ENTRY,
    {
      locale,
    },
  )

  const subpageData = data.subpages?.[0] || {}
  const hashtagData = data.hashtags?.[0] || {}
  const blogData = data.posts?.[0] || {}

  const subpage = {
    ...subpageData,
    link: getItemLink(subpageData, locale),
    date: subpageData.start,
  } as LatestEntry

  const hashtag = {
    ...hashtagData,
    link: getItemLink(hashtagData, locale),
  } as LatestEntry

  const blog = {
    ...blogData,
    link: `/blog/${blogData.slug}`,
    date: blogData.published_at,
  } as LatestEntry

  const latestEntry = [subpage, hashtag, blog].sort((a, b) =>
    compareAsc(new Date(a.date), new Date(b.date)),
  )[0]

  return latestEntry
}
export const useLatestEntry = (): UseQueryResult<LatestEntry> => {
  const { locale } = useRouter()
  return useQuery({
    queryKey: ['latest-entry', [locale]],
    queryFn: () => getLatestEntry(locale as string),
  })
}
