import React, { memo } from 'react'

import { Box, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { ROUTES } from '@config'

import { ChakraNextImage } from '../../../Shared/ChakraNextImage'
import { Navigate } from '../../../Shared/Navigate'

export const Caps = memo<{ hashtag: HashtagEntity }>(function Caps({
  hashtag,
}) {
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
          {hashtag?.attributes?.posts?.data?.slice(0, 15).map((post, i) => {
            return (
              <Box
                key={i}
                rounded="md"
                shadow="primary"
                overflow="hidden"
                flexShrink={0}
              >
                <Navigate
                  href={`${ROUTES.hashtag[locale as CommonLocale].link}/${
                    hashtag.attributes?.slug
                  }/${post.attributes?.slug}`}
                >
                  {post?.attributes?.image?.data?.attributes && (
                    <ChakraNextImage
                      w={150}
                      h={85}
                      image={post?.attributes?.image}
                    />
                  )}
                </Navigate>
              </Box>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
})
