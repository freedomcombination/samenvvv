import { ChangeEvent, useCallback } from 'react'

import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaSearch } from 'react-icons/fa'

import {
  clearSearchedMentions,
  fetchSearchedMentions,
  resetMentions,
  setMentions,
  setMentionSearchKey,
  useAppDispatch,
  useAppSelector,
} from '@store'

export const MentionSearch = (): JSX.Element => {
  const { mentions, mentionSearchKey } = useAppSelector(
    state => state.postShare,
  )
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onSearchMention = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchKey = e.target.value

      dispatch(setMentionSearchKey(searchKey))

      if (searchKey.length > 1) {
        const filteredData =
          mentions?.filter(m =>
            m.user_data?.screen_name
              .toLowerCase()
              .includes(searchKey.toLowerCase()),
          ) ?? []

        dispatch(setMentions(filteredData))

        if (filteredData.length === 0) {
          dispatch(fetchSearchedMentions(searchKey))
        }
      } else {
        dispatch(clearSearchedMentions())
        dispatch(resetMentions())
      }
    },
    [mentions, dispatch],
  )

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Box color="gray.300" as={FaSearch} />
      </InputLeftElement>
      <Input
        bg="white"
        borderWidth={0}
        borderBottomWidth={2}
        rounded={0}
        id="mention-search"
        placeholder={t`post-share.search-label`}
        onChange={onSearchMention}
        value={mentionSearchKey}
        _focus={{
          borderBottomWidth: 2,
          borderBottomColor: 'gray.300',
        }}
      />
    </InputGroup>
  )
}
