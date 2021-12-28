import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Grid,
  Heading,
  IconButton,
  Stack,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { addDays, isPast } from 'date-fns'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'
import { useTranslation } from 'react-i18next'
import { FaImages, FaQuestionCircle, FaTwitter } from 'react-icons/fa'

import {
  Container,
  Layout,
  MentionList,
  PostArchive,
  PostContainer,
  TrendListTabs,
  TweetWidget,
} from '@components'

interface HashtagProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IHashtagPost
  seo: NextSeoProps
  link: string
}

const HashtagPostView = ({ pageData, seo }: HashtagProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [tabIndex, setTabIndex] = useState<number>(0)

  useEffect(() => {
    const dateStr = pageData.hashtag?.date
    if (dateStr) {
      const date = new Date(dateStr)
      const hasEventPassed = isPast(addDays(date, 1))

      if (hasEventPassed) setTabIndex(1)
    }
  }, [pageData.hashtag?.date])

  const { t } = useTranslation()

  return (
    <Layout seo={seo}>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent py={4}>
          <DrawerCloseButton />
          <DrawerBody as={VStack} w={300} align="stretch">
            <MentionList />
            <TrendListTabs
              hashtags={[
                pageData.hashtag?.hashtag,
                pageData.hashtag?.hashtag_extra,
              ]}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Container py={4}>
        <Box textAlign="center">
          <Heading>{pageData?.hashtag?.title}</Heading>
          <Text my={4} maxW="container.md" mx="auto">
            {pageData?.hashtag?.content}
          </Text>
        </Box>

        <Tabs
          flex={1}
          isFitted
          colorScheme="primary"
          index={tabIndex}
          onChange={setTabIndex}
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
          <TabPanels>
            <TabPanel px={0} py={4}>
              <Grid
                gap={4}
                gridTemplateColumns={{ base: '1fr', lg: '300px 1fr 300px' }}
                h={{ base: 'auto', lg: 640 }}
              >
                <Box display={{ base: 'none', lg: 'block' }} h="inherit">
                  <MentionList />
                  <TrendListTabs
                    hashtags={[
                      pageData.hashtag?.hashtag,
                      pageData.hashtag?.hashtag_extra,
                    ]}
                  />
                </Box>
                <PostContainer onOpen={onOpen} post={pageData} />
                <Box>
                  <TweetWidget title={t`post-share.latest-tweets-label`} />
                </Box>
              </Grid>
            </TabPanel>
            <TabPanel p={0} py={4}>
              <PostArchive
                posts={
                  pageData.posts?.map(post => ({
                    ...post,
                    hashtag: pageData.hashtag,
                  })) as IHashtagPost[]
                }
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Button
          display={{ base: 'none', lg: 'flex' }}
          pos="fixed"
          right={4}
          bottom={4}
          colorScheme="primary"
          leftIcon={<FaQuestionCircle />}
        >
          {t`post-share.help`}
        </Button>
        <IconButton
          display={{ base: 'flex', lg: 'none' }}
          pos="fixed"
          size="lg"
          right={2}
          bottom={2}
          rounded="full"
          colorScheme="primary"
          aria-label="help"
          shadow="dark-lg"
          icon={<FaQuestionCircle />}
        />
      </Container>
    </Layout>
  )
}

export default HashtagPostView
