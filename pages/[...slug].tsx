import { Spinner } from '@chakra-ui/spinner'
import merge from 'lodash.merge'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useRouter } from 'next/router'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Container, Layout } from '@components'
import {
  getAllApplicationPaths,
  getAllCompetitionPaths,
  getAllHashtagPaths,
  getAllPagePaths,
  getAllSubagePaths,
  getAllTweetPaths,
  getLocalizedMainSlugs,
  getLocalizedSubSlugs,
  getPageType,
  getStrapiData,
} from '@lib'
import {
  ApplicationView,
  CompetitionView,
  HashtagView,
  MainCompetitionsView,
  MainHashtagsView,
  MainView,
  SubView,
  TweetView,
} from '@views'

interface DynamicPageProps {
  locale: string
  slug: Record<string, string[]>
  isPage: {
    main: boolean
    sub: boolean
    child: boolean
  }
  pageType: PageVariantType
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const DynamicPage = (props: DynamicPageProps): JSX.Element => {
  const router = useRouter()
  const { slug, pageType, isPage, source } = props

  if (router.isFallback) return <Spinner />

  const isMainPage = isPage.main && !!pageType.match(/event|news|announcement/)
  const isSubpage = isPage.sub && !!pageType.match(/event|news|announcement/)
  const isCompetitionsPage = isPage.main && pageType === 'competition'
  const isCompetitionPage = isPage.sub && pageType === 'competition'
  const isApplicationPage = isPage.child && pageType === 'competition'
  const isHashtagsPage = isPage.main && pageType === 'hashtag'
  const isHashtagPage = isPage.sub && pageType === 'hashtag'
  const isTweetPage = isPage.child && pageType === 'hashtag'

  const pageProps = { slug, source }

  return (
    <Layout>
      <Container>
        {isMainPage && <MainView {...pageProps} />}
        {isSubpage && <SubView {...pageProps} />}
        {isCompetitionsPage && <MainCompetitionsView {...pageProps} />}
        {isCompetitionPage && <CompetitionView {...pageProps} />}
        {isApplicationPage && <ApplicationView {...pageProps} />}
        {isHashtagsPage && <MainHashtagsView {...pageProps} />}
        {isHashtagPage && <HashtagView {...pageProps} />}
        {isTweetPage && <TweetView slug={slug} />}
      </Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async context => {
  const locales = context.locales as string[]

  const allPagePaths = await getAllPagePaths(locales)
  const allSubpagePaths = await getAllSubagePaths(locales)
  const allCompetitionPaths = await getAllCompetitionPaths(locales)
  const allApplicationPaths = await getAllApplicationPaths(locales)
  const allHashtagPaths = await getAllHashtagPaths(locales)
  const allTweetPaths = await getAllTweetPaths(locales)

  const paths = [
    ...allPagePaths,
    ...allSubpagePaths,
    ...allCompetitionPaths,
    ...allApplicationPaths,
    ...allHashtagPaths,
    ...allTweetPaths,
  ]

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as string
  let source: MDXRemoteSerializeResult<Record<string, unknown>>
  const queryClient = new QueryClient()
  const [mainSlug = '', subSlug = '', childSlug = ''] = context.params
    ?.slug as string[]

  const pageType = await getPageType(locale, mainSlug)
  const props = {
    ...(await serverSideTranslations(locale, ['common'])),
    locale,
    slug: {
      [locale]: [mainSlug, subSlug, childSlug],
    } as Record<string, string[]>,
    isPage: {
      main: false,
      sub: false,
      child: false,
    },
    pageType,
    source: await serialize(''),
    dehydratedState: dehydrate(queryClient),
  }

  if (!pageType) {
    return { notFound: true, revalidate: 120 }
  }

  const isMainPage = !subSlug
  const isSubpage = subSlug && !childSlug
  const isChildPage = !!childSlug

  if (isMainPage) {
    await queryClient.prefetchQuery(['pages', [mainSlug, locale]], () =>
      getStrapiData('pages', locale, mainSlug),
    )

    const pageData = queryClient.getQueryData([
      'pages',
      [mainSlug, locale],
    ]) as PageType[]

    if (!pageData) {
      return { notFound: true, revalidate: 120 }
    }

    const localizedPageIds = pageData?.[0].localizations?.map(
      l => l.id,
    ) as number[]
    const localizedPageSlugs = await getLocalizedMainSlugs(localizedPageIds)

    const source = await serialize(pageData?.[0].content || '')

    props.isPage.main = true
    props.source = source
    props.dehydratedState = dehydrate(queryClient)
    props.slug = merge(props.slug, localizedPageSlugs)
  }

  if (isSubpage) {
    const queryKey =
      pageType === 'hashtag'
        ? 'hashtags'
        : pageType === 'competition'
        ? 'competitions'
        : 'subpages'

    await queryClient.prefetchQuery([queryKey, [subSlug, locale]], () =>
      getStrapiData(queryKey, locale, subSlug),
    )

    const subpageData = queryClient.getQueryData([
      queryKey,
      [subSlug, locale],
    ]) as SubpageType[] | HashtagType[] | CompetitionType[]

    if (!subpageData) {
      return { notFound: true, revalidate: 120 }
    }

    const localizedSubpagePageIds = subpageData?.[0].localizations?.map(
      l => l.id,
    ) as number[]
    const localizedSubPageSlugs = await getLocalizedSubSlugs(
      localizedSubpagePageIds,
      queryKey,
    )

    source = await serialize(subpageData?.[0]?.content || '')

    props.isPage.sub = true
    props.source = source
    props.dehydratedState = dehydrate(queryClient)
    props.slug = merge(props.slug, localizedSubPageSlugs)
  }

  if (isChildPage) {
    const queryKey = pageType === 'hashtag' ? 'tweets' : 'applications'
    await queryClient.prefetchQuery([queryKey, [childSlug, locale]], () =>
      getStrapiData(queryKey, locale, childSlug),
    )

    props.isPage.child = true
    props.dehydratedState = dehydrate(queryClient)
  }

  return {
    props,
    revalidate: 120,
  }
}

export default DynamicPage
