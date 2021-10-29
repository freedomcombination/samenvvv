import { AspectRatio } from '@chakra-ui/react'

import { ChakraNextImage, Container, Layout } from '@components'

interface HashtagPostProps {
  slug: Record<string, string[]>
  pageData: IHashtagPost
}

const HashtagPostView = ({ pageData }: HashtagPostProps): JSX.Element => {
  return (
    <Layout>
      <Container>
        <p>{pageData.text}</p>
        {pageData.image && <ChakraNextImage image={pageData.image} />}
        <AspectRatio ratio={2}>
          <ChakraNextImage
            h={300}
            image={pageData.image?.url as string}
            alt={pageData.hashtag?.title}
          />
        </AspectRatio>
      </Container>
    </Layout>
  )
}

export default HashtagPostView
