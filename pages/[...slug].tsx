import {
  Box,
  ButtonGroup,
  Center,
  CloseButton,
  Heading,
  HStack,
  IconButton,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import { PopoverContentProps } from '@reactour/tour/dist/types'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { DehydratedState, QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Layout } from '@components'
import {
  getAllPagePaths,
  getApplication,
  getCompetition,
  getHashtagPost,
  getHashtagPosts,
  getPage,
  getPageType,
  getSubpage,
} from '@lib'
import { getPageSeo, getSteps, getStepsMob } from '@utils'
import {
  ApplicationView,
  CompetitionView,
  HashtagPostView,
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
  seo: NextSeoProps
  link: string
}

const StepsContentComponent = (props: PopoverContentProps) => {
  const { setIsOpen, steps, setCurrentStep, currentStep } = props

  const [title, ...content] = (steps[currentStep].content as string).split('|')

  return (
    <Box px={6} py={4} rounded="sm" bg="white">
      {content[0] && (
        <Heading as="h4" size="md" mb={2}>
          {title}
        </Heading>
      )}
      <Box>{content[0] || title}</Box>
      <ButtonGroup
        mt={4}
        justifyContent="space-between"
        alignItems="center"
        variant="ghost"
        colorScheme="primary"
        w="full"
      >
        <IconButton
          visibility={currentStep === 0 ? 'hidden' : 'visible'}
          aria-label="previous step"
          icon={<FaChevronLeft />}
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 0}
        />

        <HStack spacing={1}>
          {steps.map((_, i) => (
            <Box
              key={i}
              borderWidth={1}
              borderColor="primary.400"
              bg={i === currentStep ? 'primary.400' : 'white'}
              boxSize={i === currentStep ? 3 : 2}
              rounded="full"
            />
          ))}
        </HStack>
        <IconButton
          aria-label="next step"
          icon={
            currentStep === steps.length - 1 ? <FaCheck /> : <FaChevronRight />
          }
          onClick={() => setCurrentStep(prev => prev + 1)}
        />
      </ButtonGroup>
      <CloseButton
        pos="absolute"
        top={1}
        right={1}
        onClick={() => setIsOpen(false)}
      />
    </Box>
  )
}

