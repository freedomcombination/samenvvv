import { useEffect } from 'react'

import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { TagList } from '@components'
import {
  removeDefaultMention,
  removeMentionUsername,
  setDefaultMention,
  useAppDispatch,
  useAppSelector,
} from '@store'

const defaultMentions = {
  tr: 'samenvvvTR',
  en: 'samenvvvEN',
  nl: 'samenvvv',
}

export const PostContainerMentionTags = () => {
  const { mentionUsernames, defaultMention } = useAppSelector(
    state => state.postShare,
  )

  const dispatch = useAppDispatch()

  const onRemoveMention = (mention: string) => {
    if (mention === defaultMention) dispatch(removeDefaultMention())
    else dispatch(removeMentionUsername(mention))
  }

  const { locale } = useRouter()

  useEffect(() => {
    const defaultM = defaultMentions[locale as CommonLocale]
    if (!defaultMention || defaultMention !== defaultM)
      dispatch(setDefaultMention(defaultM))
  }, [locale, dispatch])

  if (!defaultMention && mentionUsernames.length === 0) return <></>

  return (
    <Box mb={2}>
      <Text color="gray.500" fontSize="sm">
        Mentions
      </Text>
      <TagList
        tags={
          defaultMention
            ? [defaultMention, ...mentionUsernames]
            : mentionUsernames
        }
        onClickButton={onRemoveMention}
        colorScheme="primary"
      />
    </Box>
  )
}
