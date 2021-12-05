import { useMemo } from 'react'

import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { TagList } from '@components'
import { addTrend, useAppDispatch, useAppSelector } from '@store'

// TODO: Data should be fetched from API
const EXAMPLE_TRENDS = [
  'Example Trend',
  '#AnotherExampleTrend',
  'TheBest Hashtag',
]

export const TrendList = (): JSX.Element => {
  const { t } = useTranslation()
  const { trends } = useAppSelector(state => state.postShare)
  const dispatch = useAppDispatch()

  const onAddTrend = (value: string) => {
    dispatch(addTrend(value))
  }

  const currentTrendList = useMemo(
    () => EXAMPLE_TRENDS?.filter(t => !trends.includes(t)),
    [trends],
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
      >
        <TagList
          tags={currentTrendList}
          onClickButton={onAddTrend}
          action="add"
        />
      </VStack>
    </VStack>
  )
}