const DynamicPage = (props: DynamicPageProps): JSX.Element => {
  const router = useRouter()
  const { slug, pageType, isPage, source, pageData, seo, link } = props
  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, lg: false })
  const steps = isMobile ? getStepsMob(t) : getSteps(t)
  const disableBody = (target: any) => disableBodyScroll(target)
  const enableBody = (target: any) => enableBodyScroll(target)

  if (router.isFallback)
    return (
      <Layout>
        <Center h="100vh">
          <Spinner colorScheme="primary" />
        </Center>
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

  const pageProps = { slug, source, pageData, seo, link }

  return (
    <TourProvider
      steps={steps}
      components={{}}
      afterOpen={disableBody}
      beforeClose={enableBody}
      ContentComponent={StepsContentComponent}
      padding={{ mask: 6 }}
      styles={{
        popover: base => ({
          ...base,
          padding: 4,
          backgroundColor: 'transparent',
        }),
      }}
    >
      {isMainPage && <MainView {...pageProps} />}
      {isSubpage && <SubView {...pageProps} />}
      {isCompetitionsPage && <MainCompetitionsView {...pageProps} />}
      {isCompetitionPage && <CompetitionView {...pageProps} />}
      {isApplicationPage && <ApplicationView {...pageProps} />}
      {isHashtagsPage && <MainHashtagsView {...pageProps} />}
      {isHashtagPage && <HashtagPostView {...pageProps} />}
      {isHashtagPostPage && <HashtagPostView {...pageProps} />}
    </TourProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPagePaths()

  return {
    paths,
    fallback: true,
  }
}

export interface DynamicProps {
  locale: string
  slug: {
    [x: string]: string[]
  }
  isPage: {
    main: boolean
    sub: boolean
    child: boolean
  }
  pageType: Page_Type | null
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  dehydratedState: DehydratedState
  pageData:
    | IPage
    | ISubpage
    | IHashtag
    | ICompetition
    | IApplication
    | IHashtagPost
    | Record<string, unknown>
  _nextI18Next: any
  seo: NextSeoProps
  link: string
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as string
  let source: MDXRemoteSerializeResult<Record<string, unknown>>
  const queryClient = new QueryClient()

  const [mainSlug = '', subSlug = '', childSlug = ''] = context.params
    ?.slug as string[]

  const pageType = await getPageType(locale, mainSlug)
  const props: DynamicProps = {
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
    seo: {},
    link: '',
  }

  if (!pageType) {
    return { notFound: true, revalidate: 120 }
  }

  const isMainPage = !!mainSlug && !subSlug && !childSlug
  const isSubpage = !!(mainSlug && subSlug) && !childSlug
  const isChildPage = !!(mainSlug && subSlug && childSlug)

  // MAIN PAGE
  if (isMainPage) {
    const pageData = await getPage(locale, mainSlug)
    queryClient.setQueryData(['pages', [locale, mainSlug]], pageData)

    if (!pageData) {
      return { notFound: true, revalidate: 120 }
    }

    const source = await serialize(pageData.content ?? '')

    const seo = getPageSeo(pageData, locale)

    props.isPage.main = true
    props.source = source
    props.dehydratedState = dehydrate(queryClient)
    props.slug = pageData.slugs
    props.pageData = pageData ?? {}
    props.seo = seo
    props.link = seo.openGraph?.url as string

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

    const getSubpageData = async () => {
      if (pageType === 'hashtag') {
        // Pass the first post data of the hashtag to the props
        const hashtagPosts = await getHashtagPosts(locale, subSlug)
        const hashtagPostSlug = hashtagPosts?.[0].slug as string
        const hashtagPost = await getHashtagPost(locale, hashtagPostSlug)
        return { ...hashtagPost, posts: hashtagPosts }
      }

      if (pageType === 'competition') {
        return getCompetition(locale, subSlug)
      }

      return getSubpage(locale, subSlug)
    }

    const subpageData = (await getSubpageData()) as
      | IHashtag
      | ICompetition
      | ISubpage

    if (!subpageData) {
      return { notFound: true, revalidate: 120 }
    }

    queryClient.setQueryData([queryKey, [locale, subSlug]], subpageData)

    source = await serialize(subpageData?.content ?? '')

    const seo = getPageSeo(subpageData, locale)

    props.isPage.sub = true
    props.source = source
    props.dehydratedState = dehydrate(queryClient)
    props.slug = subpageData.slugs
    props.pageData = subpageData
    props.seo = seo
    props.link = seo.openGraph?.url as string

    return {
      props,
      revalidate: 120,
    }
  }

  // CHILD PAGE
  if (isChildPage) {
    const queryKey = pageType === 'hashtag' ? 'hashtag-posts' : 'applications'

    let childPageData = null

    // We won't redirect users to individual post page, instead in hashtag page
    // we will be showing each active post item by its slug in the url
    // That's why we pass hashtag data of the post item to props
    if (pageType === 'hashtag') {
      const hashtagPost = await getHashtagPost(locale, childSlug)
      const posts = await getHashtagPosts(locale, subSlug)
      childPageData = { ...hashtagPost, posts }

      if (!posts) {
        return { notFound: true, revalidate: 120 }
      }

      queryClient.setQueryData([queryKey, [locale, childSlug]], childPageData)
    } else {
      childPageData = await getApplication(locale, childSlug)

      if (!childPageData) {
        return { notFound: true, revalidate: 120 }
      }
      queryClient.setQueryData([queryKey, [locale, childSlug]], childPageData)
    }

    const seo = getPageSeo(childPageData as IApplication | IHashtagPost, locale)

    props.isPage.child = true
    props.pageData = childPageData as IApplication | IHashtagPost
    props.seo = seo
    props.link = seo.openGraph?.url as string
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
