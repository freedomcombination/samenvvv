import {
  Box,
  Tag,
  // TagCloseButton,
  TagLabel,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { TagList } from '@components'
import {
  // removeDefaultHashtag,
  removeTrendName,
  useAppDispatch,
  useAppSelector,
} from '@store'

export const PostContainerTrendTags = () => {
  const { trendNames, defaultHashtags } = useAppSelector(
    state => state.postShare,
  )

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onRemoveTrend = (trend: string) => {
    dispatch(removeTrendName(trend))
  }

  // const onRemoveDefaultHashtag = (trend: string) => {
  //   dispatch(removeDefaultHashtag(trend))
  // }

  if (trendNames.length === 0 && !defaultHashtags[0]) return <></>

  return (
    <Box mb={2}>
      <Text color="gray.500" fontSize="sm">
        {t`post-share.trends-label`}
      </Text>
      {defaultHashtags.length > 0 && (
        <Wrap>
          {defaultHashtags.map(
            (tag, i) =>
              (tag != null || tag !== '') && (
                <Tag rounded="full" key={i} variant="outline">
                  <TagLabel>{tag}</TagLabel>
                  {/* TODO Allow remove if the hashtag date is past */}
                  {/* <TagCloseButton onClick={() => onRemoveDefaultHashtag(tag)} /> */}
                </Tag>
              ),
          )}
        </Wrap>
      )}
      <TagList tags={trendNames} onClickButton={onRemoveTrend} />
    </Box>
  )
}
