import { useEffect, useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  Tooltip,
  usePrevious,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

import { MentionListSkeleton } from '@components'
import { addMention, useAppDispatch, useAppSelector } from '@store'
import { useMentionList } from 'src/lib/getData/getMentionList'

export const MentionList = (): JSX.Element => {
  const [mentionListState, setMentionListState] = useState<IMention[]>([])
  const { mentions, mentionSearchKey } = useAppSelector(
    state => state.postShare,
  )
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const prevSearchKey = usePrevious(mentionSearchKey)

  const {
    data: mentionList,
    isLoading,
    isFetched,
    isError,
    isPreviousData,
  } = useMentionList()

  // Query hook won't be triggered automatically
  // It's supposed to fetch data from twitter
  // if user can't find any mention from our db
  const {
    isLoading: isTwitterFetchLoading,
    data: mentionListFromTwitter,
    refetch,
  } = useQuery<Pick<IMention, 'username' | 'user_data'>[]>(
    'search-mentions',
    async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/mentions/search?username=${mentionSearchKey}`,
      )
      const rawData = (await response.json()) as ITweetUserData[]
      const sortedData = rawData.sort(
        (a, b) => b.followers_count - a.followers_count,
      )
      return sortedData.map(user => ({
        username: user.screen_name,
        user_data: user,
      }))
    },
    {
      enabled: false,
    },
  )

  useEffect(() => {
    if (mentionSearchKey.length > 1) {
      const filteredData =
        mentionList?.filter(m =>
          m.username.toLowerCase().includes(mentionSearchKey.toLowerCase()),
        ) ?? []

      if (filteredData.length === 0) {
        refetch()
      }

      setMentionListState(filteredData as IMention[])
    }

    if (prevSearchKey && mentionSearchKey.length < 2) {
      setMentionListState(mentionList as IMention[])
    }
  }, [mentionSearchKey, mentionList, prevSearchKey, refetch])

  // Ony at the first time fill the state with fetched tada
  useEffect(() => {
    if (!isPreviousData && isFetched && mentionList)
      setMentionListState(mentionList as IMention[])
  }, [isFetched, mentionList, isPreviousData])

  const onAddMention = (mention: string) => {
    dispatch(addMention(mention))
  }

  const currentMentionList = [
    ...mentionListState,
    ...(isError ? [] : mentionListFromTwitter ?? []),
  ]?.filter(m => !mentions.includes(m.username))

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
        {isLoading || isTwitterFetchLoading ? (
          <MentionListSkeleton />
        ) : (
          currentMentionList?.map(({ username, user_data }, i) => (
            <Tooltip
              overflow="hidden"
              placement="auto-end"
              key={i}
              bg="white"
              color="black"
              minW={200}
              rounded="lg"
              py={2}
              textAlign="center"
              label={
                <VStack>
                  <Avatar
                    name={username}
                    size="lg"
                    src={user_data?.profile_image_url_https}
                  />
                  <Box fontWeight="bold">
                    <Text>{user_data?.screen_name}</Text>
                    <Text color="twitter.400">@{username}</Text>
                  </Box>

                  <Box>
                    <Text>Followers</Text>
                    <Text>{user_data?.followers_count}</Text>
                  </Box>
                </VStack>
              }
            >
              <HStack
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
            </Tooltip>
          ))
        )}
      </VStack>
    </>
  )
}
