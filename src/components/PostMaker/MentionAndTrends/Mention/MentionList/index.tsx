import { useEffect } from 'react'

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { MentionListSkeleton } from '@components'
import {
  addMentionUsername,
  clearSearchedMentions,
  fetchMentions,
  removeSavedMention,
  resetMentions,
  updateSavedSearchedMentions,
  useAppDispatch,
  useAppSelector,
} from '@store'

import { MentionListItem } from '../MentionListItem'
// import { MentionSearch } from '../MentionSearch'

export const MentionList = (): JSX.Element => {
  const {
    mentions,
    mentionUsernames,
    initialMentions,
    isMentionListLoading,
    isSearchedMentionsLoading,
    searchedMentions,
    savedMentions,
  } = useAppSelector(state => state.post)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if (!initialMentions || initialMentions.length === 0) {
      dispatch(fetchMentions(router.locale as StrapiLocale))
    }
  }, [initialMentions, router.locale, dispatch])

  const onAddMention = (value: TweetUserData) => {
    if (value.screen_name) {
      dispatch(addMentionUsername(value.screen_name))
      dispatch(resetMentions())
    }
  }

  const onRemoveMention = (value: TweetUserData) => {
    if (value.screen_name) {
      dispatch(removeSavedMention(value.screen_name))
      dispatch(resetMentions())
    }
  }

  const onAddUserMention = (value: TweetUserData) => {
    onAddMention(value)
    dispatch(updateSavedSearchedMentions(value))
    dispatch(clearSearchedMentions())
  }

  return (
    <VStack align="stretch" h="60%" data-tour="step-mention-list">
      <VStack
        minH="0"
        h="full"
        align="stretch"
        bg="white"
        overflowY="auto"
        shadow="primary"
      >
        <Tabs
          size="sm"
          isFitted
          colorScheme="primary"
          variant="line"
          bg="white"
        >
          <TabList pos="sticky" top="0" bg="white">
            <Tab>{t`post.mention-tab-popular`}</Tab>
            <Tab>{t`post.mention-tab-saved`}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              {/* <Box pos="sticky" top="31px">
                <MentionSearch />
              </Box> */}
              {isSearchedMentionsLoading || isMentionListLoading ? (
                <MentionListSkeleton />
              ) : searchedMentions.length > 0 ? (
                searchedMentions.map((data, i) => (
                  <MentionListItem
                    key={i}
                    data={data}
                    onAddItem={onAddUserMention}
                  />
                ))
              ) : (
                mentions
                  ?.filter(
                    mention =>
                      !mentionUsernames.includes(
                        '@' + mention.data?.screen_name,
                      ),
                  )
                  ?.map(({ data }, i) => (
                    <MentionListItem
                      key={i}
                      data={data as TweetUserData}
                      onAddItem={onAddMention}
                    />
                  ))
              )}
            </TabPanel>
            <TabPanel p={0}>
              {savedMentions
                .filter(
                  data => !mentionUsernames.includes('@' + data.screen_name),
                )
                ?.map((data, i) => (
                  <MentionListItem
                    key={i}
                    data={data}
                    onRemoveItem={onRemoveMention}
                    onAddItem={onAddMention}
                  />
                ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </VStack>
  )
}
