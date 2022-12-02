import { memo } from 'react'

import { Flex, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaRandom } from 'react-icons/fa'

import { useRandomPostContent } from '@hooks'

import { Caps } from './Caps'
import { PostCharCount } from './PostCharCount'
import { PostContainerBody } from './PostContainerBody'
import { PostContainerButtons } from './PostContainerButtons'

export const PostContainer = memo<{ post: IHashtagPost }>(
  function PostContainer({ post }) {
    const { t } = useTranslation()

    const generateRandomPostContent = useRandomPostContent(post)

    return (
      <Stack
        p={4}
        shadow="primary"
        bg="orange.50"
        align="stretch"
        spacing={4}
        flex={1}
        direction={{ base: 'column', lg: 'row' }}
      >
        <VStack align="stretch" flex="1">
          <Flex justify="space-between">
            <Text
              color="gray.500"
              fontSize="sm"
            >{t`post-share.content-label`}</Text>
            <PostCharCount />
          </Flex>
          <Stack
            spacing={0}
            overflow="auto"
            pos="relative"
            h={{ base: 470, xl: 520 }}
          >
            <IconButton
              pos="absolute"
              top={1}
              right={1}
              rounded="full"
              colorScheme="twitter"
              aria-label="random post"
              icon={<FaRandom />}
              onClick={generateRandomPostContent}
            />
            <PostContainerBody post={post} />
          </Stack>
          <PostContainerButtons post={post} />
        </VStack>
        <Caps post={post} />
      </Stack>
    )
  },
)
