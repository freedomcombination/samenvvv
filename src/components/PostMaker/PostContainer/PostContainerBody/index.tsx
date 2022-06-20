import { memo, useEffect } from 'react'

import { Box, Spacer, Stack } from '@chakra-ui/react'

import { ChakraNextImage } from '@components'
import { useGenerateRandomPostText } from '@hooks'
import { useAppSelector } from '@store'

import { PostContainerTags } from '../PostContainerTags'
import { PostTextarea } from '../PostTextarea'

const PostImage = memo(function PostImage({ image }: { image: string }) {
  return (
    <Box rounded="md" overflow="hidden" borderColor="gray.300" borderWidth={1}>
      <ChakraNextImage ratio="twitter" h={'100%'} image={image} />
    </Box>
  )
})

export const PostContainerBody = memo<{ post: IHashtagPost }>(
  function PostContainerBody({ post }) {
    const generateRandomPostText = useGenerateRandomPostText()
    const { isShared } = useAppSelector(state => state.postShare)

    useEffect(() => {
      generateRandomPostText(post)
    }, [post])

    return (
      <Stack
        flex={1}
        data-tour="step-post-content"
        data-tour-mob="step-post-content"
        p={4}
        rounded="sm"
        borderWidth={1}
        fontSize="md"
        borderColor={isShared ? 'green.500' : 'gray.200'}
        bg={isShared ? 'green.50' : 'white'}
      >
        <PostTextarea />
        <PostContainerTags />
        <Spacer />
        {post.image && <PostImage image={post.image.url} />}
      </Stack>
    )
  },
)
