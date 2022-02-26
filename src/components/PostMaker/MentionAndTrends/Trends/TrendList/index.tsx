import {
  Box,
  HStack,
  SkeletonText,
  Tag,
  TagLabel,
  VStack,
  Wrap,
} from '@chakra-ui/react'

import {
  addTrendName,
  removeTrendName,
  useAppDispatch,
  useAppSelector,
} from '@store'
import { formatNumber } from '@utils'

interface TrendListProps {
  trends?: TrendData[] | null
  isLoading: boolean
  hashtagInTrends?: TrendData
  hashtagExtraInTrends?: TrendData
}

export const TrendList = ({
  trends,
  isLoading,
  hashtagInTrends,
  hashtagExtraInTrends,
}: TrendListProps): JSX.Element => {
  const { trendNames, defaultHashtags } = useAppSelector(
    state => state.postShare,
  )

  const dispatch = useAppDispatch()

  const onAddTrendName = (value: string) => {
    dispatch(addTrendName(value))
  }

  const onRemoveTrendName = (value: string) => {
    dispatch(removeTrendName(value))
  }

  return (
    <VStack align="stretch">
      {isLoading || !trends ? (
        <SkeletonText skeletonHeight={6} noOfLines={5} />
      ) : (
        <Wrap>
          {trends.map((tag, i) => {
            const isCurrentHashtag =
              hashtagInTrends?.name === tag.name ||
              hashtagExtraInTrends?.name === tag.name

            const isSelectedHashtag = [
              ...trendNames,
              ...defaultHashtags,
            ].includes(tag.name)

            const colorScheme = isCurrentHashtag
              ? 'twitter'
              : isSelectedHashtag
              ? 'blackAlpha'
              : 'primary'

            return (
              <Tag
                rounded="full"
                key={i}
                variant="outline"
                colorScheme={colorScheme}
                cursor="pointer"
                onClick={() => onAddTrendName(tag.name)}
                {...(isSelectedHashtag && {
                  onClick: () => onRemoveTrendName(tag.name),
                })}
                {...(isCurrentHashtag && {
                  cursor: 'not-allowed',
                  onClick: () => {},
                })}
                py={1}
              >
                <TagLabel as={HStack}>
                  <Box>{i + 1}</Box>
                  <Box>{tag.name}</Box>
                  {tag.tweet_volume && (
                    <Box fontSize="xs">({formatNumber(tag.tweet_volume)})</Box>
                  )}
                </TagLabel>
              </Tag>
            )
          })}
        </Wrap>
      )}
    </VStack>
  )
}
