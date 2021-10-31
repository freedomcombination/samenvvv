import { useMemo } from 'react'

import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { MentionListSkeleton } from '@components'
import {
  addMention,
  checkCharacterCount,
  useAppDispatch,
  useAppSelector,
} from '@store'
import { useMentionList } from 'src/lib/getData/getMentionList'

export const MentionList = (): JSX.Element => {
  const { data: mentionList, isLoading } = useMentionList()
  const { mentions, postContent } = useAppSelector(state => state.postShare)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onAddMention = (mention: string) => {
    dispatch(addMention(mention))
    dispatch(checkCharacterCount(postContent))
  }

  const currentMentionList = useMemo(
    () => mentionList?.filter(m => !mentions.includes(m.username)),
    [mentionList, mentions],
  )

  return (
    <>
      <Text
        color="gray.500"
        fontSize="sm"
      >{t`post-share.mention-list-label`}</Text>
      <VStack
        minH="0"
        h={400}
        align="stretch"
        rounded="lg"
        borderColor="gray.500"
        borderWidth={1}
        bg="white"
        overflowY="auto"
      >
        {isLoading ? (
          <MentionListSkeleton />
        ) : (
          currentMentionList?.map(({ username, user_data }, i) => (
            <HStack
              key={i}
              px={4}
              py={2}
              cursor="pointer"
              transition="all 0.3s ease-in-out"
              _hover={{
                bg: 'yellow.50',
                shadow: 'lg',
              }}
            >
              <HStack flex="1" fontSize="sm">
                <Avatar
                  name={username}
                  src={user_data?.profile_image_url_https}
                  size="sm"
                />
                <Box>
                  <Text isTruncated maxW="120px">
                    {user_data?.screen_name ?? username} asd asdasda ds asdasd{' '}
                  </Text>
                  <Text>@{username}</Text>
                </Box>
              </HStack>
              <Button
                variant="outline"
                onClick={() => onAddMention(username)}
                colorScheme="primary"
                rounded="full"
                size="sm"
              >{t`post-share.add`}</Button>
            </HStack>
          ))
        )}
      </VStack>
    </>
  )
}
