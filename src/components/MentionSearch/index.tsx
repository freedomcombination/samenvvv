import { ChangeEvent, useCallback } from 'react'

import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import {
  clearTwitterUsers,
  fetchTwitterUsers,
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
          dispatch(fetchTwitterUsers(searchKey))
        }
      } else {
        dispatch(clearTwitterUsers())
        dispatch(resetMentions())
      }
    },
    [mentions, dispatch],
  )

  return (
    <Box>
      <FormControl>
        <FormLabel color="gray.500" fontSize="sm" htmlFor="mention-search">
          {t`post-share.search-label`}
        </FormLabel>
        <Input
          bg="white"
          borderColor="gray.500"
          id="mention-search"
          placeholder={t`post-share.search-label`}
          onChange={onSearchMention}
          value={mentionSearchKey}
          _focus={{ borderColor: 'gray.500', borderWidth: 2 }}
        />
      </FormControl>
    </Box>
  )
}
