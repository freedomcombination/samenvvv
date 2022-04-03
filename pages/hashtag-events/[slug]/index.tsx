import { useEffect, useState } from 'react'

import {
  Box,
  Center,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Stack,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { addDays, isPast } from 'date-fns'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import {
  FaChevronDown,
  FaChevronUp,
  FaHashtag,
  FaImages,
  FaTwitter,
} from 'react-icons/fa'

import {
  Card,
  Container,
  Layout,
  Navigate,
  PostArchive,
  PostMaker,
  PostMakerIcon,
  StepsContent,
} from '@components'
import { useLocaleTimeFormat } from '@hooks'
import { getHashtags } from '@lib'
import {
  setDefaultHashtags,
  setDefaultTab,
  setHashtag,
  setPost,
  useAppDispatch,
  useAppSelector,
} from '@store'
import { getItemLink, getSteps, getStepsMob } from '@utils'

interface HashtagProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  seo: NextSeoProps
  hashtag: Hashtag
  hashtags: Hashtag[]
  hasStarted: boolean
  hasPassed: boolean
  defaultHashtags: string[]
}

const Hashtag = ({
  seo,
  hashtag,
  hashtags,
  hasStarted,
  hasPassed,
  defaultHashtags,
}: HashtagProps) => {
  const { defaultTab } = useAppSelector(state => state.post)
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const { formattedDate, formattedDateDistance, timeZone } =
    useLocaleTimeFormat(hashtag?.date as string, 'dd MMMM HH:mm')

  const [show, setShow] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleToggle = () => setShow(!show)

  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, lg: false })
  const steps = isMobile ? getStepsMob(t) : getSteps(t)
  const disableBody = (target: any) => disableBodyScroll(target)
  const enableBody = (target: any) => enableBodyScroll(target)

  useEffect(() => {
    if (defaultHashtags.length > 0)
      dispatch(setDefaultHashtags(defaultHashtags))

    if (hasPassed && defaultTab === null) dispatch(setDefaultTab(1))

    dispatch(setHashtag(hashtag))

    const randomPostIndex = Math.floor(
      Math.random() * (hashtag?.posts?.length || 0),
    )

    const randomPost = hashtag?.posts?.[randomPostIndex] || null

    dispatch(setPost(randomPost))
  }, [hashtag])

  return (
    <TourProvider
      steps={steps}
      components={{}}
      afterOpen={disableBody}
      beforeClose={enableBody}
      ContentComponent={StepsContent}
      padding={{ mask: 6 }}
      styles={{
        popover: base => ({
          ...base,
          padding: 4,
          backgroundColor: 'transparent',
        }),
      }}
    >
      <Layout seo={seo}>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{t`post.all-hashtags`}</DrawerHeader>

            <DrawerBody>
              <Stack spacing={4}>
                {hashtags?.map(hashtag => (
                  <Navigate
                    key={hashtag.id}
                    href={
                      getItemLink(
                        hashtag,
                        locale as StrapiLocale,
                        'hashtag',
                      ) as string
                    }
                  >
                    <Card item={hashtag} type="hashtag" />
                  </Navigate>
                ))}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Container py={4} pos="relative">
          <Tooltip label={t`post.all-hashtags`} hasArrow bg="primary.400">
            <IconButton
              aria-label="open hashtags"
              onClick={onOpen}
              icon={<FaHashtag />}
              variant="outline"
              bg="white"
              colorScheme="primary"
              pos="absolute"
              top={2}
              right={2}
            />
          </Tooltip>
          <Box flex={1} textAlign="center">
            <Heading>{hashtag?.title}</Heading>

            <Collapse startingHeight={50} in={show}>
              <Text my={4} maxW="container.md" mx="auto">
                {hashtag?.content}{' '}
              </Text>
            </Collapse>
            <IconButton
              variant="ghost"
              size="sm"
              icon={show ? <FaChevronUp /> : <FaChevronDown />}
              aria-label={show ? 'up' : 'down'}
              _hover={{ bg: 'transparent' }}
              onClick={handleToggle}
            />
          </Box>
          {hasStarted && hashtag?.hashtag ? (
            <Tabs
              flex={1}
              isFitted
              colorScheme="primary"
              index={defaultTab || 0}
              onChange={index => dispatch(setDefaultTab(index))}
              isLazy
            >
              <Stack
                direction={{ base: 'row', xl: 'column' }}
                pos={{ base: 'static', xl: 'fixed' }}
                top="50%"
                left={0}
                transform={{ xl: 'translateY(-50%)' }}
                spacing={1}
                zIndex="tooltip"
              >
                <Tab
                  borderWidth={1}
                  borderColor="gray.300"
                  mb={0}
                  bg="white"
                  borderRadius={{ base: 'sm', lg: 'none' }}
                  _selected={{
                    bg: 'primary.400',
                    borderColor: 'primary.400',
                    color: 'white',
                  }}
                >
                  <Box as={FaTwitter} mr={2} />
                  <Box>{t`post.tabs.share`}</Box>
                </Tab>
                <Tab
                  borderWidth={1}
                  borderColor="gray.300"
                  bg="white"
                  borderRadius={{ base: 'sm', lg: 'none' }}
                  _selected={{
                    bg: 'primary.400',
                    borderColor: 'primary.400',
                    color: 'white',
                  }}
                >
                  <Box as={FaImages} mr={2} />
                  <Box>{t`post.tabs.archive`}</Box>
                </Tab>
              </Stack>
              <TabPanels overflowX="hidden">
                <TabPanel px={0} py={4}>
                  <PostMaker />
                </TabPanel>
                <TabPanel p={0} py={4}>
                  <PostArchive />
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : (
            <Center minH={500}>
              <Stack
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                py={16}
                px={{ base: 4, lg: 16 }}
                maxW={700}
                rounded="lg"
                spacing={2}
                bg="#9EDEF8"
                w="full"
              >
                <PostMakerIcon boxSize={300} />

                <Heading color="twitter.800" fontSize="2xl">
                  {t('post.will-start', { time: formattedDateDistance })}
                </Heading>
                <Text>
                  {formattedDate} ({timeZone})
                </Text>
              </Stack>
            </Center>
          )}
        </Container>
      </Layout>
    </TourProvider>
  )
}

