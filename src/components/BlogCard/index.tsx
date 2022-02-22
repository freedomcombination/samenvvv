import {
  Box,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaCalendarDay, FaClock, FaEye, FaHeart } from 'react-icons/fa'
import RemoveMarkdown from 'remove-markdown'

import { ChakraNextImage, Navigate } from '@components'
import { useLocaleTimeFormat } from '@hooks'
import { getReadingTime } from '@utils'

interface BlogCardProps {
  post: IPost
  isFeatured: boolean
}

export const BlogCard = ({ post, isFeatured }: BlogCardProps) => {
  const { locale } = useRouter()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const featured = isFeatured && !isMobile
  const [date] = useLocaleTimeFormat(post.published_at)
  const readingTime = getReadingTime(post.content, locale as CommonLocale)

  return (
    <Navigate
      gridColumn={{
        base: undefined,
        lg: featured ? 'span 2' : undefined,
      }}
      href={`/blog/${post.slug}`}
    >
      <Box
        shadow="primary"
        pos="relative"
        bg="white"
        rounded="sm"
        overflow="hidden"
      >
        <ChakraNextImage
          minH={featured ? 450 : 200}
          image={post.image?.url as string}
        />
        <Stack
          rounded="sm"
          mx={{ base: 4, lg: 8 }}
          mb={{ base: 4, lg: 8 }}
          mt={-8}
          maxW={600}
          pos="relative"
          bg="white"
          px={6}
          spacing={4}
          py={featured ? 6 : 4}
          {...(featured && {
            pos: 'absolute',
            bottom: 8,
            right: 0,
            m: 0,
          })}
        >
          <Wrap
            justify={{ base: 'center', md: 'space-between' }}
            fontSize="sm"
            color="gray.500"
          >
            <HStack>
              <HStack>
                <Icon as={FaCalendarDay} />
                <Text>{date}</Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} />
                <Text>{readingTime}</Text>
              </HStack>
            </HStack>
            <HStack>
              {post.likes && (
                <HStack>
                  <Box as={FaHeart} />
                  <Text>{post.likes}</Text>
                </HStack>
              )}
              {post.views && (
                <HStack>
                  <Box as={FaEye} />
                  <Text>{post.views}</Text>
                </HStack>
              )}
            </HStack>
          </Wrap>
          <Heading as="h3" size="md">
            {post.title}
          </Heading>
          <Text noOfLines={2}>{RemoveMarkdown(post.content)}</Text>
        </Stack>
      </Box>
    </Navigate>
  )
}
