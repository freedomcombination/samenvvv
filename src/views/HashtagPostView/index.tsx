import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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

const HashtagPostView = ({ pageData }: HashtagProps): JSX.Element => {
  const { locale } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { t } = useTranslation()

  return (
    <Layout
      seo={{
        title: pageData?.text as string,
        description: '',
        image:
          `${process.env.NEXT_PUBLIC_ADMIN_URL}${pageData?.image?.url}` as string,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${pageData?.hashtag?.page?.slug}/${pageData?.hashtag?.slug}/${pageData?.slug}`,
        width: pageData?.image?.width as number,
        height: pageData?.image?.height as number,
        type: pageData?.image?.mime as string,
      }}
    >
      <Container py={4}>
        <Box textAlign="center">
          <Heading>{pageData?.hashtag?.title}</Heading>
          <Text my={4} maxW="container.md" mx="auto">
            {pageData?.hashtag?.content}
          </Text>
        </Box>
        <Stack spacing={4} direction={{ base: 'column', lg: 'row' }}>
          <Tabs flex={1} variant="soft-rounded" isFitted colorScheme="primary">
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
                <HStack
                  justify="stretch"
                  align="stretch"
                  minH={0}
                  maxH={{ base: 'min-content', lg: 650 }}
                  spacing={{ base: 0, lg: 4 }}
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
                    <DrawerContent py={4}>
                      <DrawerCloseButton />
                      <DrawerBody as={VStack} w={300} align="stretch">
                        <MentionSearch />
                        <MentionList />
                        <TrendList />
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                  <PostContainer onOpen={onOpen} post={pageData} />
                </HStack>
              </TabPanel>
              <TabPanel px={0}>
                <CardGroup
                  items={
                    pageData.posts?.map(post => ({
                      ...post,
                      hashtag: pageData.hashtag,
                    })) as IHashtagPost[]
                  }
                  isSimple
                  isSocial
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Box w={{ base: 'full', lg: '300px' }}>
            <TweetWidget title={t`post-share.latest-tweets-label`} />
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default HashtagPostView
