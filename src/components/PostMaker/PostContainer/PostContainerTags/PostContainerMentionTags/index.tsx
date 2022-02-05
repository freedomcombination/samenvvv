import { Box, Text } from '@chakra-ui/react'

import { TagList } from '@components'
import { removeMentionUsername, useAppDispatch, useAppSelector } from '@store'

export const PostContainerMentionTags = () => {
  const { mentionUsernames } = useAppSelector(state => state.postShare)

  const dispatch = useAppDispatch()

  const onRemoveMention = (mention: string) => {
    dispatch(removeMentionUsername(mention))
  }

  if (mentionUsernames.length === 0) return <></>

  return (
    <Box mb={2}>
      <Text color="gray.500" fontSize="sm">
        Mentions
      </Text>
      <TagList
        tags={mentionUsernames}
        onClickButton={onRemoveMention}
        colorScheme="primary"
      />
    </Box>
  )
}
