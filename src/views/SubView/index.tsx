import { Box, Flex, Heading, HStack } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import {
  ChakraNextImage,
  Container,
  Layout,
  Markdown,
  PagePagination,
  PageTimeLabel,
  ShareButtons,
} from '@components'
import { SubpageSidebarTabs } from 'src/components/SubpageSidebarTabs'

interface SubViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: ISubpage
  seo: NextSeoProps
  link: string
}

const SubView = ({
  source,
  pageData,
  seo,
  link,
}: SubViewProps): JSX.Element => {
  return (
    <Layout seo={seo}>
      <Container>
        <Flex py={4}>
          <Flex flexDir="column" flex={1}>
            {pageData.image && (
              <ChakraNextImage h="300px" image={pageData.image} />
            )}
            <HStack align="center" mt={4} spacing={8}>
              <PageTimeLabel pageData={pageData} />
              <ShareButtons
                title={pageData.title}
                quote={pageData.content}
                url={link}
              />
            </HStack>
            <Heading my={4}>{pageData.title}</Heading>
            <Box flex={1}>{source && <Markdown source={source} />}</Box>
            <PagePagination subpage={pageData} />
          </Flex>

          {pageData.page && (
            <Box ml={8} w="350px" display={{ base: 'none', md: 'inherit' }}>
              <SubpageSidebarTabs page={pageData.page} />
            </Box>
          )}
        </Flex>
      </Container>
    </Layout>
  )
}

export default SubView
