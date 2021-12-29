import { useEffect } from 'react'

import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'
import { FaEye } from 'react-icons/fa'

import {
  ChakraNextImage,
  Container,
  Layout,
  Markdown,
  PagePagination,
  PageTimeLabel,
  ShareButtons,
  SubpageSidebarTabs,
} from '@components'
import { useAppDispatch, useAppSelector } from '@store'
import { viewSubpage } from 'src/store/subpage'

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
  const dispatch = useAppDispatch()

  const { views } = useAppSelector(state => state.subpage)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (pageData?.content) {
      const isViewed = views.some(id => id === pageData.id)

      if (!isViewed) {
        timer = setTimeout(() => {
          dispatch(viewSubpage(pageData))
        }, 5000)
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [pageData, dispatch, views])

  return (
    <Layout seo={seo}>
      <Container>
        <Flex py={4}>
          <Flex flexDir="column" flex={1}>
            {pageData.image && (
              <ChakraNextImage h="300px" image={pageData.image} />
            )}
            <HStack justify="space-between" align="center" mt={4} spacing={8}>
              <PageTimeLabel pageData={pageData} />
              <HStack>
                <HStack display={{ base: 'none', sm: 'flex' }}>
                  <Box as={FaEye} />
                  <Text>{pageData.views}</Text>
                </HStack>
                <ShareButtons
                  title={pageData.title}
                  quote={pageData.content}
                  url={link}
                />
              </HStack>
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
