import { useEffect } from 'react'

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { MentionListItem, MentionListSkeleton } from '@components'
import {
  addMentionUsername,
  clearMentionSearchKey,
  clearTwitterUsers,
  fetchMentions,
  removeSavedMention,
  resetMentions,
  updateSaveTwitterUsers,
  useAppDispatch,
  useAppSelector,
} from '@store'

export const MentionList = (): JSX.Element => {
  const {
    mentions,
    mentionUsernames,
    initialMentions,
    isMentionListLoading,
    isTwitterUsersLoading,
    twitterUsers,
    savedTwitterUsers,
  } = useAppSelector(state => state.postShare)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    if (!initialMentions || initialMentions.length === 0) {
      dispatch(fetchMentions())
    }
  }, [initialMentions, dispatch])

  const onAddMention = (value: ITweetUserData) => {
    if (value.screen_name) {
      dispatch(addMentionUsername(value.screen_name))
      dispatch(clearMentionSearchKey())
      dispatch(resetMentions())
    }
  }

  const onRemoveMention = (value: ITweetUserData) => {
    if (value.screen_name) {
      dispatch(removeSavedMention(value.screen_name))
      dispatch(resetMentions())
    }
  }

  const onAddUserMention = (value: ITweetUserData) => {
    onAddMention(value)
    dispatch(updateSaveTwitterUsers(value))
    dispatch(clearTwitterUsers())
  }

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
        {isTwitterUsersLoading ? (
          <MentionListSkeleton />
        ) : twitterUsers.length > 0 ? (
          twitterUsers.map((user_data, i) => (
            <MentionListItem
              key={i}
              user_data={user_data}
              onAddItem={onAddUserMention}
            />
          ))
        ) : (
          <Tabs
            size="sm"
            isFitted
            colorScheme="primary"
            variant="line"
            bg="white"
          >
            <TabList zIndex="tooltip" pos="sticky" top="0" bg="white">
              <Tab py={2} fontWeight="bold">
                {t`post-share.mention-tab-popular`}
              </Tab>
              <Tab py={2} fontWeight="bold">
                {t`post-share.mention-tab-saved`}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                {isMentionListLoading ? (
                  <MentionListSkeleton />
                ) : (
                  mentions
                    .filter(
                      user_data =>
                        !mentionUsernames.includes(
                          '@' + user_data.user_data?.screen_name,
                        ),
                    )
                    ?.map(({ user_data }, i) => (
                      <MentionListItem
                        key={i}
                        user_data={user_data as ITweetUserData}
                        onAddItem={onAddMention}
                      />
                    ))
                )}
              </TabPanel>
              <TabPanel p={0}>
                {savedTwitterUsers
                  .filter(
                    user_data =>
                      !mentionUsernames.includes('@' + user_data.screen_name),
                  )
                  ?.map((user_data, i) => (
                    <MentionListItem
                      key={i}
                      user_data={user_data}
                      onRemoveItem={onRemoveMention}
                      onAddItem={onAddMention}
                    />
                  ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </VStack>
    </>
  )
}
