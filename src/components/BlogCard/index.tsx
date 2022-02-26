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
  blog: BlogEntity
  isFeatured: boolean
}

export const BlogCard = ({ blog, isFeatured }: BlogCardProps) => {
  const { locale } = useRouter()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const featured = isFeatured && !isMobile
  const { formattedDate } = useLocaleTimeFormat(blog?.attributes?.publishedAt)
  const readingTime = getReadingTime(
    blog?.attributes?.content as string,
    locale as CommonLocale,
  )

  return (
    <Navigate
      gridColumn={{
        base: undefined,
        lg: featured ? 'span 2' : undefined,
      }}
      href={`/blog/${blog?.attributes?.slug}`}
    >
      <Box
        shadow="primary"
        pos="relative"
        bg="white"
        rounded="sm"
        overflow="hidden"
      >
        {blog?.attributes?.image?.data?.attributes && (
          <ChakraNextImage
            minH={featured ? 450 : 200}
            image={blog?.attributes?.image}
          />
        )}
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
                <Text>{formattedDate}</Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} />
                <Text>{readingTime}</Text>
              </HStack>
            </HStack>
            <HStack>
              {blog?.attributes?.likes && (
                <HStack>
                  <Box as={FaHeart} />
                  <Text>{blog?.attributes?.likes}</Text>
                </HStack>
              )}
              {blog?.attributes?.views && (
                <HStack>
                  <Box as={FaEye} />
                  <Text>{blog?.attributes?.views}</Text>
                </HStack>
              )}
            </HStack>
          </Wrap>
          <Heading as="h3" size="md">
            {blog?.attributes?.title}
          </Heading>
          <Text noOfLines={2}>
            {RemoveMarkdown(blog?.attributes?.content || '')}
          </Text>
        </Stack>
      </Box>
    </Navigate>
  )
}
