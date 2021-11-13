import { useState } from 'react'

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import {
  Container,
  Layout,
  Markdown,
  MentionList,
  PostContainer,
  TrendList,
  TweetWidget,
} from '@components'
import { useHashtagQuery } from '@lib'
import { MentionSearch } from 'src/components/MentionSearch'

interface HashtagProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IHashtag
}

const HashtagView = ({ source, pageData }: HashtagProps): JSX.Element => {
  const { locale, query } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activePost, setActivePost] = useState<IHashtagPost>()

  const { t } = useTranslation()

  const { data } = useHashtagQuery(
    locale as string,
    query?.slug?.[1] ?? '',
    pageData,
  )

  const handleSetActivePost = (post: IHashtagPost) => setActivePost(post)

  return (
    <Layout
      seo={{
        metadata: {
          metaTitle: data?.title as string,
          metaDescription: activePost?.text as string,
        },
        image:
          `${process.env.NEXT_PUBLIC_ADMIN_URL}${activePost?.image?.url}` as string,
        // TODO: Fix url
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${data?.page?.slug}/${data?.slug}/${activePost?.slug}`,
      }}
    >
      <Container py={8}>
        <h1>{data?.title}</h1>
        {source && <Markdown source={source} />}
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
          <PostContainer
            onOpen={onOpen}
            onSetActivePost={handleSetActivePost}
          />
          <Box w={{ base: 'full', lg: '300px' }}>
            <TweetWidget />
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default HashtagView
