import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaInfoCircle } from 'react-icons/fa'

import { TrendList } from '@components'
import { timeLocale } from '@config'
import { useFindHashtagInTrends, useTrendsData } from '@lib'

interface TrendListProps {
  hashtags: [string | undefined, string | undefined]
}

export const TrendListTabs = ({ hashtags }: TrendListProps): JSX.Element => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const hashtagInTrends = useFindHashtagInTrends(hashtags[0])
  const hashtagExtraInTrends = useFindHashtagInTrends(hashtags[1])

  const { data: trends, isLoading } = useTrendsData()

  const distance =
    trends?.updated_at &&
    formatDistanceToNow(new Date(trends?.updated_at), {
      locale: timeLocale[locale as string],
      addSuffix: true,
    })

  return (
    <VStack w="full" align="stretch" h="40%" pt={4}>
      <HStack pos="relative">
        <Text color="gray.500" fontSize="sm">{t`post-share.trends-label`}</Text>

        <Tooltip
          placement="top"
          label={distance}
          aria-label="Trends updated"
          hasArrow
        >
          <Box>
            <FaInfoCircle />
          </Box>
        </Tooltip>
      </HStack>

      <Box overflowY="auto" shadow="md" bg="white">
        <Tabs colorScheme="primary" isFitted size="sm">
          <TabList zIndex="tooltip" pos="sticky" top="0" bg="white">
            <Tab>World</Tab>
            <Tab>TR</Tab>
            <Tab>NL</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.en}
                hashtagInTrends={hashtagInTrends?.en}
                hashtagExtraInTrends={hashtagExtraInTrends?.en}
              />
            </TabPanel>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.tr}
                hashtagInTrends={hashtagInTrends?.tr}
                hashtagExtraInTrends={hashtagExtraInTrends?.tr}
              />
            </TabPanel>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.nl}
                hashtagInTrends={hashtagInTrends?.nl}
                hashtagExtraInTrends={hashtagExtraInTrends?.nl}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  )
}
