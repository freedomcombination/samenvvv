import { compareAsc, isFuture } from 'date-fns'
import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'
import { getItemLink } from '@utils'

type HomepageData = {
  posts: IPost[]
  subpages: ISubpage[]
  hashtags: IHashtag[]
}

type HomepageDataItem = {
  title: string
  link: string
  date: string
  content: string
}

export const GET_HOMEPAGE_DATA = gql`
  query ($locale: String) {
    posts(where: { locale: $locale }, sort: "published_at:desc", limit: 5) {
      title
      content
      slug
      author {
        fullname
        username
      }
      image {
        url
      }
      published_at
    }
    subpages(
      locale: $locale
      sort: "start:desc"
      limit: 5
      where: { type: "announcement" }
    ) {
      title
      content
      start
      end
      slug
      image {
        url
      }
      page {
        slug
      }
    }
    hashtags(locale: $locale, sort: "date:desc", limit: 5) {
      title
      content
      date
      slug
      image {
        url
      }
      page {
        slug
      }
    }
  }
`
export const getHomepageData = async (
  locale: CommonLocale,
): Promise<{
  latestEntry: HomepageDataItem
  hashtags: HomepageDataItem[]
  homepageData: HomepageDataItem[]
}> => {
  const data = await graphQLClient.request<HomepageData, BaseVariables>(
    GET_HOMEPAGE_DATA,
    {
      locale,
    },
  )

  const subpageData = data.subpages || []
  const hashtagData = data.hashtags || []
  const blogData = data.posts || []
  let latestEntry: HomepageDataItem = {
    title: '',
    link: '',
    date: '',
    content: '',
  }

  // Extend subpage data with link and date
  const subpages = subpageData.map(subpage => ({
    ...subpage,
    link: getItemLink(subpage, locale),
    date: subpage.start,
  })) as HomepageDataItem[]

  // Extend hashtag data data with link and date
  const hashtags = hashtagData.map(hashtag => ({
    ...hashtag,
    link: getItemLink(hashtag, locale),
  })) as HomepageDataItem[]

  // Extend blog data with link and date
  const blogs = blogData.map(blog => ({
    ...blog,
    link: `/blog/${blog.slug}`,
    date: blog.published_at,
  })) as HomepageDataItem[]

  // Get the latest entry
  const subpagesEnd = subpageData.map(subpage => ({
    ...subpage,
    link: getItemLink(subpage, locale),
    date: subpage.end,
  })) as HomepageDataItem[]

  const lastAnnounc = subpagesEnd.sort((a, b) =>
    compareAsc(new Date(b.date), new Date(a.date)),
  )[0]

  isFuture(new Date(lastAnnounc.date))
    ? (latestEntry = lastAnnounc)
    : (latestEntry = [...hashtags, ...blogs].sort((a, b) =>
        compareAsc(new Date(b.date), new Date(a.date)),
      )[0])

  const homepageData = [...subpages, ...blogs].sort((a, b) =>
    compareAsc(new Date(b.date), new Date(a.date)),
  )

  return { latestEntry, hashtags, homepageData }
}
