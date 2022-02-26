import { useState } from 'react'

import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import useDebounce from '@rooks/use-debounce'
import { useTranslation } from 'react-i18next'
import { FaSearch } from 'react-icons/fa'

import {
  clearSearchedMentions,
  // fetchSearchedMentions,
  resetMentions,
  setMentions,
  useAppDispatch,
  useAppSelector,
} from '@store'

export const MentionSearch = (): JSX.Element => {
  const { mentions } = useAppSelector(state => state.postShare)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [searchArea, setSearchArea] = useState<string>('')

  const onSearchMention = useDebounce(() => {
    if (searchArea.length > 1) {
      const filteredData =
        mentions?.filter(m =>
          m.attributes?.data?.screen_name
            .toLowerCase()
            .includes(searchArea.toLowerCase()),
        ) ?? []
      dispatch(setMentions(filteredData))
      // if (filteredData.length === 0) {
      //   dispatch(fetchSearchedMentions(searchArea))
      // }
    } else {
      dispatch(clearSearchedMentions())
      dispatch(resetMentions())
    }
  }, 600)

  return (
    <InputGroup data-tour="step-search">
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
        onChange={event => {
          setSearchArea(event.target.value)
          onSearchMention()
        }}
        value={searchArea}
        _focus={{
          borderBottomWidth: 2,
          borderBottomColor: 'gray.300',
        }}
      />
    </InputGroup>
  )
}
