import { Spinner } from '@chakra-ui/spinner'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useRouter } from 'next/router'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Container, Layout } from '@components'
import {
  getAllPagePaths,
  getApplication,
  getCompetition,
  getHashtag,
  getHashtagPost,
  getPage,
  getPageType,
  getSubpage,
} from '@lib'
import {
  ApplicationView,
  CompetitionView,
  HashtagPostView,
  HashtagView,
  MainCompetitionsView,
  MainHashtagsView,
  MainView,
  SubView,
} from '@views'

interface DynamicPageProps {
  locale: string
  slug: Record<string, string[]>
  isPage: {
    main: boolean
    sub: boolean
    child: boolean
  }
  pageType: Page_Type
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: any
}

const DynamicPage = (props: DynamicPageProps): JSX.Element => {
  const router = useRouter()
  const { slug, pageType, isPage, source, pageData } = props

  if (router.isFallback)
    return (
      <Layout>
        <Container>
          <Spinner />
        </Container>
      </Layout>
    )

  const isMainPage = isPage.main && !!pageType.match(/event|news|announcement/)
  const isSubpage = isPage.sub && !!pageType.match(/event|news|announcement/)
  const isCompetitionsPage = isPage.main && pageType === 'competition'
  const isCompetitionPage = isPage.sub && pageType === 'competition'
  const isApplicationPage = isPage.child && pageType === 'competition'
  const isHashtagsPage = isPage.main && pageType === 'hashtag'
  const isHashtagPage = isPage.sub && pageType === 'hashtag'
  const isHashtagPostPage = isPage.child && pageType === 'hashtag'

  const pageProps = { slug, source, pageData }

  return (
    <>
      {isMainPage && <MainView {...pageProps} />}
      {isSubpage && <SubView {...pageProps} />}
      {isCompetitionsPage && <MainCompetitionsView {...pageProps} />}
      {isCompetitionPage && <CompetitionView {...pageProps} />}
      {isApplicationPage && <ApplicationView {...pageProps} />}
      {isHashtagsPage && <MainHashtagsView {...pageProps} />}
      {isHashtagPage && <HashtagView {...pageProps} />}
      {isHashtagPostPage && <HashtagPostView {...pageProps} />}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPagePaths()

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
    },
    isPage: {
      main: false,
      sub: false,
      child: false,
    },
    pageType,
    source: await serialize(''),
    dehydratedState: dehydrate(queryClient),
    pageData: {},
  }

  if (!pageType) {
    return { notFound: true, revalidate: 120 }
  }

  const isMainPage = !!mainSlug && !subSlug && !childSlug
  const isSubpage = !!(mainSlug && subSlug) && !childSlug
  const isChildPage = !!(mainSlug && subSlug && childSlug)

  // MAIN PAGE
  if (isMainPage) {
    await queryClient.prefetchQuery(['pages', [mainSlug, locale]], () =>
      getPage(mainSlug, locale),
    )

    const pageData = await getPage(locale, mainSlug)

    if (!pageData) {
      return { notFound: true, revalidate: 120 }
    }

    const source = await serialize(pageData.content ?? '')

    props.isPage.main = true
    props.source = source
    props.dehydratedState = dehydrate(queryClient)
    props.slug = pageData.slugs
    props.pageData = pageData

    return {
      props,
      revalidate: 120,
    }
  }

  // SUB PAGE
  if (isSubpage) {
    const queryKey =
      pageType === 'hashtag'
        ? 'hashtags'
        : pageType === 'competition'
        ? 'competitions'
        : 'subpages'

    const getSubpageData = () => {
      if (pageType === 'hashtag') {
        return getHashtag(locale, subSlug)
      }

      if (pageType === 'competition') {
        return getCompetition(locale, subSlug)
      }

      return getSubpage(locale, subSlug)
    }

    await queryClient.prefetchQuery<IHashtag | ICompetition | ISubpage | null>(
      [queryKey, [locale, subSlug]],
      () => getSubpageData(),
    )

    const subpageData = (await getSubpageData()) as
      | IHashtag
      | ICompetition
      | ISubpage

    if (!subpageData) {
      return { notFound: true, revalidate: 120 }
    }

    source = await serialize(subpageData?.content ?? '')

    props.isPage.sub = true
    props.source = source
    props.dehydratedState = dehydrate(queryClient)
    props.slug = subpageData.slugs
    props.pageData = subpageData

    return {
      props,
      revalidate: 120,
    }
  }

  if (isChildPage) {
    const queryKey = pageType === 'hashtag' ? 'hashtag-posts' : 'applications'

    const getChildPageData = () => {
      if (pageType === 'hashtag') {
        return getHashtagPost(locale, childSlug)
      }

      return getApplication(locale, childSlug)
    }

    await queryClient.prefetchQuery<IHashtagPost | IApplication | null>(
      [queryKey, [locale, childSlug]],
      () => getChildPageData(),
    )

    const childPageData = (await getChildPageData()) ?? null

    if (!childPageData) {
      return { notFound: true, revalidate: 120 }
    }

    props.isPage.child = true
    props.pageData = childPageData as IHashtagPost
    props.dehydratedState = dehydrate(queryClient)

    return {
      props,
      revalidate: 120,
    }
  }

  return {
    props,
    revalidate: 120,
  }
}

export default DynamicPage
