import { useMemo } from 'react'

import {
  Box,
  HStack,
  Spinner,
  Tag,
  TagLabel,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useFindHashtagInTrends, useTrends } from '@lib'
import { addTrendName, useAppDispatch, useAppSelector } from '@store'
import { formatNumber } from '@utils'

interface TrendListProps {
  hashtag?: string
}

export const TrendList = ({ hashtag }: TrendListProps): JSX.Element => {
  const { t } = useTranslation()
  const { trendNames } = useAppSelector(state => state.postShare)
  const dispatch = useAppDispatch()

  const { data: trends, isLoading } = useTrends()
  const hashtagInTrends = useFindHashtagInTrends(hashtag)

  const onAddTrendName = (value: string) => {
    dispatch(addTrendName(value))
  }

  const currentTrendList = useMemo(
    () => trends?.filter(trend => !trendNames.includes(trend.name)),
    [trendNames, trends],
  )

  return (
    <VStack w="full" align="stretch">
      <Text color="gray.500" fontSize="sm">{t`post-share.trends-label`}</Text>
      <VStack
        align="stretch"
        rounded="lg"
        borderColor="gray.500"
        borderWidth={1}
        bg="white"
        overflowY="auto"
        p={4}
        maxH={200}
      >
        {isLoading || !currentTrendList ? (
          <Spinner />
        ) : (
          <Wrap>
            {currentTrendList.map((tag, i) => {
              const isCurrentHashtag = hashtagInTrends?.name === tag.name
              return (
                <Tag
                  rounded="full"
                  key={i}
                  variant={isCurrentHashtag ? 'outline' : 'outline'}
                  colorScheme={isCurrentHashtag ? 'blackAlpha' : 'primary'}
                  onClick={() => !isCurrentHashtag && onAddTrendName(tag.name)}
                  cursor={isCurrentHashtag ? 'not-allowed' : 'pointer'}
                  py={1}
                >
                  <TagLabel as={HStack}>
                    <Box>{i > 2 ? i - 2 : '🌎'}</Box>
                    <Box>{tag.name}</Box>
                    {tag.tweet_volume && (
                      <Box fontSize="0.8em">
                        ({formatNumber(tag.tweet_volume)})
                      </Box>
                    )}
                  </TagLabel>
                </Tag>
              )
            })}
          </Wrap>
        )}
      </VStack>
    </VStack>
  )
}
