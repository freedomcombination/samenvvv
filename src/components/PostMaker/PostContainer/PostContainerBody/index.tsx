import { Box, Spacer, Stack } from '@chakra-ui/react'

import { ChakraNextImage } from '@components'
import { useAppSelector } from '@store'

import { PostContainerTags } from '../PostContainerTags'
import { PostTextarea } from '../PostTextarea'

export const PostContainerBody = () => {
  const { currentPost } = useAppSelector(state => state.postShare)
  return (
    <Stack
      flex={1}
      data-tour="step-post-content"
      data-tour-mob="step-post-content"
      p={4}
      rounded="sm"
      borderWidth={1}
      fontSize="md"
    >
      <PostTextarea />
      <PostContainerTags />
      <Spacer />
      {currentPost!.image && (
        <Box
          rounded="md"
          overflow="hidden"
          borderColor="gray.300"
          borderWidth={1}
        >
          <ChakraNextImage
            ratio="twitter"
            h={'100%'}
            image={currentPost!.image.url}
          />
        </Box>
      )}
    </Stack>
  )
}
