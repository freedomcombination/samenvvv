import { memo } from 'react'

import { Box, Spacer, Stack } from '@chakra-ui/react'

import { ChakraNextImage } from '@components'

import { PostContainerTags } from '../PostContainerTags'
import { PostTextarea } from '../PostTextarea'

export const PostContainerBody = memo<{ post: HashtagPostEntity }>(
  function PostContainerBody({ post }) {
    return (
      <Stack
        flex={1}
        data-tour="step-post-content"
        data-tour-mob="step-post-content"
        p={4}
        rounded="sm"
        borderWidth={1}
        fontSize="md"
        bg="white"
      >
        <PostTextarea />
        <PostContainerTags />
        <Spacer />
        {post?.attributes?.image?.data?.attributes && (
          <Box
            rounded="md"
            overflow="hidden"
            borderColor="gray.300"
            borderWidth={1}
          >
            <ChakraNextImage
              ratio="twitter"
              h={'100%'}
              image={post?.attributes?.image}
            />
          </Box>
        )}
      </Stack>
    )
  },
)
