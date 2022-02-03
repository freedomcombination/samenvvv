import React from 'react'

import { Box, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { getItemLink } from '@utils'

import { ChakraNextImage } from '../ChakraNextImage'
import { Navigate } from '../Navigate'

interface OtherPostListProps {
  post: IHashtagPost
}

export const OtherPostList = ({ post }: OtherPostListProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <Box
      pos="relative"
      w={{ base: 'full', lg: 150 }}
      h={{ base: 115, lg: 'full' }}
      overflow="hidden"
    >
      <Stack
        pos="absolute"
        top={0}
        left={0}
        h="full"
        w="full"
        data-tour="step-other-posts"
        data-tour-mob="step-other-posts"
      >
        <Text color="gray.500" fontSize="sm">{t`post-share.other-posts`}</Text>
        <Stack
          direction={{ base: 'row', lg: 'column' }}
          h="full"
          w="full"
          overflowY={{ base: 'hidden', lg: 'auto' }}
          overflowX={{ base: 'auto', lg: 'hidden' }}
        >
          {post?.posts?.slice(0, 15).map((p, i) => {
            p.hashtag = post.hashtag

            return (
              <Box
                key={i}
                rounded="md"
                shadow="base"
                overflow="hidden"
                flexShrink={0}
              >
                <Navigate href={getItemLink(p, locale as string) as string}>
                  <ChakraNextImage
                    w={150}
                    h={85}
                    image={p.image?.url as string}
                  />
                </Navigate>
              </Box>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
}
