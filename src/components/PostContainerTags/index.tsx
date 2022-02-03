import React from 'react'

import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import {
  removeMentionUsername,
  removeTrendName,
  useAppDispatch,
  useAppSelector,
} from '@store'

import { TagList } from '../TagList'

interface PostContainerTagsProps {
  post: IHashtagPost
}

export const PostContainerTags = ({ post }: PostContainerTagsProps) => {
  const { mentionUsernames, trendNames } = useAppSelector(
    state => state.postShare,
  )
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onRemoveMention = (mention: string) => {
    dispatch(removeMentionUsername(mention))
  }
  const onRemoveTrend = (trend: string) => {
    dispatch(removeTrendName(trend))
  }

  return (
    <Box mt={2} data-tour-mob="step-post-added" data-tour="step-post-added">
      {mentionUsernames?.length > 0 && (
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
      )}
      <Box mb={2}>
        <Text color="gray.500" fontSize="sm">
          {t`post-share.trends-label`}
        </Text>
        <TagList
          tags={[
            post?.hashtag?.hashtag as string,
            post?.hashtag?.hashtag_extra as string,
            ...trendNames,
          ]}
          onClickButton={onRemoveTrend}
        />
      </Box>
    </Box>
  )
}
