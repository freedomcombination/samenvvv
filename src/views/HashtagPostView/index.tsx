import { memo, useEffect, useMemo, useState } from 'react'

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
  Spinner,
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
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
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
  StepsContent,
} from '@components'
import { useHashtagsQuery } from '@lib'
import {
  setDefaultHashtags,
  setDefaultTab,
  useAppDispatch,
  useAppSelector,
} from '@store'
import { getItemLink, getSteps, getStepsMob } from '@utils'

interface HashtagProps {
  slug: CommonLocalizedSlug
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IHashtagPost
  seo: NextSeoProps
  link: string
}

export const HashtagPostView = memo<HashtagProps>(function HashtagPostView({
  pageData,
  seo,
}) {
  const { defaultTab } = useAppSelector(state => state.postShare)
  const dispatch = useAppDispatch()
  const { locale } = useRouter()

  const [show, setShow] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data } = useHashtagsQuery(locale as CommonLocale)

  const handleToggle = () => setShow(!show)

  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, lg: false })
  const steps = isMobile ? getStepsMob(t) : getSteps(t)
  const disableBody = (target: any) => disableBodyScroll(target)
  const enableBody = (target: any) => enableBodyScroll(target)

  const post = useMemo(() => {
    const posts =
      pageData.posts?.map(post => {
        const p = { ...post }
        p.hashtag = pageData.hashtag
        return p
      }) || []

    return { ...pageData, posts }
  }, [pageData])

  useEffect(() => {
    const dateStr = post.hashtag?.date
    if (dateStr) {
      const date = new Date(dateStr)
      const hasEventPassed = isPast(addDays(date, 1))

      if (hasEventPassed && defaultTab === null) dispatch(setDefaultTab(1))
      const defaultHashtags = [
        post.hashtag?.hashtag,
        post.hashtag?.hashtag_extra,
      ].filter(h => !!h) as string[]

      if (defaultHashtags.length > 0)
        dispatch(setDefaultHashtags(defaultHashtags))
    }
  }, [post, dispatch])

  if (!post)
    return (
      <Layout>
        <Center h="100vh">
          <Spinner colorScheme="primary" />
        </Center>
      </Layout>
    )

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
            <DrawerHeader>{t`post-share.all-hashtags`}</DrawerHeader>

            <DrawerBody>
              <Stack spacing={4}>
                {data?.map(hashtag => (
                  <Navigate
                    key={hashtag.id}
                    href={
                      getItemLink(hashtag, locale as CommonLocale) as string
                    }
                  >
                    <Card item={hashtag} />
                  </Navigate>
                ))}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Container py={4} pos="relative">
          <Tooltip label={t`post-share.all-hashtags`} hasArrow bg="primary.400">
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
            <Heading>{post?.hashtag?.title}</Heading>

            <Collapse startingHeight={50} in={show}>
              <Text my={4} maxW="container.md" mx="auto">
                {post?.hashtag?.content}{' '}
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
                <Box>{t`post-share.tabs.share`}</Box>
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
                <Box>{t`post-share.tabs.archive`}</Box>
              </Tab>
            </Stack>
            <TabPanels overflowX="hidden">
              <TabPanel px={0} py={4}>
                <PostMaker post={post} />
              </TabPanel>
              <TabPanel p={0} py={4}>
                <PostArchive posts={post.posts} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Layout>
    </TourProvider>
  )
})