export default Hashtag

// export const getStaticPaths: GetStaticPaths = async context => {
//   const locales = context.locales as StrapiLocale[]
//   const paths = await getHashtagPaths(locales)

//   return {
//     paths,
//     fallback: true,
//   }
// }

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.slug as string

  // const hashtag = await getHashtag(locale, slug)
  const hashtags = await getHashtags(locale, [
    'image',
    'mentions',
    'posts.image',
  ])

  const targetHashtag = hashtags.find(hashtag => hashtag.slug === slug)
  const posts = targetHashtag?.posts?.map(post => ({
    ...post,
    hashtag: targetHashtag,
  }))

  const hashtag = { ...targetHashtag, posts }

  if (!hashtag) {
    return { notFound: true }
  }

  const hasPassed = isPast(addDays(new Date(hashtag.date as string), 1))
  const hasStarted = isPast(new Date(hashtag.date as string))
  const defaultHashtags = [hashtag?.hashtag, hashtag?.hashtag_extra].filter(
    h => !!h,
  )

  const title = hashtag?.title
  const description = hashtag.description
  const adminUrl = process.env.NEXT_PUBLIC_API_URL as string
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string
  const image = hashtag?.image
  const url = `${siteUrl}/${locale}/blog/${hashtag?.slug}`

  const seo: NextSeoProps = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: adminUrl + image?.url,
          secureUrl: adminUrl + image?.url,
          type: image?.mime as string,
          width: image?.width as number,
          height: image?.height as number,
          alt: title,
        },
      ],
    },
  }

  const source = await serialize(hashtag?.content || '')

  return {
    props: {
      source,
      link: url,
      seo,
      hashtag,
      hashtags,
      hasPassed,
      hasStarted,
      defaultHashtags,
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
    },
  }
}
