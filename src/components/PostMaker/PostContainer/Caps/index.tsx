import React, { memo, useEffect, useState } from 'react'

import { Box, Center, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FaCheck } from 'react-icons/fa'

import { getItemLink } from '@utils'

import { ChakraNextImage } from '../../../Shared/ChakraNextImage'
import { Navigate } from '../../../Shared/Navigate'

export const Caps = memo<{ post: IHashtagPost }>(function Caps({ post }) {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [shared, setShared] = useState<string[]>([])

  useEffect(() => {
    const sharedStorage = localStorage.getItem(post.hashtag?.slug as string)
    if (sharedStorage) {
      setShared(JSON.parse(sharedStorage))
    }
  }, [post.hashtag?.slug])

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
          {post.posts?.slice(0, 15).map((post, i) => {
            return (
              <Navigate
                key={i}
                href={getItemLink(post, locale as CommonLocale) as string}
              >
                <Box
                  rounded="md"
                  shadow="primary"
                  overflow="hidden"
                  flexShrink={0}
                  position="relative"
                >
                  <ChakraNextImage
                    w={150}
                    h={85}
                    image={post.image?.url as string}
                  />
                  {shared.includes(post.slug as string) && (
                    <Center
                      pos="absolute"
                      top={0}
                      left={0}
                      boxSize="full"
                      bg="green.600"
                      blendMode="multiply"
                    >
                      <Box color="white" fontSize="2xl" as={FaCheck} />
                    </Center>
                  )}
                </Box>
              </Navigate>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
})
