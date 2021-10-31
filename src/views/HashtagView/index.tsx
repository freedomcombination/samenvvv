import { Box, HStack, VStack } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'

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
        <HStack justify="stretch" align="stretch" minH={0}>
          <VStack w={300} align="stretch">
            <MentionSearch />
            <MentionList />
            <TrendList />
          </VStack>
          <PostContainer />
          <Box w={300}>
            <TweetWidget />
          </Box>
        </HStack>
      </Container>
    </Layout>
  )
}

export default HashtagView
