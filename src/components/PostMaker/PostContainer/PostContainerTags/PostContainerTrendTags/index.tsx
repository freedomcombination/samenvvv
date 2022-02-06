import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { TagList } from '@components'
import { removeTrendName, useAppDispatch, useAppSelector } from '@store'

export const PostContainerTrendTags = () => {
  const { trendNames, defaultHashtags } = useAppSelector(
    state => state.postShare,
  )

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onRemoveTrend = (trend: string) => {
    dispatch(removeTrendName(trend))
  }

  if (trendNames.length === 0 && !defaultHashtags[0]) return <></>

  const tags = [...defaultHashtags, ...trendNames].filter(t => t) as string[]

  return (
    <Box mb={2}>
      <Text color="gray.500" fontSize="sm">
        {t`post-share.trends-label`}
      </Text>
      <TagList tags={tags} onClickButton={onRemoveTrend} />
    </Box>
  )
}
