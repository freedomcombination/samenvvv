import { AspectRatio, Box, SimpleGrid, Text } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import {
  ChakraNextImage,
  Container,
  Layout,
  Markdown,
  Navigate,
} from '@components'

interface HashtagProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IHashtag
}

const HashtagView = ({ source, pageData }: HashtagProps): JSX.Element => {
  return (
    <Layout>
      <Container>
        <h1>{pageData?.title}</h1>
        {source && <Markdown source={source} />}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
          {pageData?.posts?.map(post => (
            <Box key={post.id} p={4} boxShadow="lg">
              <Navigate
                href={`/${pageData.page?.slug}/${pageData.slug}/${post.slug}`}
              >
                <Text>{post.text}</Text>
                <AspectRatio ratio={2}>
                  <ChakraNextImage
                    h={300}
                    image={post.image?.url as string}
                    alt={post.hashtag?.title}
                  />
                </AspectRatio>
              </Navigate>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default HashtagView
