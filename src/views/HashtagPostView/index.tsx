import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import {
  CardGroup,
  Container,
  Layout,
  Markdown,
  MentionList,
  PostContainer,
  TrendList,
  TweetWidget,
} from '@components'
import { MentionSearch } from 'src/components/MentionSearch'

interface HashtagProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IHashtagPost
}

const HashtagPostView = ({ source, pageData }: HashtagProps): JSX.Element => {
  const { locale } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { t } = useTranslation()

  return (
    <Layout
      seo={{
        metadata: {
          metaTitle: pageData?.hashtag?.title as string,
          metaDescription: pageData?.text as string,
        },
        image:
          `${process.env.NEXT_PUBLIC_ADMIN_URL}${pageData?.image?.url}` as string,
        // TODO: Fix url
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${pageData?.hashtag?.page?.slug}/${pageData?.hashtag?.slug}/${pageData?.slug}`,
        width: pageData?.image?.width as number,
        height: pageData?.image?.height as number,
        type: pageData?.image?.mime as string,
      }}
    >
      <Container py={4}>
        <Box textAlign="center" mb={8}>
          <Heading>{pageData?.hashtag?.title}</Heading>
          {source && <Markdown source={source} />}
        </Box>
        <Tabs variant="soft-rounded" isFitted colorScheme="primary">
          <TabList>
            <Tab
              color="gray.400"
              fontWeight="bold"
              borderBottomWidth={2}
              _selected={{
                bg: 'primary.100',
                color: 'primary.400',
                borderColor: 'primary.400',
              }}
            >
              {t`post-share.tabs.share`}
            </Tab>
            <Tab
              color="gray.400"
              fontWeight="bold"
              borderBottomWidth={2}
              _selected={{
                bg: 'primary.100',
                color: 'primary.400',
                borderBottomWidth: 2,
                borderColor: 'primary.400',
              }}
            >
              {t`post-share.tabs.archive`}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Stack
                direction={{ base: 'column', lg: 'row' }}
                justify="stretch"
                align="stretch"
                minH={0}
                maxH={{ base: 'min-content', lg: 650 }}
              >
                <VStack
                  w={300}
                  align="stretch"
                  display={{ base: 'none', lg: 'flex' }}
                >
                  <MentionSearch />
                  <MentionList />
                  <TrendList />
                </VStack>
                <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{t`post-share.add-mention`}</DrawerHeader>
                    <DrawerBody>
                      <MentionSearch />
                      <MentionList />
                      <TrendList />
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
                <PostContainer onOpen={onOpen} post={pageData} />
                <Box w={{ base: 'full', lg: '300px' }}>
                  <TweetWidget />
                </Box>
              </Stack>
            </TabPanel>
            <TabPanel px={0}>
              <CardGroup
                items={pageData?.posts as unknown as ISubpage[]}
                isSimple
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Layout>
  )
}

export default HashtagPostView
