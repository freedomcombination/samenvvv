import { useMemo } from 'react'

import {
  Box,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import {
  addTrend,
  checkCharacterCount,
  useAppDispatch,
  useAppSelector,
} from '@store'

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

  const onAddTrend = (trend: string) => {
    dispatch(addTrend(trend))
    dispatch(checkCharacterCount())
  }

  const currentTrendList = useMemo(
    () => EXAMPLE_TRENDS?.filter(t => !trends.includes(t)),
    [trends],
  )

  return (
    <Box>
      <Text color="gray.500" fontSize="sm">{t`post-share.trends-label`}</Text>
      <VStack
        align="stretch"
        w={300}
        rounded="lg"
        borderColor="gray.500"
        borderWidth={1}
        bg="white"
        overflowY="auto"
      >
        <Wrap p={4}>
          {currentTrendList.map((trend, i) => (
            <Tag
              cursor="pointer"
              rounded="full"
              key={i}
              colorScheme="primary"
              variant="subtle"
              onClick={() => onAddTrend(trend)}
            >
              <TagLabel>{trend ?? 'Test'}</TagLabel>
              <TagCloseButton transform="rotate(45deg)" />
            </Tag>
          ))}
        </Wrap>
      </VStack>
    </Box>
  )
}
