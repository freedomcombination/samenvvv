import React from 'react'

import { AspectRatio, Spacer, Stack } from '@chakra-ui/react'

import { useCheckCharacterCount } from '@hooks'

import { ChakraNextImage } from '../ChakraNextImage'
import { PostContainerTags } from '../PostContainerTags'
import { PostTextarea } from '../PostTextarea'

interface PostContainerBodyProps {
  post: IHashtagPost
}

export const PostContainerBody = ({ post }: PostContainerBodyProps) => {
  const [, isCharacterCountExceeded] = useCheckCharacterCount()

  return (
    <Stack
      flex={1}
      data-tour="step-post-content"
      data-tour-mob="step-post-content"
      p={4}
      rounded="sm"
      borderWidth={1}
      bg={isCharacterCountExceeded ? 'red.50' : 'gray.50'}
      borderColor={isCharacterCountExceeded ? 'red.500' : 'gray.200'}
      fontSize="md"
    >
      <PostTextarea />
      <PostContainerTags post={post} />
      <Spacer />
      {post?.image && (
        <AspectRatio
          rounded="md"
          pos="relative"
          ratio={1200 / 675}
          overflow="hidden"
          flexShrink={0}
          borderColor="gray.300"
          borderWidth={1}
        >
          <ChakraNextImage h={'100%'} image={post?.image.url} />
        </AspectRatio>
      )}
    </Stack>
  )
}
