import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
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

  const { t } = useTranslation()

  const { data } = useHashtagQuery(
    locale as string,
    query?.slug?.[1] ?? '',
    pageData,
  )

  return (
    <Layout>
      <Container py={8}>
        <h1>{data?.title}</h1>
        {source && <Markdown source={source} />}
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justify="stretch"
          align="stretch"
          minH={0}
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
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <PostContainer onOpen={onOpen} />
          <Box w={300}>
            <TweetWidget />
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default HashtagView
